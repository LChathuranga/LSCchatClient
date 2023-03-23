import React, { useState } from "react";
import styled from "styled-components";
import Picker from "emoji-picker-react";
import { IoMdSend } from "react-icons/io";
import { BsEmojiSmileFill } from "react-icons/bs";

function ChatInput({ handleSendMsg }) {
  const [showEmojiPickup, setShowEmojiPickup] = useState(false);
  const [message, setMessage] = useState("");

  const handleEmojiPickerHideShow = () => {
    setShowEmojiPickup(!showEmojiPickup);
  };

  const handleEmojiClick = (emoji, event) => {
    let msg = message;
    msg += emoji.emoji;
    setMessage(msg);
  };

  const handleSendChat = (event) => {
    event.preventDefault();
    if (message.length > 0) {
      handleSendMsg(message);
      setMessage("");
    }
  };

  return (
    <Container>
      <div className="btn-container">
        <div className="emoji">
          <BsEmojiSmileFill onClick={handleEmojiPickerHideShow} />
          {showEmojiPickup && <Picker onEmojiClick={handleEmojiClick} />}
        </div>
      </div>
      <form className="input-container" onSubmit={(e) => handleSendChat(e)}>
        <input
          type="text"
          placeholder="type your message here ..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className="submit">
          <IoMdSend />
        </button>
      </form>
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-columns: 5% 95%;
  align-items: center;
  background-color: #080420;
  padding: 0.2rem;
  padding-bottom: 0.3rem;
  @media screen (min-width: 720px) and (max-width: 1080px) {
    padding: 0 1rem;
    gap: 1rem;
  }
  .btn-container {
    display: flex;
    align-items: center;
    color: #fff;
    gap: 1rem;
    .emoji {
      position: relative;
      svg {
        font-size: 1.5rem;
        color: #ffff00c8;
        cursor: pointer;
      }
      .EmojiPickerReact {
        position: absolute;
        top: -460px;
        background-color: #080420;
        box-shadow: 0 5px 10px #9a86f3;
        border-color: #9186f3;
        .epr-category-nav {
          button {
            filter: contrast(0);
          }
        }
        .epr-search {
          background-color: transparent;
          border-color: #9186f3;
        }
        .epr-emoji-category-label {
          background-color: #080420;
        }
      }
    }
  }
  .input-container {
    width: 100%;
    border-radius: 2rem;
    display: flex;
    align-items: center;
    gap: 2rem;
    background-color: #ffffff34;
    input {
      width: 90%;
      height: 60%;
      background-color: transparent;
      color: #fff;
      border: none;
      outline: none;
      padding-left: 1rem;
      font-size: 1.2rem;
      &::selection {
        background-color: #9186f3;
      }
      &::focus {
        outline: none;
      }
    }
    button {
      padding: 0.3rem 2rem;
      border-radius: 2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #9a86f3;
      border: none;
      cursor: pointer;
      @media screen (min-width: 720px) and (max-width: 1080px) {
        padding: 0.3rem 1rem;
        svg {
          font-size: 1rem;
        }
      }
      svg {
        font-size: 2rem;
        color: #fff;
      }
    }
  }
`;

export default ChatInput;
