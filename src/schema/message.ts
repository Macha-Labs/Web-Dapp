export const StreamMessage$ = (data: any) => {
  return {
    id: data.id,
    text: data.text,
    createdAt: data.createdAt,
    createdBy: data.createdBy,
    peerAddress: undefined,
  };
};
export const XmtpMessage$ = (data: any) => {
  return {
    id: data.topic,
    text: data.content,
    createdAt: data.sent,
    createdBy: data.senderAddress,
    peerAddress: data.conversation.peerAddress,
  };
};
