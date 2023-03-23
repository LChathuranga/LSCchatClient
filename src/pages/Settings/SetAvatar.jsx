import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import styled from "styled-components";
import { toastErrorOptions } from "../../utils/ToastOptions";
import axios from "axios";
import { Buffer } from "buffer";
import loader from "../../assets/loader.gif";
import { setAvatarRoute } from "../../utils/APIRoutes";

function SetAvatar() {
  const api = "https://api.multiavatar.com/45678945";
  const navigate = useNavigate();

  const [avatars, setAvatars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);

  useEffect(() => {
    if (!localStorage.getItem("chat-app-user")) navigate("/login");
  }, [navigate]);

  const setProfilePicture = async () => {
    if (selectedAvatar === undefined) {
      toast.error("Please select an avatar", toastErrorOptions);
    } else {
      const user = JSON.parse(localStorage.getItem("chat-app-user"));
      const { data } = await axios.post(`${setAvatarRoute}/${user._id}`, {
        image: avatars[selectedAvatar],
      });
      if (data.isSet) {
        user.isAvatarSet = true;
        user.isAvatarImageSet = true;
        user.avatarImage = data.image;
        localStorage.setItem("chat-app-user", JSON.stringify(user));
        navigate("/");
      } else {
        toast.error(
          "Error in setting the avatar. Please try again later",
          toastErrorOptions
        );
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = [];
      for (let i = 0; i < 4; i++) {
        const image = await axios.get(
          `${api}/${Math.round(Math.random() * 1000)}`
        );
        const buffer = new Buffer(image.data);
        data.push(buffer.toString("base64"));
      }
      setAvatars(data);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return (
    <>
      {isLoading ? (
        <Container>
          <img src={loader} alt="loader" className="loader" />
        </Container>
      ) : (
        <Container>
          <div className="title-container">
            <h1>Pick an avatar as your profile picture</h1>
            <div className="avatars">
              {avatars.map((avatar, index) => {
                return (
                  <div
                    className={`avatar ${
                      selectedAvatar === index ? "selected" : ""
                    }`}
                    key={index}
                  >
                    <img
                      src={`data:image/svg+xml;base64,${avatar}`}
                      alt="avatar"
                      onClick={() => setSelectedAvatar(index)}
                    />
                  </div>
                );
              })}
            </div>
          </div>
          <button className="submit-btn" onClick={setProfilePicture}>
            Set as profile picture
          </button>
        </Container>
      )}
      <ToastContainer />
    </>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 3rem;
  background-color: #131324;
  height: 100vh;
  width: 100vw;
  .loader {
    max-inline-size: 100%;
  }
  .title-container {
    h1 {
      color: white;
    }
  }
  .avatars {
    display: flex;
    gap: 2rem;
    .avatar {
      border: 0.4rem solid transparent;
      padding: 0.4rem;
      border-radius: 5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 0.5s ease-in-out;

      img {
        height: 6rem;
      }
    }
    .selected {
      border: 0.4rem solid #4e0eff;
    }
  }
  .submit-btn {
    background-color: #997af0;
    color: #fff;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    transition: 0.5s ease-in-out;
    &:hover {
      background-color: #4e0eff;
    }
  }
`;

export default SetAvatar;
