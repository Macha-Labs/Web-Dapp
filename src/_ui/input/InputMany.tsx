import { Box, Text } from "@chakra-ui/react";

type Props = {
    heading: string;
    inputValue: any;
    inputPlaceholder: any;
    inputOnchange: any;
    inputs: any;
    clear: any;
    cta: any;
}

const InputMany = ({heading, inputValue, inputPlaceholder}: Props) => {
  return (
    <Box
        className="p-3"
        border="1px"
        borderRadius="md"
        borderColor="gray.700"
      >
        <Text>{heading}</Text>
        <Input
          placeholder={inputPlaceholder}
          value={inputValue}
          autoFocus
          onChange={(e) => {
            inputOnchange(e)
          }}
          className="m-t-1 m-b-1"
        />
        <StyledRow className="flex-wrap">
          {inputs?.length ? (
            <Tag
              className="m-r-0-5 m-b-0-5"
              style={{ backgroundColor: "red", cursor: "pointer" }}
              key={`label-clearall `}
              onClick={() => {
                setUserAddresses([]);
              }}
            >
              <StyledRow className="vr-center p-0-5">
                <Text>Clear All</Text>
              </StyledRow>
            </Tag>
          ) : (
            <></>
          )}
          {.map((item: any) => {
            return (
              <Tag className="m-r-0-5 m-b-0-5" key={`label-${item}`}>
                <StyledRow className="vr-center p-0-5">
                  <Text>{truncateAddress(item)}</Text>
                </StyledRow>
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
        </StyledRow>
        <StyledRow className="align-items-center">
          <Button
            variant={cta?.variant}
            className="m-r-1"
            onClick={cta?.onClick}
          >
            {cta?.text}
          </Button>
          or
          <Button className="m-l-1">Upload</Button>
        </StyledRow>
      </Box>
  )
};

export default InputMany;
