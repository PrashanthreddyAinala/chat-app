import React, {useEffect} from "react"
import {useChat} from "../context/chatContext"
import LeftRail from "../LeftRail/LeftRail"
import {getChats , ChatEngine} from "react-chat-engine";
import ChatToolbar from "./chatToolBar/chatToolBar"
import ChatInput from "./chatInputs/ChatInputs"
import MessageList  from "./messageList/messageList";

const Chat = () => {
  const { myChats, setMyChats, chatConfig, selectedChat, selectChatClick, setSelectedChat } = useChat();

  useEffect(() => {
    console.log('My Chats: ', myChats);
  }, [myChats]);

  return (
    <>
      {!!chatConfig && (
        <ChatEngine
          hideUI={true}
          userName={chatConfig.userName}
          projectID={chatConfig.projectID}
          userSecret={chatConfig.userSecret}
          onConnect={() => {
            getChats(chatConfig, setMyChats);
          }}
          onNewChat={chat=> {
            if(chat.admin.username === chatConfig.username) {
              selectChatClick(chat);
            }
            setMyChats([...myChats, chat].sort((a,b)=> a.id - b.id));
          }}
          onDeleteChat={chat=> {
            if(selectedChat?.id === chat.id) {
              setSelectedChat(null);
            }
            setMyChats(
              myChats.filter(c=> c.id !== chat.id).sort((a,b)=> a.id - b.id)
            );
          }}
          onNewChat={(chatId, message)=> {
            if(selectedChat && chatId === selectedChat.id) {
              setSelectedChat({
                ...selectedChat, 
                messages: [...selectedChat.messages, message]
              })
            }
            const chatThatMessageBelongsTo = myChats.find(c=>c.id === chatId)
            const filteredChats = myChats.filter(c => c.id !== chatId);
            const updatedChat = {
              ...chatThatMessageBelongsTo,
              last_message: message
            }
            setMyChats(
              [updatedChat, ...filteredChats].sort((a,b)=> a.id - b.id)
            )
          }}
        />
      )}

      <div className="chat-container">
      <LeftRail />
        <div className="current-chat">
          {selectedChat ? (
            <div className="chat">
              <ChatToolbar />
              <MessageList />
              <ChatInput />
            </div>
          ) : (
            <div className="no-chat-selected">
              Hey, Select a chat to see messages.
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Chat;