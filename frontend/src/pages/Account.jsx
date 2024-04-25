import "../index.css";
import { useState, useEffect } from "react";
import axios from "axios";
import AccountPageReviewBox from "../components/AccountPageReviewBox";

function Account() {
  const [username, setUsername] = useState();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const getUsername = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/users/username",
          {
            withCredentials: true,
          }
        );
        if (response.data.username) {
          setUsername(response.data.username);
        }
      } catch (err) {
        console.log(err);
      }
    };

    const getUserReviews = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/reviews/by_username/${username}`,
          {
            withCredentials: true,
          }
        );
        setReviews(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    if (username) {
      getUserReviews();
    }

    getUsername();
  }, [username]);

  return (
    <div className="accountPage">
      <div style={{ width: "100px" }}></div>
      <div className="accountPageMainContent">
        <div>
          <h1 className="accountPageUsername">{username}</h1>
        </div>
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
      </div>
    </div>
  );
}
export default Account;
