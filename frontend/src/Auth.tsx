import React, { useState } from 'react';
import { auth } from './firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

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
                // login
                const userCredential = await signInWithEmailAndPassword(auth, email, password);
                const idToken = await userCredential.user.getIdToken();
                console.log("ID Token:", idToken);
                // send the ID token to your backend for verification
            } else {
                // sign Up
                await createUserWithEmailAndPassword(auth, email, password);
            }
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            }
        }
    };

    return (
        <div>
            <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">{isLogin ? 'Login' : 'Sign Up'}</button>
                {error && <p>{error}</p>}
            </form>
            <button onClick={() => setIsLogin(!isLogin)}>
                Switch to {isLogin ? 'Sign Up' : 'Login'}
            </button>
        </div>
    );
};

export default Auth;
