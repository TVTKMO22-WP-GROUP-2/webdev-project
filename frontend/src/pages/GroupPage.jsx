import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import "../groups.css";

function GroupPage() {
  const { id } = useParams();
  const [group, setGroup] = useState(null);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [authorized, setAuthorized] = useState(false);
  const [deleted, setDeleted] = useState(false);

  useEffect(() => {
    const fetchGroup = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/groups/${id}`);
        setGroup(response.data);
      } catch (error) {
        console.error("Error fetching group:", error);
      }
    };

    const fetchLoggedInUser = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/users/username",
          { withCredentials: true }
        );
        setLoggedInUser(response.data.username);
      } catch (error) {
        console.error("Error fetching logged-in user:", error);
      }
    };

    fetchGroup();
    fetchLoggedInUser();
  }, [id]);

  useEffect(() => {
    if (loggedInUser && group && group.owner === loggedInUser) {
      setAuthorized(true);
    }
  }, [loggedInUser, group]);

  //if user is not auth to open
  if (!authorized) {
    return (
      <div className="group-page-container">
        <p>You are not authorized to view this page. Please log in and make sure you are a member of this group.</p>
        <Link to="/login">Log in</Link>
      </div>
    );
  }

  if (!group) {
    return <p>Loading...</p>;
  }

//unique colors for groups, owner can change. Cosmetic
  const handleColorChange = async () => {
    try {
      const response = await axios.patch(
        `http://localhost:3000/groups/${id}`,
        { color: group.color }, 
        { withCredentials: true } 
      );
      console.log('Color changed:', response.data);
      // Update the group state with the updated color from the response if needed
      setGroup(response.data);
    } catch (error) {
      console.error('Error changing color:', error);
    }
  };
  

//deletes group
const handleDeleteGroup = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/groups/${id}`
      );
      console.log("Group deleted:", response.data);
    // Set the 'deleted' state to true to trigger a re-render
      setDeleted(true);
    } catch (error) {
      console.error("Error deleting group:", error);
    }
  };

  if (deleted) {
    // If the group is deleted, redirect the user to the groups page
    return <div className="redirect-message"> 
    <Link to="/groups" className="redirect-link"> 
     Group deleted, return to groups page...
    </Link>
  </div>;
  }


  return (
    <div className="group-page-container">
      {group ? (
        <>
          <h1 className="group-page-title">{group.name}</h1>
          <div className="group-details">
            <p className="group-description">{group.description}</p>
            <div className="group-members">
              <h3 className="group-members-title">Members:</h3>
              <ul className="group-members-list">
                {group.members.map((member) => (
                  <li key={member} className="group-member">
                    {member}
                  </li>
                ))}
              </ul>
            </div>
            {authorized && (
              <div className="owner-specific-content">
                {/* Owner-specific content goes here */}
                <h3>Owner Controls</h3>
                <input
                  type="color"
                  value={group.color}
                  onChange={(e) =>
                    setGroup({ ...group, color: e.target.value })
                  }
                />
                <button onClick={handleColorChange}>Change Color</button>
                <button onClick={handleDeleteGroup}>Delete Group</button>
                
              </div>
            )}
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default GroupPage;
