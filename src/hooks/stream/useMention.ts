import { useState } from "react";

const useMention = () => {
    const [isActive, setIsActive] = useState<Boolean>(false);
    const [mention, setMention] = useState<any>();
    const [mentionList, setMentionList] = useState<any>([]);

    const onRefresh = () => {
        setMention(null);
        setMentionList([]);
    }

    const onTrigger = (value, users) => {
        console.log("Users ", users);
        const words = value.split(" ");
        const mentionWord = words[words.length - 1].substring(1);
        console.log("Mentionword ", mentionWord);
        setMention(mentionWord);

        const mentions = !mentionWord
            ? users
            : users.filter(
                (user) => {
                    console.log("Mention filter", user);
                    return (user?.name?.toLowerCase().includes(mentionWord) ||
                        user?.handle?.toLowerCase().includes(mentionWord))

                }

            );

        setMentionList(mentions);
    }

    const onSelect = (user) => {
        setMentionList([...mentionList, user])
        setIsActive(false);
    }

    return {
        isActive: isActive,
        setIsActive: setIsActive,
        mention: mention,
        mentionList: mentionList,
        onRefresh: onRefresh,
        onTrigger: onTrigger,
        onSelect: onSelect
    }
}

export default useMention;