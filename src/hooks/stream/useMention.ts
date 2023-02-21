import { useState } from "react";

const useMention = () => {
    const [mentionActive, setMentionActive] = useState<Boolean>(false);
    const [mention, setMention] = useState<any>();
    const [mentionList, setMentionList] = useState<any>([]);

    const onRefresh = () => {
        setMention(null);
        setMentionList([]);
    }

    const onTrigger = (value: any, users: any) => {
        const words = value.split(" ");
        const mentionWord = words[words.length - 1].substring(1);
        setMention(mentionWord);

        const mentions = !mentionWord
            ? users
            : users.filter(
                (user: any) => {
                    return (user?.name?.toLowerCase().includes(mentionWord) ||
                        user?.handle?.toLowerCase().includes(mentionWord))

                }

            );

        setMentionList(mentions);
    }

    const onSelect = (user: any) => {
        setMentionList([...mentionList, user])
        setMentionActive(false);
    }

    return {
        mentionActive: mentionActive,
        setMentionActive: setMentionActive,
        mention: mention,
        mentionList: mentionList,
        onRefresh: onRefresh,
        onTrigger: onTrigger,
        onSelect: onSelect
    }
}

export default useMention;