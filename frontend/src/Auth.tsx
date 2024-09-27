import React, { useState } from 'react';
import { auth } from './firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { Button } from "components/ui/button"
import { Input } from "components/ui/input"

const Auth: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [isLogin, setIsLogin] = useState<boolean>(true);
    const [error, setError] = useState<string>('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');

        try {
            if (isLogin) {
                const userCredential = await signInWithEmailAndPassword(auth, email, password);
                const idToken = await userCredential.user.getIdToken();
                console.log("ID Token:", idToken);
            } else {
                await createUserWithEmailAndPassword(auth, email, password);
            }
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            }
        }
    };

    const handleGoogleSignIn = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            const idToken = await result.user.getIdToken();
            console.log("Google ID Token:", idToken);
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            }
        }
    };

    return (
        <div className="w-full max-w-md mx-auto bg-white dark:bg-gray-800 shadow-md rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">
                {isLogin ? 'Login' : 'Sign Up'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full"
                />
                <Input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full"
                />
                <Button type="submit" className="w-full">
                    {isLogin ? 'Login' : 'Sign Up'}
                </Button>
                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            </form>
            <Button
                variant="outline"
                className="w-full mt-4"
                onClick={() => setIsLogin(!isLogin)}
            >
                Switch to {isLogin ? 'Sign Up' : 'Login'}
            </Button>
            <div className="mt-4">
                <Button variant="outline" className="w-full" onClick={handleGoogleSignIn}>
                    Sign in with Google
                </Button>
            </div>
        </div>
    );
};

export default Auth;