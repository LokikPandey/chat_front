import React, { useState,useRef, useEffect } from "react";
import { BsEmojiSmileFill } from "react-icons/bs";
import { IoMdSend } from "react-icons/io";
import styled from "styled-components";
import Picker from "emoji-picker-react";

export default function ChatInput({ handleSendMsg }) {
  const [msg, setMsg] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const emojiPickerRef = useRef(null);
  const handleEmojiPickerhideShow = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleEmojiClick = ( emojiObject) => {

    if (emojiObject && emojiObject.emoji) {
        setMsg((msg) => msg + emojiObject.emoji);
    };

}
  const sendChat = (event) => {
    event.preventDefault();
    if (msg.length > 0) {
      handleSendMsg(msg);
      setMsg("");
    }
  };

  useEffect(()=>{
    const handleClickOutside=(event)=>{

      if (
        emojiPickerRef.current && 
        !emojiPickerRef.current.contains(event.target) && 
        !event.target.closest(".emoji-button")
      ) {
        setShowEmojiPicker(false); 
      }
    };


  document.addEventListener("mousedown", handleClickOutside);
  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
  },[]);

  return (
    <Container>
      <div className="button-container">
        <div className="emoji">
          <BsEmojiSmileFill onClick={handleEmojiPickerhideShow} />
          {showEmojiPicker && <div ref={emojiPickerRef}><Picker onEmojiClick={handleEmojiClick} /></div>}
        </div>
      </div>
      <form className="input-container" onSubmit={(event) => sendChat(event)} >
        <input
          type="text"
          placeholder="type your message here"
          onChange={(e) => setMsg(e.target.value)}
          value={msg}
        />
        <button type="submit">
          <IoMdSend />
        </button>
      </form>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  // background: linear-gradient(135deg, #2b2b2b 0%, #3f3f3f 100%);
  padding: 1rem;
  border-radius: 12px;
  // box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.3);
  margin: 1rem;
  
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    padding: 0.5rem 1rem;
    gap: 1rem;
  }

  .button-container {
    display: flex;
    align-items: center;
    color: white;
    gap: 1rem;

    .emoji {
      position: relative;
      svg {
        font-size: 1.7rem;
        color: #f4d35e;
        cursor: pointer;
        transition: transform 0.3s ease-in-out;

        &:hover {
          transform: scale(1.2);
        }
      }

      .EmojiPickerReact {
        position: absolute;
        top: -450px;
        background: #2b2b2b;
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.5);
        border: 1px solid #7a8cbf;
        border-radius: 12px;
        padding: 0.5rem;

        .emoji-scroll-wrapper::-webkit-scrollbar {
          background-color: #2b2b2b;
          width: 6px;

          &-thumb {
            background-color: #7a8cbf;
          }
        }

        .emoji-categories {
          button {
            filter: contrast(0.5);
          }
        }

        .emoji-search {
          background-color: transparent;
          border-color: #7a8cbf;
          color: white;
        }

        .emoji-group:before {
          background-color: #2b2b2b;
        }
      }
    }
  }

  .input-container {
    flex-grow: 1;
    margin-left: 1rem;
    display: flex;
    align-items: center;
    background: rgba(255, 255, 255, 0.15);
    box-shadow: inset 0px 2px 5px rgba(0, 0, 0, 0.2);
    border-radius: 2rem;
    padding: 0.5rem 1rem;

    input {
      flex-grow: 1;
      height: 2.5rem;
      background-color: transparent;
      color: white;
      border: none;
      font-size: 1.1rem;
      border-radius: 10px;
      padding-left: 0.5rem;

      &::selection {
        background-color: #7a8cbf;
      }

      &:focus {
        outline: none;
        box-shadow: 0px 0px 10px rgba(58, 123, 213, 0.5);
      }
    }

    button {
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #34c759;
      border: none;
      border-radius: 2rem;
      padding: 0.5rem 1.5rem;
      margin-left: 0.5rem;
      cursor: pointer;
      transition: background-color 0.3s ease;

      @media screen and (min-width: 720px) and (max-width: 1080px) {
        padding: 0.4rem 1rem;
        svg {
          font-size: 1.2rem;
        }
      }

          color:red;
        display:flex;
        flex-direction:column;
      }
      &:hover {
        background-color: #28a745;
      }

      svg {
        font-size: 1.5rem;
        color: white;
      }
    }
  }
`;
