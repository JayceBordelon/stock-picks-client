
import React, { useState } from 'react';
import { loginUser, registerUser } from '../helpers/apiHelper';
import { useNavigate } from 'react-router-dom';
import Loading from './Loading';

const AuthBranding = () => {
    return (
        <div className="flex justify-center items-center py-4">
            <div className="flex items-center bg-gray-800 p-2 rounded-lg">
                {/* Scale the bear logo larger on md screens and above */}
                <img src="https://upload.wikimedia.org/wikipedia/commons/d/db/Silhouette_of_a_Bear.svg" className="rounded-lg h-6 md:h-12 scale-x-[-1]" alt="bear logo" />
                {/* Increase font size and margins on md screens and above */}
                <span className="mx-2 font-semibold text-white text-lg md:text-2xl md:mx-4">Bears and Bulls</span>
                {/* Scale the bull logo larger on md screens and above */}
                <img src="https://www.svgrepo.com/show/59584/bull-silhouette.svg" className="rounded-lg h-8 md:h-14 scale-x-[-1]" alt="bull logo" />
            </div>
        </div>
    );
}

export function RegisterForm({ setAuthFormRendered }) {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConf, setPasswordConf] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState("");

    const navigate = useNavigate(); // Initialize navigate

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading("Registering your account");
        setSuccess(false);
        setError('');

        if (password !== passwordConf) {
            setError("Password and Confirmation do not match");
            setLoading("");
            return;
        }

        try {
            const userData = { email, username, password };
            const response = await registerUser(userData);

            if (response.message && response.uid) {
                setSuccess(true);
                localStorage.setItem("uid", response.uid);
                navigate("/volatile");
            } else {
                setError(response.message || "Failed to register");
            }
        } catch (error) {
            setError(error.message || 'Failed to register');
        } finally {
            setLoading("");
        }
    };


    return loading ? (<Loading message={loading} />) : (
        <div className="overflow-x-auto pt-20 sm:p-20 max-w-screen relative z-10">
            <form onSubmit={handleSubmit} className="w-5/6 max-w-xl mx-auto bg-gray-800 p-8 rounded-lg">
                {AuthBranding()}
                <h2 className="text-center font-semibold text-white text-lg md:text-2xl mb-8">Register</h2>
                {error && <p className="text-red-500">{error}</p>}
                {success && <p className="text-green-500">Registration successful!</p>}
                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-400 mb-2">Email</label>
                    <input type="email" id="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-3 py-2 bg-gray-700 text-white rounded" />
                </div>
                <div className="mb-4">
                    <label htmlFor="username" className="block text-gray-400 mb-2">Username</label>
                    <input type="text" id="username" required value={username} onChange={(e) => setUsername(e.target.value)} className="w-full px-3 py-2 bg-gray-700 text-white rounded" />
                </div>
                <div className="mb-6">
                    <label htmlFor="password" className="block text-gray-400 mb-2">Password</label>
                    <input type="password" id="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-3 py-2 bg-gray-700 text-white rounded" />
                </div>
                <div className="mb-6">
                    <label htmlFor="password-confirmation" className="block text-gray-400 mb-2">Confirm Password</label>
                    <input type="password" id="password-confirmation" required value={passwordConf} onChange={(e) => setPasswordConf(e.target.value)} className="w-full px-3 py-2 bg-gray-700 text-white rounded" />
                </div>
                <button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Register</button>
                <div className="text-md p-2">Already have an account? <span className=" cursor-pointer underline font-bold" onClick={() => setAuthFormRendered("login")}>Login</span></div>
            </form>
        </div>);
}


export function LoginForm({ setAuthFormRendered }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(""); // Loading state to manage loading message

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading('Logging in'); // Set loading message
        setError(''); // Clear any existing errors
        setSuccess(false); // Reset success state


        try {
            const userData = { email, password };
            // Assuming loginUser either throws an error or returns a response object
            const response = await loginUser(userData);
            if (response.message && response.uid) {
                setSuccess(true);
                setLoading('');
                localStorage.setItem("uid", response.uid);
                navigate("/volatile");
            } else {
                // Handle cases where loginUser does not throw but indicates failure
                setError(response.message || 'Failed to login');
                setLoading(''); // Clear loading message
            }
        } catch (error) {
            setError(error.message || 'Failed to login');
            setLoading(''); // Clear loading message
        }
    };

    return loading ? (<Loading message={loading} />) : (
        <div className="overflow-x-auto pt-20 sm:p-20 max-w-screen relative z-10">
            <form onSubmit={handleSubmit} className="w-5/6 max-w-xl mx-auto bg-gray-800 p-8 rounded-lg">
                {AuthBranding()}
                <h2 className="text-center font-semibold text-white text-lg md:text-2xl mb-8">Login</h2>
                {error && <p className="text-red-500">{error}</p>}
                {success && <p className="text-green-500">Login successful!</p>}
                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-400 mb-2">Email</label>
                    <input type="email" id="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-3 py-2 bg-gray-700 text-white rounded" />
                </div>
                <div className="mb-6">
                    <label htmlFor="password" className="block text-gray-400 mb-2">Password</label>
                    <input type="password" id="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-3 py-2 bg-gray-700 text-white rounded" />
                </div>
                <button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Login</button>
                <div className="text-md p-2">Don't have an account? <span className="cursor-pointer underline font-bold" onClick={() => setAuthFormRendered("register")}>Register</span></div>
            </form>
        </div>
    );
}