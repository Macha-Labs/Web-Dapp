import {useNavigation} from "@react-navigation/native";
import {Box, Center, HStack, Image, Input, Text, useToast} from "native-base";
import React from "react";
import {
    ScrollView,
    TextInput,
    TouchableOpacity,
} from "react-native-gesture-handler";
import GlobalStyles from "../styles/GlobalStyles";
import "react-native-image-keyboard";
import * as ImagePicker from "react-native-image-picker";

const NewPost = () => {
    const navigation = useNavigation();
    const toast = useToast();
    const _onImageChange = (event) => {
        const {uri, linkUri, mime, data} = event.nativeEvent;

        // Do something with this data
        console.log("ImageChange", uri, linkUri, mime, data);
    };
    const options = {
        title: "Select Avatar",
        customButtons: [{name: "fb", title: "Choose Photo from Facebook"}],
        storageOptions: {
            skipBackup: true,
            path: "images",
        },
    };

    const [image, setImage] = React.useState(null);
    const launchImageLibrary = () => {
        ImagePicker.launchImageLibrary(
            {
                includeBase64: true,
                mediaType: "photo",
                selectionLimit: 0,
            },
            (response) => {
                if (response.didCancel) {
                    toast.show({
                        title: "Image Selection Cancelled",
                        placement: "bottom",
                    });
                } else {
                    setImage(response.assets);
                }
            }
        );
    };

    return (
        <Box
            backgroundColor={"#181A20"}
            flex={1}
        >
            <HStack
                height={10}
                width={"100%"}
            >
                <Center flex={2}>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.goBack();
                        }}
                    >
                        <Text color={GlobalStyles.color.primaryBlue}>
                            Cancel
                        </Text>
                    </TouchableOpacity>
                </Center>
                <Center flex={8}>
                    <Text
                        color="white"
                        fontSize={18}
                    >
                        Create Lens Post
                    </Text>
                </Center>
                <Center flex={2}>
                    <Text color={GlobalStyles.color.primaryBlue}>Post</Text>
                </Center>
            </HStack>
            <Box
                flex={1}
                backgroundColor="#111315"
            >
                <HStack>
                    <Image
                        source={require("../assets/fallback/ProfilePic.png")}
                        alt="Attachment icon"
                        size={25}
                        padding={5}
                        marginY={5}
                    />
                    <Input
                        onImageChange={_onImageChange}
                        flex={1}
                        multiline
                        placeholder="What's on your mind?"
                        size="lg"
                        backgroundColor={"#111315"}
                        flexWrap="wrap"
                        height="auto"
                        color="white"
                        placeholderTextColor="white"
                        variant="unstyled"
                    />
                </HStack>
                <HStack
                    position={"absolute"}
                    bottom={0}
                    space={5}
                >
                    <ScrollView
                        horizontal={true}
                        showsHorizontalScrollIndicator={true}
                    >
                        {image?.map((item, index) => {
                            return (
                                <Image
                                    key={index}
                                    source={{
                                        uri:
                                            "data:image/jpeg;base64," +
                                            item.base64,
                                    }}
                                    alt="Attachment icon"
                                    padding={5}
                                    margin={2}
                                />
                            );
                        })}
                    </ScrollView>
                </HStack>
            </Box>

            <Box
                h={50}
                borderTopColor={"#232222"}
                borderTopWidth={1}
            >
                <HStack
                    space={5}
                    alignItems="center"
                    paddingLeft={5}
                    height="100%"
                >
                    <Image
                        source={require("../assets/icons/attach.png")}
                        alt="Attachment icon"
                        size={5}
                    />
                    <TouchableOpacity onPress={() => launchImageLibrary()}>
                        <Image
                            source={require("../assets/icons/Gallery.png")}
                            alt="Attachment icon"
                            size={5}
                        />
                    </TouchableOpacity>
                    <Image
                        source={require("../assets/icons/attach.png")}
                        alt="Attachment icon"
                        size={5}
                    />
                </HStack>
            </Box>
        </Box>
    );
};

export default NewPost;
