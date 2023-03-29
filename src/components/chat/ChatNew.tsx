import { helperIPFS, truncateAddress, truncateLink } from "@/helpers";
import usePortalChannel from "@/hooks/portal/usePortalChannel";
import usePortalChannelMembership from "@/hooks/portal/usePortalChannelMembership";
import { Channel$ } from "@/schema/channel";
import { Col, Row, StyledCard } from "@/styles/StyledComponents";
import {
  Avatar,
  Button,
  Text,
  useToast,
  Checkbox,
  Tag,
  TagCloseButton,
  Heading,
  Switch,
  Input,
  Image,
  RadioGroup,
  Stack,
  Radio,
  CheckboxGroup,
  Box,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import ModalSlider from "../modal/ModalSlider";
import IconImage from "../icons/IconImage";
import useLensConnections from "@/hooks/lens/useLensConnections";
import { AuthContext, AuthContextType } from "@/providers/AuthProvider";
import { Contract } from "ethers";
import { ChatContext } from "@/providers/ChatProvider";

const ChatNew = (props: any) => {
  console.log("Rendering >>>>> ChatNew");
  const [tab, setTab] = useState("details");
  const [inputFocus, setInputFocus] = useState(0);
  const [access, setAccess] = useState("Public");
  const [checkboxValues, setCheckboxValues] = useState({
    checkbox1: false,
    checkbox2: false,
    checkbox3: false,
    checkbox4: false,
  });
  const [userAddresses, setUserAddresses] = useState<string[]>([]);
  const [inputAddress, setInputAddress] = useState("");
  const [lensUserId, setLensUserId] = useState("");
  const [lensProfiles, setLensProfiles] = useState<string[]>([]);
  const [inputContractAddress,setInputContractAddress]=useState<string>();  
  const [nftAddresses,setNtfAddresses]=useState([]);
  const authContext = useContext(AuthContext) as AuthContextType;
  const chatContext = useContext(ChatContext);
  const hookLensConnections = useLensConnections(
    authContext?.address,
    authContext?.user?.lens?.id
  );

  const handleCheckboxChange = (event: any) => {
    const { id, checked } = event.target;
    setCheckboxValues({ ...checkboxValues, [id]: checked });
  };
  /**
   *
   **/
  const toast = useToast();
  const handleTabs = () => {
    if (tab == "details" && access == "Public") {
      console.log("settin tab to public");
      setTab("share");
    } else if (tab == "details" && access == "Private") {
      setTab("access");
    }
  };
  const callbackNew = (channelId: any) => {
    toast({
      title: "Channel Created Successfully",
      status: "success",
      duration: 3000,
      position: "bottom-right",
    });
    console.log("Do the rest of the stuff");
    chatContext?.hookChannel?.fetch({id: channelId});
    chatContext?.hookChannelList?.load();
    props.modal.onClose();
    handleTabs();
  };
  const fetchNftHolders = () => {
    const contractAddress = inputContractAddress;
    fetch(
      `https://polygon-mumbai.g.alchemy.com/nft/v2/pc4_OU49rShqcfTGX54ocbHYsJKI9mVA/getOwnersForCollection?contractAddress=${contractAddress}`
    )
      .then((response) => response.json())
      .then((data) =>
        setNtfAddresses(
          data.ownerAddresses.slice(0, 10).map((item: any) => {
            return item.toLowerCase();
          })
        )
      );
  };
  const callbackPrompt = (message: any) => {
    toast({
      title: message,
      status: "error",
      duration: 3000,
      position: "bottom-right",
    });
  };

  /**
   *
   **/
  const hookPortalChannel = usePortalChannel(null, {
    new: callbackNew,
    prompt: callbackPrompt,
  });

  /**
   *
   **/

  const hookPortalChannelMembership = usePortalChannelMembership(
    new Channel$("db", {})
  );
    useEffect(() => {
      hookLensConnections.getLensProfile(lensProfiles);
    }, [lensProfiles]);
  

  const data = [
    {
      label: "Name",
      value: hookPortalChannel?.channel?.name,
      onChange: (text: any) => {
        hookPortalChannel?.setChannel({
          ...hookPortalChannel?.channel,
          name: text,
        });
      },
    },
    {
      label: "Description",
      value: hookPortalChannel?.channel?.description,
      onChange: (text: any) => {
        hookPortalChannel?.setChannel({
          ...hookPortalChannel?.channel,
          description: text,
        });
      },
    },
  ];

  /**
   *
   **/
  // const templateDetails = () => {

  //       const header =
  //         <Row className="hr-between v-center">
  //           {/* <Button
  //               onClick={handleTabs}
  //               variant="state_default_hover"
  //               size="sm"
  //             >
  //               Back
  //             </Button> */}
  //           <Text>Create New Channel</Text>
  //           {/* <Button variant="state_default_hover" size="sm"> */}
  //           <IconImage
  //             onClick={handleTabs}
  //             path="IconDarkCross.png"
  //             // styled={{ className: "m-l-1" }}
  //           />
  //           {/* </Button> */}
  //           {/* <Button
  //               onClick={() => {
  //                 hookPortalChannel?.update(
  //                   hookPortalChannelMembership?.userIds
  //                 );
  //               }}
  //               variant="state-brand"
  //               size="sm"
  //               isLoading={hookPortalChannel?.isLoading}
  //             >
  //               Create New
  //             </Button> */}
  //         </Row>
  //       const body =
  //         <Col className="p-2">
  //           <Row className="hr-center w-100 m-b-1">
  //             <Avatar size="2xl" name={data[0].value} />
  //           </Row>
  //           <Input
  //             ref={inputFocus == 0 ? (input) => input && input.focus() : null}
  //             onFocus={() => setInputFocus(0)}
  //             placeholder={data[0].label}
  //             value={data[0].value}
  //             onChange={(e) => data[0].onChange(e.target.value)}
  //             className="m-b-0-5"
  //           />
  //           <Input
  //             ref={inputFocus == 1 ? (input) => input && input.focus() : null}
  //             onFocus={() => setInputFocus(1)}
  //             placeholder={data[1].label}
  //             value={data[1].value}
  //             onChange={(e) => data[1].onChange(e.target.value)}
  //             className="m-b-0-5"
  //           />
  //           {hookPortalChannelMembership?.users?.length ? (
  //             <Col className="flex-wrap m-b-1">
  //               <Heading as="h6" fontSize="md" className="m-b-0-5">
  //                 Add Members
  //               </Heading>
  //               <Row className="flex-wrap">
  //                 {hookPortalChannelMembership?.users?.map((item: any) => {
  //                   return (
  //                     <Tag className="m-r-0-5 m-b-0-5" key={`label-${item}`}>
  //                       <Row className="vr-center p-0-5">
  //                         <Avatar
  //                           src={helperIPFS(item?.lens?.image)}
  //                           className="m-r-0-5"
  //                           size="sm"
  //                         />
  //                         <Text>
  //                           {item?.lens?.name
  //                             ? item?.lens?.name
  //                             : item?.lens?.handle
  //                             ? item?.lens?.handle
  //                             : truncateAddress(item?.lens?.ownedBy)}
  //                         </Text>
  //                       </Row>
  //                       <TagCloseButton
  //                         onClick={() => {
  //                           hookPortalChannelMembership.handleCheckedUsers(
  //                             item
  //                           );
  //                         }}
  //                       />
  //                     </Tag>
  //                   );
  //                 })}
  //               </Row>
  //             </Col>
  //           ) : (
  //             <></>
  //           )}
  //           <Col>
  //             <Heading as="h6" fontSize="md" className="m-b-0-5">
  //               Channel Access
  //             </Heading>
  //             <RadioGroup onChange={setAccess} value={access}>
  //               <Stack direction="column">
  //                 <Radio value="Public">Public</Radio>
  //                 <Radio value="Private">Private</Radio>
  //               </Stack>
  //             </RadioGroup>
  //             <Button onClick={handleTabs}>Next</Button>
  //           </Col>
  //           {/* <Col>
  //             <Heading as="h6" fontSize="md" className="m-b-0-5">
  //               Public
  //             </Heading>
  //             <Row>
  //               <Text>
  //                 Allow channel to be joined and discoverable by anyone on
  //                 platform irrespective of your network
  //               </Text>
  //               <Switch></Switch>
  //             </Row>
  //           </Col> */}
  //         </Col>
  //   return ({header:header , body:body});
  // };
  const templateDetails = () => {
    const header = (
      <Row className="hr-between vr-center w-full">
        <Button onClick={handleTabs} variant="state_default_hover" size="sm">
          Back
        </Button>
        <Heading as="h6" size="sm">
          New Channel
        </Heading>
        {access == "Public" ? (
          <Button
            onClick={() => {
              hookPortalChannel?.update(hookPortalChannelMembership?.userIds);
            }}
            variant="state-brand"
            size="sm"
            isLoading={hookPortalChannel?.isLoading}
          >
            Create New
          </Button>
        ) : (
          <Button
            onClick={() => {
              handleTabs();
            }}
            variant="state-brand"
            size="sm"
            isLoading={hookPortalChannel?.isLoading}
          >
            Next
          </Button>
        )}
      </Row>
    );

    const body = (
      <div>
        <Row className="hr-center w-100 m-b-1">
          <Avatar size="2xl" name={data[0].value} />
        </Row>
        <StyledCard className="m-b-1">
          <Input
            ref={inputFocus == 0 ? (input) => input && input.focus() : null}
            onFocus={() => setInputFocus(0)}
            placeholder={data[0].label}
            value={data[0].value}
            onChange={(e) => data[0].onChange(e.target.value)}
            className="m-b-0-5"
          />
          <Input
            ref={inputFocus == 1 ? (input) => input && input.focus() : null}
            onFocus={() => setInputFocus(1)}
            placeholder={data[1].label}
            value={data[1].value}
            onChange={(e) => data[1].onChange(e.target.value)}
            className="m-b-0-5"
          />
        </StyledCard>

        {/* <StyledCard className="m-b-1">
           {hookPortalChannelMembership?.users?.length && (
             <Col className="flex-wrap m-b-1">
               <Heading as="h6" fontSize="md" className="m-b-0-5">
                 Add Members
               </Heading>
               <Row className="flex-wrap">
                 {hookPortalChannelMembership?.users?.map((item: any) => {
                   return (
                     <Tag className="m-r-0-5 m-b-0-5" key={`label-${item}`}>
                       <Row className="vr-center p-0-5">
                         <Avatar
                           src={helperIPFS(item?.lens?.image)}
                           className="m-r-0-5"
                           size="sm"
                         />
                         <Text>
                           {item?.lens?.name
                             ? item?.lens?.name
                             : item?.lens?.handle
                             ? item?.lens?.handle
                             : truncateAddress(item?.lens?.ownedBy)}
                         </Text>
                       </Row>
                       <TagCloseButton
                         onClick={() => {
                           hookPortalChannelMembership.handleCheckedUsers(item);
                         }}
                       />
                     </Tag>
                   );
                 })}
               </Row>
             </Col>
           )}
         </StyledCard> */}

        <StyledCard>
          <Col>
            <Heading as="h6" fontSize="md" className="m-b-0-5">
              Channel Access
            </Heading>

            <RadioGroup onChange={setAccess} value={access}>
              <Stack direction="row">
                <Radio value="Public">Public</Radio>
                <Radio value="Private">Private</Radio>
              </Stack>
            </RadioGroup>
            <Text>
              Allow channel to be joined and discoverable by anyone on platform
              irrespective of your network
            </Text>
          </Col>
        </StyledCard>
      </div>
    );

    return { body: body, header: header };
  };
  
  const templateShare = () => {
    const header = (
      <Row className="d-flex justify-content-center align-items-center flex-grow-1">
        {/* <IconImage
          onClick={handleTabs}
          path="IconDarkCross.png"
          style={{ className: "m-r-1" }}
        /> */}
        <Text>Channel Created </Text>
      </Row>
    );
    const inviteLink = `${window.location.origin}/invite/c/6415b23b3b7d7f9068994e85`;

    const body = (
      <Col className="d-flex align-items-center flex-column">
        <Text className="m-b-1">Share Channel</Text>
        <Row>
          <IconImage
            path="IconDarkDiscord.svg"
            style={{ className: "m-r-1" }}
            onClick={() => {
              const discordUrl = `https://discord.com/api/webhooks/{webhook.id}/{webhook.token}`;
              const data = {
                content: `Check out this link: ${inviteLink}`,
              };
              fetch(discordUrl, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
              })
                .then((response) => {
                  if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                  }
                })
                .catch((error) => {
                  console.error(error);
                });
            }}
          />
          <IconImage
            onClick={() => {
              const twitterUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
                inviteLink
              )}&text=${encodeURIComponent("text")}`;
              window.open(twitterUrl, "_blank");
            }}
            path="IconDarkTwitter.svg"
            style={{ className: "m-r-1" }}
          />
          <IconImage
            onClick={() => {
              const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(
                inviteLink
              )}&text=${encodeURIComponent("text")}`;
              window.open(telegramUrl, "_blank");
            }}
            path="IconDarkTwitter.svg"
            style={{ className: "m-r-1" }}
          />
          <IconImage
            onClick={() => {
              const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(
                `${"text"} ${inviteLink}`
              )}`;
              window.open(whatsappUrl, "_blank");
            }}
            path="IconDarkTwitter.svg"
            style={{ className: "" }}
          />
        </Row>
        <Row className="m-t-1 d-flex align-items-center">
          <hr style={{ width: "100px" }} />
          <Text>{"  or  "}</Text>
          <hr style={{ width: "100px" }} />
        </Row>
        <Text>Copy and share link to invite people</Text>
        <Row className="d-flex align-items-center justify-content-center m-t-1">
          <Text className="m-r-1 w-40 text-muted" style={{fontSize:14}}>{inviteLink}</Text>
          <IconImage
            onClick={() => {
              navigator.clipboard.writeText(inviteLink);
              toast({
                title: "Copied to clipboard",
                status: "success",
                duration: 3000,
                position: "bottom-right",
              });
            }}
            path="IconDarkCopy.svg"
            style={{ className: "" }}
          />
        </Row>
      </Col>
    );
    return { header: header, body: body };
  };
  const templateAccess = () => {
    const header = (
      <Row className="d-flex justify-content-between align-items-center">
        <Text>Manage Access </Text>
        
      </Row>
    );

    const body = (
      <>
        <Text>Who can join the channel?</Text>
        <CheckboxGroup colorScheme="blue">
          <Stack spacing={[5]} direction={"column"} className=" mt-2">
            <Box
              className="d-flex justify-content-between p-2"
              border="1px"
              borderRadius="md"
              borderColor="gray.700"
            >
              <label htmlFor="checkbox1">
                <Row className="align-items-center">
                  <IconImage
                    onClick={handleTabs}
                    path="IconDarkFollower.svg"
                    style={{ className: "m-r-1" }}
                  />
                  <Text>Only my followers</Text>
                </Row>
              </label>
              <Checkbox
                id="checkbox1"
                value=""
                onChange={handleCheckboxChange}
              />
            </Box>
            {hookPortalChannelMembership?.users.length && (
              <Row className="flex-wrap">
                <Tag
                  className="m-r-0-5 m-b-0-5"
                  style={{ backgroundColor: "red", cursor: "pointer" }}
                  key={`label-clearall `}
                  onClick={() => {
                    hookPortalChannelMembership.setUsers([]);
                    hookPortalChannelMembership.setUsersIds([]);
                  }}
                >
                  <Row className="vr-center p-0-5">
                    <Text>Clear All</Text>
                  </Row>
                </Tag>
                {hookPortalChannelMembership?.users?.map((item: any) => {
                  return (
                    <Tag className="m-r-0-5 m-b-0-5" key={`label-${item}`}>
                      <Row className="vr-center p-0-5">
                        <Avatar
                          src={helperIPFS(item?.lens?.image)}
                          className="m-r-0-5"
                          size="sm"
                        />
                        <Text>
                          {item?.lens?.name
                            ? item?.lens?.name
                            : item?.lens?.handle
                            ? item?.lens?.handle
                            : truncateAddress(item?.lens?.ownedBy)}
                        </Text>
                      </Row>
                      <TagCloseButton
                        onClick={() => {
                          hookPortalChannelMembership.handleCheckedUsers(item);
                        }}
                      />
                    </Tag>
                  );
                })}
              </Row>
            )}
            {checkboxValues.checkbox1 && (
              <Box
                height={200}
                className="overflow-auto p-2 scrollbar-width-none"
                border="1px"
                borderRadius="md"
                borderColor="gray.700"
              >
                <Input placeholder="Search" className="m-b-1" />
                <TemplateFollowers />
              </Box>
            )}
            <Box
              className="d-flex justify-content-between p-2"
              border="1px"
              borderRadius="md"
              borderColor="gray.700"
            >
              <label htmlFor="checkbox2">
                <Row className="align-items-center">
                  <IconImage
                    onClick={handleTabs}
                    path="IconDarkChannel.svg"
                    style={{ className: "m-r-1" }}
                  />
                  <Text>Address I will add</Text>
                </Row>
              </label>
              <Checkbox id="checkbox2" onChange={handleCheckboxChange} />
            </Box>
            {checkboxValues.checkbox2 && <TemplateAddress />}
            <Box
              className="d-flex justify-content-between p-2"
              border="1px"
              borderRadius="md"
              borderColor="gray.700"
            >
              <label htmlFor="checkbox3">
                <Row className="align-items-center">
                  <IconImage
                    onClick={handleTabs}
                    path="IconDarkUser.svg"
                    style={{ className: "m-r-1" }}
                  />
                  <Text>Lens Profile I will add</Text>
                </Row>
              </label>
              <Checkbox
                id="checkbox3"
                value=""
                onChange={handleCheckboxChange}
              />
            </Box>
            {checkboxValues.checkbox3 && <TemplateLens />}
            <Box
              className="d-flex justify-content-between p-2"
              border="1px"
              borderRadius="md"
              borderColor="gray.700"
            >
              <label htmlFor="checkbox4">
                <Row className="align-items-center">
                  <IconImage
                    onClick={handleTabs}
                    path="IconDarkSheildUser.svg"
                    style={{ className: "m-r-1" }}
                  />
                  <Text>Who own an NFT</Text>
                </Row>
              </label>
              <Checkbox
                id="checkbox4"
                value=""
                onChange={handleCheckboxChange}
              />
            </Box>
            {checkboxValues.checkbox4 && <TemplateNFT />}
          </Stack>
        </CheckboxGroup>
        <Row className="mt-3">
          <Text>
            Do you want all these conditions to be satisfied to join the channel
          </Text>
          <Switch />
        </Row>
        <Row className="justify-content-around">
          <Button width="150px" size="lg">
            Skip
          </Button>
          <Button
            width="150px"
            size="lg"
            variant="state_brand"
            onClick={() => {
              console.log("useraddresses", [
                ...userAddresses,
                ...hookPortalChannelMembership?.userIds,
              ]);
              // console.log("lmaoxd",lensUserId);

              console.log("profilefromlens", hookLensConnections.profile);
              const lensAddress = hookLensConnections.profile.map(
                (item: any) => {
                  return item.toLowerCase();
                }
              );
              const allAddresses = [
                ...hookPortalChannelMembership?.userIds,
                ...userAddresses,
                ...lensAddress,
                ...nftAddresses
              ];
              console.log("allAddresses", allAddresses);
              hookPortalChannel?.update(allAddresses);
            }}
          >
            Continue
          </Button>
        </Row>
      </>
    );

    return { header: header, body: body };
  };
  const TemplateFollowers = () => {
    return hookPortalChannelMembership?.followers.length ? (
      hookPortalChannelMembership?.followers?.map((item: any, index: any) => {
        return (
          <Row key={`key-${item?.id}`} className="hr-between p-1 ">
            <Row className="vr-center">
              <Avatar src={helperIPFS(item?.lens?.image)} className="m-r-0-5" />
              <Text>
                {item?.lens?.name
                  ? item?.lens?.name
                  : item?.lens?.handle
                  ? item?.lens?.handle
                  : truncateAddress(item?.lens?.ownedBy)}
              </Text>
            </Row>

            <Checkbox
              isChecked={hookPortalChannelMembership?.userIds?.includes(
                String(item?.lens?.ownedBy?.toLowerCase())
              )}
              onChange={() =>
                hookPortalChannelMembership.handleCheckedUsers(item)
              }
            />
          </Row>
          // </StyledCard>
          //   );
          // }
          //         <Checkbox
          //           isChecked={hookPortalChannelMembership?.userIds?.includes(
          //             String(item?.lens?.ownedBy?.toLowerCase())
          //           )}
          //           onChange={() =>
          //             hookPortalChannelMembership.handleCheckedUsers(item)
          //           }
          //         />
          // </Row>
        );
      })
    ) : (
      <></>
    );
  };

  const TemplateLens = () => {
    return (
      <Box
        className="p-3"
        border="1px"
        borderRadius="md"
        borderColor="gray.700"
      >
        <Text>Lens Address</Text>
        <Input
          placeholder="Enter lens address"
          value={lensUserId}
          autoFocus
          onChange={(e) => {
            setLensUserId(e.target.value);
          }}
          className="m-t-1 m-b-1"
        />
        <Row className="flex-wrap">
          {lensProfiles.map((item: any) => {
            return (
              <Tag className="m-r-0-5 m-b-0-5" key={`label-${item}`}>
                <Row className="vr-center p-0-5">
                  <Text>{truncateAddress(item)}</Text>
                </Row>
                <TagCloseButton
                  onClick={() => {
                    const profileFilter = lensProfiles.filter(
                      (user: any) => user.toLowerCase() != item.toLowerCase()
                    );
                    setLensProfiles(profileFilter);
                  }}
                />
              </Tag>
            );
          })}
        </Row>
        <Row className="align-items-center">
          <Button
            variant=""
            className="m-r-1"
            onClick={() => {
              let lenshandle=lensUserId;
              if(!lensUserId.includes(".test")){
                lenshandle = lensUserId.concat(".test")
              }
              const lensProfileArray = [...lensProfiles, lenshandle];
              setLensProfiles(lensProfileArray);
              setLensUserId("");              
            }}
          >
            Add Profile
          </Button>
          or
          <Button className="m-l-1">Add CSV</Button>
        </Row>
      </Box>
    );
  };
  const TemplateAddress = () => {
    return (
      <Box
        className="p-3"
        border="1px"
        borderRadius="md"
        borderColor="gray.700"
      >
        <Text>Address</Text>
        <Input
          placeholder="Enter address"
          value={inputAddress}
          autoFocus
          onChange={(e) => {
            const inputValue = e.target.value;
            setInputAddress(inputValue);
          }}
          className="m-t-1 m-b-1"
        />
        <Row className="flex-wrap">
          {userAddresses.length ? (
            <Tag
              className="m-r-0-5 m-b-0-5"
              style={{ backgroundColor: "red", cursor: "pointer" }}
              key={`label-clearall `}
              onClick={() => {
                setUserAddresses([]);                
              }}
            >
              <Row className="vr-center p-0-5">
                <Text>Clear All</Text>
              </Row>
            </Tag>
          ):<></>}
          {userAddresses.map((item: any) => {
            return (
              <Tag className="m-r-0-5 m-b-0-5" key={`label-${item}`}>
                <Row className="vr-center p-0-5">
                  <Text>{truncateAddress(item)}</Text>
                </Row>
                <TagCloseButton
                  onClick={() => {
                    const usersFilter = userAddresses.filter(
                      (user: any) => user.toLowerCase() != item.toLowerCase()
                    );
                    setUserAddresses(usersFilter);
                  }}
                />
              </Tag>
            );
          })}
        </Row>
        <Row className="align-items-center">
          <Button
            variant=""
            className="m-r-1"
            onClick={() => {
              const addressesArray = [...userAddresses, inputAddress.toLowerCase()];
              setUserAddresses(addressesArray);
              setInputAddress("");
            }}
          >
            Add Address
          </Button>
          or
          <Button className="m-l-1">Add CSV</Button>
        </Row>
      </Box>
    );
  };
const TemplateNFT=()=>{
  return (
    <Box className="p-3" border="1px" borderRadius="md" borderColor="gray.700">
      <Text>Contract Address</Text>
      <Input
        placeholder="Enter address"
        value={inputContractAddress}
        autoFocus
        onChange={(e) => {
          const inputValue = e.target.value;
          setInputContractAddress(inputValue);
        }}
        className="m-t-1 m-b-1"
      />        
      <Row className="align-items-center">
        <Button
          variant=""
          className="m-r-1"
          onClick={fetchNftHolders}
        >
          Add Users
        </Button>
        
      </Row>
    </Box>
  );
}
  let temp;
  switch (tab) {
    case "share":
      temp = templateShare();
      break;
    case "access":
      temp = templateAccess();
      break;
    case "details":
      temp = templateDetails();
      break;
  }
  return (
    <ModalSlider event={props.modal} size="sm" header={temp?.header}>
      {temp?.body}
    </ModalSlider>
  );
};
export default ChatNew;
