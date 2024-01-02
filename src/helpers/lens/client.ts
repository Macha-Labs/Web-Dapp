import { LensClient, development, production } from "@lens-protocol/client";

export const client = new LensClient({
    environment: production
});