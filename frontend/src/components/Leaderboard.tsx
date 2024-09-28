import React, { useEffect, useState } from 'react';

const Leaderboard: React.FC = () => {
  const [leaderboardData, setLeaderboardData] = useState<
    { username: string; points: number }[]
  >([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // backend endpoint
        const response = await fetch('http://localhost:5001/leaderboard');
        const data = await response.json();
        
        console.log('Fetched data:', data); // Should show the response from the server

        // Transform backend data to match the front-end requirement
        const transformedData = data.map((user: any) => ({
          username: user.username,
          points: user.score,
        }));
        setLeaderboardData(transformedData);
      } catch (error) {
        console.error('Error fetching leaderboard data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6">Leaderboard</h2>
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Rank
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Username
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Points
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {leaderboardData.map((user, index) => (
              <tr key={user.username} className={index % 2 === 0 ? 'bg-gray-50 dark:bg-gray-900' : ''}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                  {index + 1}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                  {user.username}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                  {user.points}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leaderboard;