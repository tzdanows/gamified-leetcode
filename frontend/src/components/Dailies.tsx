import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import { Button } from "../components/ui/button";
import { CheckCircle, XCircle, Circle, User } from "lucide-react";
import { Separator } from "../components/ui/separator";
import leetcodeLogo from '../assets/leetcode-logo.svg';
import { log } from 'console';

// status types for problem completion check status bar
type ProblemStatus = 'incomplete' | 'unchecked' | 'complete';

// defines the type for contest date (not currently used)
type Contest = {
  id: string;
  name: string;
  currentDaily: {
    title: string;
    difficulty: string;
    link: string;
  };
  leaderboard: {
    username: string;
    points: number;
    problemsSolved: number;
    currentStreak: number;
  }[];
};

// define the type for leaderboard data
type LeaderboardData = {
  username: string;
  points: number;
  problemsSolved: number;
  currentStreak: number;
};

// Replace this with actual username from auth context 
const loggedInUsername = "PRIME";

// current implementation uses the dailies collection, not contests for problems and etc..
const Dailies: React.FC = () => {
  const [problemStatus, setProblemStatus] = useState<ProblemStatus>('unchecked');
  const [contests, setContests] = useState<Contest[]>([]);
  const [selectedContest, setSelectedContest] = useState<Contest | null>(null);
  const [timeUntilNextQuestion, setTimeUntilNextQuestion] = useState('');
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardData[]>([]); 
  const [leetname, setLeetname] = useState<string>(''); // state for LeetCode username

  useEffect(() => {
    const fetchContests = async () => {
      const response = await fetch('http://localhost:5001/dailies');
      const data = await response.json();

      const groupedContests: Contest[] = data.map((item: any) => ({
        id: item.contest_name,
        name: item.contest_name,
        currentDaily: {
          title: item.problem_name,
          difficulty: item.difficulty,
          link: item.link,
        },
        leaderboard: []
      }));

      const uniqueContests = Array.from(new Map(groupedContests.map(contest => [contest.id, contest])).values());

      setContests(uniqueContests);
      setSelectedContest(uniqueContests.find(contest => contest.name === 'Sample Contest') || uniqueContests[0]);
    };

    fetchContests();
  }, []);

  // countdown timer for the next problem
  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0);
      const diff = midnight.getTime() - now.getTime();
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      setTimeUntilNextQuestion(`${hours}h ${minutes}m ${seconds}s`);
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  // check if the leetcode problem is complete 
  const handleCheckCompletion = async () => {
    if (loggedInUsername && selectedContest) {
      const isComplete = await checkProblemCompletion(loggedInUsername, selectedContest.currentDaily.title);
      setProblemStatus(isComplete ? 'complete' : 'incomplete');
    }
  };

  const checkProblemCompletion = async (loggedInUsername: string, problemTitle: string) => {
    await fetchLeaderboard();
    const response = await fetch(`http://localhost:5001/dailies`);
    const data = await response.json();

    // Find the problem entry that matches the provided title
    const problemEntry = data.find((problem: any) => problem.problem_name === problemTitle);
  
    // Check if the user is in the awarded array for the matching problem
    if (problemEntry) {
      return problemEntry.awarded.includes(loggedInUsername); // Returns true if the leetname is found
    }

    return false; // Returns false if no matching problem entry is found
  };

  // fetches leader from exposed leaderboard api
  const fetchLeaderboard = async () => {
    const response = await fetch('http://localhost:5001/leaderboard');
    const data = await response.json();

    const transformedData = data.map((user: any) => ({
      username: user.username,
      points: user.score,
      problemsSolved: user.problems_solved,
      currentStreak: user.current_streak, 
    }));

    setLeaderboardData(transformedData);
  };

  // save the leetcode username to the backend (not tested)
  const handleSaveLeetname = async () => {
    // logic to save the leetname to the backend can be added here
    console.log("LeetCode username saved:", leetname);
  };

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-1 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Today's Daily</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {selectedContest && (
                  <div>
                    <h3 className="text-lg font-semibold">{selectedContest.currentDaily.title}</h3>
                    <p className="text-sm text-muted-foreground">Difficulty: {selectedContest.currentDaily.difficulty}</p>
                    <div className="flex items-center mt-2 space-x-2">
                      <div className="flex-1 bg-secondary h-2 rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${
                            problemStatus === 'complete' ? 'bg-green-500' : 
                            problemStatus === 'incomplete' ? 'bg-red-500' : 
                            'bg-gray-400'
                          }`} 
                          style={{width: '100%'}}
                        />
                      </div>
                      {problemStatus === 'complete' && <CheckCircle className="text-green-500" />}
                      {problemStatus === 'incomplete' && <XCircle className="text-red-500" />}
                      {problemStatus === 'unchecked' && <Circle className="text-gray-400" />}
                    </div>
                    <div className="flex mt-2 space-x-2">
                      <Button className="flex-1" onClick={() => window.open(selectedContest.currentDaily.link, "_blank")}>
                        Solve on <img src={leetcodeLogo} alt="LeetCode Logo" className="inline h-4 w-4 ml-1" />
                      </Button>
                      <Button variant="outline" onClick={handleCheckCompletion}>Check if Complete</Button>
                    </div>
                  </div>
                )}
                <Separator />
                <h3 className="text-lg font-semibold text-muted-foreground">Time until next problem: {timeUntilNextQuestion}</h3>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Personal Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4 mb-4">
                  <User className="h-12 w-12 text-primary" />
                  <div>
                    <h3 className="text-lg font-semibold">Gambino (sample text)</h3>
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        value={leetname}
                        onChange={(e) => setLeetname(e.target.value)}
                        placeholder="LeetCode Username"
                        className="border rounded p-2 w-full"
                      />
                      <Button onClick={handleSaveLeetname}>Save</Button>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <p>Points: 80</p>
                  <p>Problems Solved: 48</p>
                  <p>Current Streak: 9 days</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2">
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Leaderboard {selectedContest?.name}</CardTitle>
              </CardHeader>
              <CardContent className="h-[calc(100%-4rem)] overflow-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Rank</TableHead>
                      <TableHead>Username</TableHead>
                      <TableHead>Points</TableHead>
                      <TableHead>Problems Solved</TableHead>
                      <TableHead>Current Streak</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {leaderboardData.map((user, index) => (
                      <TableRow key={user.username}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{user.username}</TableCell>
                        <TableCell>{user.points}</TableCell>
                        <TableCell>{user.problemsSolved}</TableCell>
                        <TableCell>{user.currentStreak}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dailies;
