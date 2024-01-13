import { LensClient, production } from "@lens-protocol/client";

export const client = new LensClient({
    environment: production
});