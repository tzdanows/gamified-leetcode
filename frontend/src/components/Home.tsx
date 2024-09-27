import React from 'react';
import Auth from '../Auth';
import { Button } from "../components/ui/button"

const Home: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-extrabold text-center text-gray-900 dark:text-white mb-8">
                    LeetCode is more fun together.
                </h1>
                <p className="mt-2 text-center text-xl text-gray-600 dark:text-gray-300 mb-12">
                    Starting a leetcode study group has never been easier
                </p>
                <div className="mt-10">
                    <Auth />
                </div>
                <div className="mt-8 flex justify-center space-x-4">
                    <Button variant="outline">Forgot your username?</Button>
                    <Button variant="outline">Forgot your password?</Button>
                </div>
            </div>
        </div>
    );
};

export default Home;