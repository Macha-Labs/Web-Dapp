export class Channel$ {
  source: String;
  data: any;
  raw: any;
  xmtpRaw: any;
  type: any;
  id: any;
  name: any;
  description: any;
  image: any;
  private: any;
  isAdmin: any;
  admins: any;
  users: any;
  orgId: any;
  permissions: any;
  lastMessage: any;
  membersCount: any;
  notificationCount: any;
  unreadCountObject: any;
  createdBy: any;
  created_at: any;
  updated_at: any;
  pinnedMessages: any;
  send: any;
  peer: any;
  peerAddress: any;

  constructor(
    source: string = "",
    data: any = null
  ) {
    this.source = source;
    switch(this.source) {
      case "xmtp": 
        this.setFromXmtp(data)
        break;
      case "getstream":
        this.setFromStream(data);
        break;
      case "db":
        this.setFromDb(data);
        break;
    }
  }

  setFromDb (data: any) {
    this.id =data?._id
    this.type =data?.type ; 
    this.name = data?.name ; 
    this.orgId = data?.orgId ; 
    this.private = data?.private ; 
    this.users = data?.users ; 
    this.admins = data?.admins ; 
    this.createdBy = data?.createdBy ; 
    this.created_at = data?.createdAt ; 
    this.updated_at = data?.updatedAt ; 
    this.permissions = data?.permissions ; 
    this.image = "" ; 
    this.lastMessage = "" ; 
    this.membersCount = null ; 
    this.notificationCount = null ; 
    this.pinnedMessages = data?.state?.pinnedMessages
  }

  setFromStream (data: any) {
    this.id = data.data?.id;
    this.type = data.data?.type,
    this.name = data.data?.name,
    this.description = data.data?.description,
    this.orgId = data.data?.orgId,
    this.private = data.data?.private,
    this.users = data.data?.users,
    this.admins = data.data?.admins,
    // this.isAdmin = String(data?.created_by?.id)?.toLowerCase() == String(owner)?.toLowerCase(),
    this.createdBy = data.data?.created_by?.id,
    this.created_at = data.data?.created_at,
    this.updated_at = data.data?.updated_at,
    this.permissions = data.data?.own_capabilities,
    this.image = data.data?.image,
    this.unreadCountObject = data?.state?.read ? data?.state?.read : 0,
    this.lastMessage = data?.state?.messageSets[0]?.messages[data?.state?.messageSets[0]?.messages?.length - 1],
    this.membersCount = data.data?.member_count,
    this.notificationCount = null,
    this.pinnedMessages = data.data?.state?.pinnedMessages,
    this.raw = data
  }

  setFromXmtp (data: any) {
    this.peer= data?.peer ; 
    this.peerAddress= data?.peerAddress
    this.id= data?.peerAddress?.toLowerCase();
    this.type= data?.type;
    this.name= data.peer?.lens?.name || data.peer?.lens?.handle || data.peer?.lens?.ownedBy || data?.peerAddress;
    this.orgId= data?.orgId;
    this.private= data?.private;
    this.users= data?.users;
    this.admins= data?.admins;
    this.createdBy= data?.createdBy?.toLowerCase();
    this.created_at= data?.createdAt;
    this.updated_at= data?.updatedAt;
    this.permissions= data?.permissions;
    this.image= "";
    this.lastMessage= "";
    this.membersCount= 0;
    this.notificationCount= 0;
    this.unreadCountObject= {};
    this.send= data.send;
    this.xmtpRaw= data.raw;
    this.pinnedMessages= data?.state?.pinnedMessages ; 
  }

  updatePeerLens (user: any) {
    this.peer = user;
    this.name = this.peer?.lens?.name || this.peer?.lens?.handle || this.peer?.lens?.ownedBy || this?.peerAddress
  }
}