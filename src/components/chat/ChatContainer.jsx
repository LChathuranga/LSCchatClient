import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import LogOut from "../logout/LogOut";
import ChatInput from "./ChatInput";
import Messages from "./Messages";
import axios from "axios";
import { getAllMessagesRoute, sendMessageRoute } from "../../utils/APIRoutes";
import { EVENTS } from "../../events/socketEvents";
import { v4 as uuidv4 } from "uuid";

function ChatContainer({ currentChat, currentUser, socket }) {
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const scrollRef = useRef();

  useEffect(() => {
    const fetchData = async () => {
      if (currentChat) {
        const response = await axios.post(getAllMessagesRoute, {
          from: currentUser._id,
          to: currentChat._id,
        });
        setMessages(response.data);
      }
    };
    fetchData();
  }, [currentChat]);

  const handleSendMsg = async (msg) => {
    await axios.post(sendMessageRoute, {
      from: currentUser._id,
      to: currentChat._id,
      message: msg,
    });
    socket.current.emit(EVENTS.USER.SEND_MESSAGES, {
      from: currentUser._id,
      to: currentChat._id,
      message: msg,
    });

    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: msg });
    setMessages(msgs);
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on(EVENTS.USER.RECEIVE_MESSAGE, (msg) => {
        console.log(msg);
        setArrivalMessage({ fromSelf: false, message: msg });
      });
    }
  }, []);

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behaviour: "smooth" });
  }, [messages]);

  return (
    <>
      {currentChat && (
        <Container>
          <div className="chat-header">
            <div className="user-details">
              <div className="avatar">
                <img
                  src={`data:image/svg+xml;base64, ${currentChat.avatarImage}`}
                  alt="avatar"
                />
              </div>
              <div className="user-name">
                <h3>{currentChat.userName}</h3>
              </div>
            </div>
            <LogOut />
          </div>
          <div className="chat-messages">
            {messages.map((message) => {
              return (
                <div ref={scrollRef} key={uuidv4()}>
                  <div
                    className={`message ${
                      message.fromSelf ? "sended" : "received"
                    }`}
                  >
                    <div className="content">
                      <p>{message.message}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <ChatInput handleSendMsg={handleSendMsg} />
        </Container>
      )}
    </>
  );
}

const Container = styled.div`
  padding-top: 1rem;
  display: grid;
  grid-template-rows: 10% 78% 12%;
  gap: 0.1rem;
  overflow: hidden;
  @media screen (min-width: 720px) and (max-width: 1080px) {
    grid-template-rows: 15% 70% 15%;
  }
  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;
    }
    .avatar {
      img {
        height: 3rem;
      }
    }
    .user-name {
      h3 {
        color: #fff;
      }
    }
  }
  .chat-messages {
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    gap: 1rem;
    .message {
      display: flex;
      align-items: center;
      .content {
        max-width: 40%;
        overflow-wrap: break-word;
        padding: 1rem;
        font-size: 1.1rem;
        border-radius: 1rem;
        color: #d1d1d1;
      }
    }
  }
  .sc-kDvujY {
    margin-left: 2rem;
    margin-right: 2rem;
  }
  .sended {
    justify-content: flex-end;
    .content {
      background-color: #4f04ff21;
    }
  }
  .received {
    justify-content: flex-start;
    .content {
      background-color: #9900ff20;
    }
  }
`;

export default ChatContainer;
