export enum ChannelEvents {
  "pinMessage" = "pinMessage",
  "unpinMessage" = "unpinMessage"
}

export interface UserInterface {
  db: {},
  lens: {},
  stream: {},
  address: any
}

interface LensTokens {
  lens_access_token: null,
  lens_refresh_token: null 
}

export interface LensTokensInterface {
  lens_refresh_token: string,
  lensTokens: LensTokens,
  empty: null
}