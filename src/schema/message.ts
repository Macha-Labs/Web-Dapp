import { DecodedMessage } from "@xmtp/xmtp-js";

export const StreamMessage$ = (data: any) => {
  return {
    id: data?.id,
    text: data?.text,
    createdAt: data?.created_at,
    createdBy: data?.createdBy?.toLowerCase(),
    peerAddress: undefined,
    attachments: data?.attachments,
    pinned: data?.pinned,
    reaction_scores: data?.reaction_scores,
    reaction_count: data?.reaction_count,
    user: data?.user,
    own_reactions: data?.own_reactions
  };
};
export const XmtpMessage$ = (data: any) => {
  return {
    id: data?.topic,
    text: data?.content,
    createdAt: data?.sent,
    createdBy: data?.senderAddress.toLowerCase(),
    peerAddress: data?.conversation.peerAddress,
    attachments: data?.attachments,
    user: {
      id: data.senderAddress.toLowerCase()
    },
    contentTopic: data.contentTopic,
    conversation: data?.conversation,
    sent: data?.sent,
    messageVersion: data?.messageVersion
  };
};
