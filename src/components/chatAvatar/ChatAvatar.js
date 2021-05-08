import {useEffect, useState} from "react";
import { fb } from "../../config";
import { useChat } from "../../context/chatContext"
import {Image} from 'semantic-ui-react'

const ChatAvatar = ({chat, username, className}) => {
    const {chatConfig} = useChat();
    const {avatar, setAvatar} = useState("");

    useEffect(() => {
        fb.firestore
            .collection('chatUsers')
            .where("userName" , "==" , username)
            .get()
            .then(snap=> {
                const data = snap.docs[0]?.data();
                if(data?.avatar) {
                    setAvatar(data.avatar)
                }
            })
    }, [chat, chatConfig, setAvatar, username])

    return avatar ? (
        <Image className={className || 'chat-list-avatar'} src={avatar} />
    ) : (
        <div className={className || 'empty-avatar' }>
            {username[0].toUpperCase()}
        </div>
    )
}

export default ChatAvatar;