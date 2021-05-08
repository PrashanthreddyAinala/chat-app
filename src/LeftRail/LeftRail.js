import ChatList from "../components/ChatList/ChatList"
import { Loader } from "semantic-ui-react";
import {useChat} from "../context/chatContext"
import {useResolved} from "../hooks/useResolved"
import RailHeader from "./RailHeader"

const LeftRail = ()=> {
    const {myChats, createChatClick} = useChat();
    const chatsResolved = useResolved(myChats);

    return (
        <div className="left-rail">
            <RailHeader />
            {chatsResolved ? (
                <>
                    {!!myChats.length ? (
                        <div className="chat-list-container">
                            <ChatList />
                        </div>
                    ) : ( 
                        <div className="chat-list-container no-chats-yet">
                            <h2>No chats Yet</h2> 
                        </div>
                        )}
                        <button className="create-chat-button" onClick={createChatClick}>
                            Create Chat
                        </button>
                </>
            ) : (
                <div className="chats-loading">
                    <Loader active size="huge" />
                </div>
            )}
        </div>
    )
}

export default LeftRail