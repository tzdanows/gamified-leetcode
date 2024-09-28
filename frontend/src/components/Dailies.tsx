import React, { useState } from 'react';
import { Button } from "../components/ui/button"

// mock data: TODO implement this to populate from contest bank
const contests = [
  { id: 1, name: "PRIME's Contest", startDate: '2024-11-01', endDate: '2024-11-07' },
  { id: 2, name: "Gambino's Contest", startDate: '2024-11-08', endDate: '2024-11-14' },
];

// mock data: TODO implement this to populate from questiomn bank
const leetcodeProblems = [
  { id: 1, title: "Two Sum", difficulty: "Easy" },
  { id: 2, title: "Add Two Numbers", difficulty: "Medium" },
  { id: 3, title: "Longest Substring Without Repeating Characters", difficulty: "Medium" },
  { id: 4, title: "Median of Two Sorted Arrays", difficulty: "Hard" },
  { id: 5, title: "Longest Palindromic Substring", difficulty: "Medium" },
  { id: 6, title: "ZigZag Conversion", difficulty: "Medium" },
  { id: 7, title: "Reverse Integer", difficulty: "Medium" },
  { id: 8, title: "String to Integer (atoi)", difficulty: "Medium" },
];

const Dailies: React.FC = () => {
  const [selectedContest, setSelectedContest] = useState<number | null>(null);

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6">Contests</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {contests.map((contest) => (
          <div key={contest.id} className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-2">{contest.name}</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {contest.startDate} to {contest.endDate}
            </p>
            <Button onClick={() => setSelectedContest(contest.id)}>
              View Problems
            </Button>
          </div>
        ))}
      </div>

      {selectedContest && (
        <>
          <h3 className="text-2xl font-bold mb-4">Daily Problems</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {leetcodeProblems.map((problem, index) => (
              <div key={problem.id} className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4">
                <h4 className="text-lg font-semibold mb-2">{problem.title}</h4>
                <p className="text-gray-600 dark:text-gray-300 mb-2">Day {index + 1}</p>
                <p className="text-gray-600 dark:text-gray-300">Difficulty: {problem.difficulty}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Dailies;