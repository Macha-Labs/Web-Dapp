

export const useUserSettings = () => {
    const userSettings = [
        {
            // icon: IconDarkEdit,
            name: "Edit Profile",
            route: "UserEdit",
        },
        {
            // icon: IconDarkLock,
            name: "Privacy and Security",
            route: "",
        },
        {
            // icon: IconDarkNotification,
            name: "Notifications and Sounds",
            route: "",
        },
        {
            // icon: IconDarkCall,
            name: "Call and Video",
            route: "",
        },
        {
            // icon: IconDarkWallet,
            name: "Wallet and Payments",
            route: "",
        },
        {
            // icon: IconDarkDatabase,
            name: "Storage and Data",
            route: "",
        },
        {
            // icon: IconDarkLinkedDevices,
            name: "Linked Devices",
            route: "",
        },
        {
            // icon: IconDarkLanguages,
            name: "Languages",
            route: "",
        },
        {
            // icon: IconDarkLanguage,
            name: "Appearance",
            route: "",
        },
    ];

    return {
        userSettings,
    };
};
