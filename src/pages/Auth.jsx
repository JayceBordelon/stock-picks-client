import React, { useState } from 'react';
import { LoginForm, RegisterForm } from '../components/authForms';

import "../styles/animation.css";

const BackDrop = () => {
    return (
        <div className="backdrop z-0">
            {/* Separate container for top waves */}
            <div className="top-waves">
                <div className="wave-top"></div>
                <div className="wave-top"></div>
                <div className="wave-top"></div>
            </div>
            {/* Separate container for bottom waves */}
            <div className="bottom-waves">
                <div className="wave"></div>
                <div className="wave"></div>
                <div className="wave"></div>
            </div>
        </div>
    );
};



export default function Auth() {
    const LOGIN_IDENTIFIER = "login";
    const [authFormRendered, setAuthFormRendered] = useState(LOGIN_IDENTIFIER);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900">
            <BackDrop />
            <div className="w-full max-w-screen relative z-10 px-4 sm:px-6 lg:px-8">
                {authFormRendered === LOGIN_IDENTIFIER ? (
                    <LoginForm setAuthFormRendered={setAuthFormRendered} />
                ) : (
                    <RegisterForm setAuthFormRendered={setAuthFormRendered} />
                )}
            </div>
        </div>
    );
}
