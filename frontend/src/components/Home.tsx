import React from 'react';
import Auth from '../Auth';

const Home: React.FC = () => {
    return (
        <div>
            <h1>LeetCode Gamified</h1>
            <p>
                This project is a gamified coding challenge web application inspired by Advent of Code's approach in releasing problems, but using LeetCode problems. Users can participate in daily challenges, track their progress on a leaderboard, and improve their coding skills while coordinating LeetCode contests with fellow peers.
            </p>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Auth />
            </div>
        </div>
    );
};

export default Home;
