import "../index.css";
import { useState, useEffect } from "react";
import axios from "axios";
import AccountPageReviewBox from "../components/AccountPageReviewBox";

import p1Img from "../ppics/p1.jpg";
import p2Img from "../ppics/p2.jpg";
import p3Img from "../ppics/p3.jpg";
import p4Img from "../ppics/p4.jpg";
import p5Img from "../ppics/p5.jpg";
import p6Img from "../ppics/p6.jpg";

const pictureImages = {
  p1: p1Img,
  p2: p2Img,
  p3: p3Img,
  p4: p4Img,
  p5: p5Img,
  p6: p6Img,
};

function Account() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState();
  const [reviews, setReviews] = useState([]);
  const [selectedPicture, setSelectedPicture] = useState(null);
  const [showPictureModal, setShowPictureModal] = useState(false);
  const profilePictureUrl = selectedPicture
    ? pictureImages[selectedPicture]
    : null;

  //gets all needed data from db, almost same as before
  useEffect(
    () => {
      const fetchData = async () => {
        try {
          const userDataResponse = await axios.get(
            "http://localhost:3000/users/username",
            {
              withCredentials: true,
            }
          );
          
          const userData = userDataResponse.data;

          if (userData.pictureID) {
            setSelectedPicture(userData.pictureID);
            console.log(userData);
          }

          setUsername(userData.username);

          const reviewsResponse = await axios.get(
            `http://localhost:3000/reviews/by_username/${userData.username}`,
            {
              withCredentials: true,
            }
          );
          if (userData.username) {
            setLoggedIn(true);}
          setReviews(reviewsResponse.data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      console.log("Selected Picture:", selectedPicture);
      fetchData();
    },
    [username],
    [selectedPicture]
  );

  //handles picture change from the page, send a patch to db
  const handleSelectPicture = async (pictureID) => {
    try {
      await axios.patch(
        `http://localhost:3000/users/${username}`,
        { pictureID: pictureID },
        { withCredentials: true }
      );
      console.log("Profile picture updated:", pictureID);
      setSelectedPicture(pictureID);
      setShowPictureModal(false);
    } catch (error) {
      console.error("Error updating profile picture:", error);
    }
  };

  return (
    <div className="accountPage">
      <div className="accountPageMainContent">
        <div>
          <h1 className="accountPageUsername">{username}</h1>
        </div>
        
        {profilePictureUrl && (
          <div className="selected-picture">
            <img src={profilePictureUrl} alt="Selected Profile Picture" />
          </div>
        )}
        {loggedIn && (
        <div className="profile-picture-selection">
          <h2>Profile Picture</h2>
          <button onClick={() => setShowPictureModal(true)}>
            Change Picture
          </button>
        </div>
        )}
        <div className="accountPageReviewsContainer">
          <h2>{username}'s reviews</h2>
          {reviews && reviews.length > 0 ? (
            reviews.map((review, index) => (
              <div key={index} className="accountPageReviewBox">
                <AccountPageReviewBox review={review} />
              </div>
            ))
          ) : (
            <p>This user has not made any reviews</p>
          )}
        </div>
  
        {showPictureModal && (
          <div className="picture-modal">
            <div className="picture-grid">
              <img
                src={p1Img}
                alt="Profile Picture 1"
                onClick={() => handleSelectPicture("p1")}
              />
              <img
                src={p2Img}
                alt="Profile Picture 2"
                onClick={() => handleSelectPicture("p2")}
              />
              <img
                src={p3Img}
                alt="Profile Picture 3"
                onClick={() => handleSelectPicture("p3")}
              />
              <img
                src={p4Img}
                alt="Profile Picture 4"
                onClick={() => handleSelectPicture("p4")}
              />
              <img
                src={p5Img}
                alt="Profile Picture 5"
                onClick={() => handleSelectPicture("p5")}
              />
              <img
                src={p6Img}
                alt="Profile Picture 6"
                onClick={() => handleSelectPicture("p6")}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
  
}
export default Account;
