import React from 'react';

const Profile: React.FC = () => {
    return (
        <div>
            <h2>Profile</h2>
            <p>LeetCode Username: [Username]</p>
            <p>Problems Solved: [Number]</p>
            <p>Total Points: [Points]</p>
            <button>Logout</button>
        </div>
    );
};

export default Profile;
