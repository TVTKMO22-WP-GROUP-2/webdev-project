import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../groups.css";

function Groups() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [groupDescription, setGroupDescription] = useState("");
  const [owner, setOwner] = useState("");
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    // Check user login status when component mounts
    const checkLoginStatus = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/users/username",
          { withCredentials: true }
        );
        if (response.data.username) {
          setLoggedIn(true);
          // If logged in, set the owner to the username
          setOwner(response.data.username);
        } else {
          setLoggedIn(false);
        }
      } catch (error) {
        console.error("Error checking login status:", error);
      }
    };

    // Fetch existing groups when component mounts
    const fetchGroups = async () => {
      try {
        const response = await axios.get("http://localhost:3000/groups");
        setGroups(response.data);
      } catch (error) {
        console.error("Error fetching groups:", error);
      }
    };

    checkLoginStatus();
    fetchGroups();
  }, []);

  const handleSubmit = async () => {
    try {
      const response = await axios.post("http://localhost:3000/groups/create", {
        name: groupName,
        description: groupDescription,
        owner,
      });
      console.log("New group created:", response.data);
    } catch (error) {
      console.error("Error creating group:", error);
    }
    try {
      const response = await axios.get("http://localhost:3000/groups");
      setGroups(response.data);
    } catch (error) {
      console.error("Error fetching groups:", error);
    }
  };

  return (
    <div className="groups-container">
      <h1>GROUPS PAGE</h1>
      {loggedIn ? (
        <div className="groups-form">
          {/* Create group form */}
          <div className="groups-form-group">
            <label className="groups-label" htmlFor="groupName">
              Group Name
            </label>
            <input
              type="text"
              id="groupName"
              placeholder="Group Name"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              className="groups-input"
            />
          </div>
          <div className="groups-form-group">
            <label className="groups-label" htmlFor="groupDescription">
              Group Description
            </label>
            <textarea
              id="groupDescription"
              placeholder="Group Description"
              value={groupDescription}
              onChange={(e) => setGroupDescription(e.target.value)}
              className="groups-textarea"
            ></textarea>
          </div>
          <div className="groups-form-group">
            <label className="groups-label" htmlFor="owner">
              Owner (Username)
            </label>
            <input
              type="text"
              id="owner"
              placeholder="Owner (Username)"
              value={owner}
              readOnly // Prevent user from changing owner if logged in
              className="groups-input"
            />
          </div>
          <button onClick={handleSubmit} className="groups-button">
            Create Group
          </button>
        </div>
      ) : (
        <p>Please log in to create a group.</p>
      )}

      {/* Existing groups */}
      <div className="existing-groups">
        <h2>Existing Groups</h2>
        <div className="group-list">
          {groups.map((group) => (
            <div key={group._id} className="group-card-container">
              <Link to={`/group/${group._id}`} className="group-link">
                <div className="group-card">
                  <h3 className="group-name">{group.name}</h3>
                  <p className="group-description">{group.description}</p>
                  <p className="group-owner">Owner: {group.owner}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Groups;
