import React from 'react';
import { Button } from "../components/ui/button"

const Profile: React.FC = () => {
    // mock data: TODO should come from authentication state (user relevant data)
    const username = "PRIME";
    const problemsSolved = 42;
    const totalPoints = 1337;

    const handleLogout = () => {
        // implement logout logic here
        console.log("Logging out...");
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold mb-6">Profile</h2>
            <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
                <p className="text-lg mb-2">LeetCode Username: <span className="font-semibold">{username}</span></p>
                <p className="text-lg mb-2">Problems Solved: <span className="font-semibold">{problemsSolved}</span></p>
                <p className="text-lg mb-4">Total Points: <span className="font-semibold">{totalPoints}</span></p>
                <Button onClick={handleLogout}>Logout</Button>
            </div>
        </div>
    );
};

export default Profile;