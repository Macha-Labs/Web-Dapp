export const StreamMessage$ = (data: any) => {
  return {
    id: data?.id,
    text: data?.text,
    createdAt: data?.created_at,
    createdBy: data?.createdBy,
    peerAddress: undefined,
    attachments: data?.attachments,
    pinned: data?.pinned,
    reactionScores: data?.reaction_scores,
    reactionCount: data?.reaction_count,
    user: data?.user,
  };
};
export const XmtpMessage$ = (data: any) => {
  return {
    id: data.topic,
    text: data.content,
    createdAt: data.sent,
    createdBy: data.senderAddress,
    peerAddress: data.conversation.peerAddress,
    attachments: data?.attachments,
    user: {
      id: data.senderAddress
    }
  };
};
