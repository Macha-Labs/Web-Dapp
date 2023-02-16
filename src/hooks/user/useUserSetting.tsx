export const useUserSettings = () => {
  const userSettings = [
    {
      icon: "IconDarkEdit.png",
      name: "Edit Profile",
      route: "UserEdit",
    },
    {
      icon: "IconDarkPrivacy.png",
      name: "Privacy and Security",
      route: "",
    },
    {
      icon: "IconDarkNotification.png",
      name: "Notifications and Sounds",
      route: "",
    },
    {
      icon: "IconDarkCall.png",
      name: "Call and Video",
      route: "",
    },
    {
      icon: "IconDarkWallet.png",
      name: "Wallet and Payments",
      route: "",
    },
    {
      icon: "IconDarkDatabase.png",
      name: "Storage and Data",
      route: "",
    },
    {
      icon: "IconDarkLinkedDevices.png",
      name: "Linked Devices",
      route: "",
    },
    {
      icon: "IconDarkLanguages.png",
      name: "Languages",
      route: "",
    },
    {
      icon: "IconDarkAppearance.png",
      name: "Appearance",
      route: "",
    },
  ];

  return {
    userSettings,
  };
};
