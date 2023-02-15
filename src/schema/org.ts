export const Org$ = (data: any) => {
    return {
      id: data._id,
      name: data.name,
      roles: data.roles,
      visible: data.visible,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      bio: data.bio,
      owner: data.owner,
      social: data.social,
      membership: data.membership,
      heading: data.heading,
      contracts: data.contracts,
      unlocked: data.unlocked,
      image: "https://meta-org-logos.s3.ap-south-1.amazonaws.com/" + data?._id + ".png",
      notificationCount: 0,
      membersCount: 0,
      channelsCount: 0
    };
  };
  