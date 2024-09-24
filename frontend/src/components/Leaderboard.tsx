import React from 'react';

const Leaderboard: React.FC = () => {
    return (
        <div>
            <h2>Leaderboard</h2>
            <ul>
                <li>
                    <h3>User: LeetCode Username</h3>
                    <p>Points: Total Points</p>
                </li>
                {/* leaderboard users populate here */}
            </ul>
        </div>
    );
};

export default Leaderboard;
