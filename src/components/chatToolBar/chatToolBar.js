import {useState} from "react";
import {joinUsers} from "../../helpers/joinUsers";
import {useChat}  from "../../context/chatContext";
import {Icon} from "semantic-ui-react";
import SearchUsers from "../searchUsers/searchUsers";

const ChatToolbar = () => {
    const {selectedChat, chatConfig} = useChat();
    const [searching, setSearching] = useState(false);

    return (
        <>
            <div className="chat-toolbar">
                <div className="chat-header-text">
                    {joinUsers(selectedChat.people, chatConfig.userName).slice(0, 100)}
                </div>

                <div className="add-user-icon">
                    <Icon 
                        color="grey"
                        name="user plus"
                        onClick={()=> setSearching(true)}
                    />
                </div>
            </div>

            <SearchUsers visible={searching} closeFn={()=>setSearching(false)}/>
        </>
    )
}

export default ChatToolbar