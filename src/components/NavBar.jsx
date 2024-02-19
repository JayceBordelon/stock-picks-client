import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function NavBar() {
    function useScrollDirection() {
        const [lastScrollTop, setLastScrollTop] = useState(0);
        const [scrollDirection, setScrollDirection] = useState('up');

        useEffect(() => {
            const updateScrollDirection = () => {
                const scrollY = window.pageYOffset;
                if (scrollY > lastScrollTop) {
                    setScrollDirection('down');
                } else {
                    setScrollDirection('up');
                }
                setLastScrollTop(scrollY > 0 ? scrollY : 0);
            };

            window.addEventListener('scroll', updateScrollDirection);

            return () => {
                window.removeEventListener('scroll', updateScrollDirection);
            };
        }, [lastScrollTop]);

        return scrollDirection;
    }

    const scrollDirection = useScrollDirection();

    return (
        <nav className={`bg-gray-800 shadow-lg fixed w-full top-0 z-50 transition-transform duration-300 ${scrollDirection === 'down' ? '-translate-y-full' : 'translate-y-0'}`}>
            <div className="max-w-6xl mx-auto px-4">
                <div className="flex justify-between">
                    <div className="flex space-x-7">
                        <div>
                            <a href="/" className="flex items-center py-4 px-2">
                                <img src="https://www.svgrepo.com/show/59584/bull-silhouette.svg" className="rounded-lg h-10 mr-2" alt="logo"/>
                                <span className="font-semibold text-white text-lg">B&B</span>
                            </a>
                        </div>
                        <div className="hidden md:flex items-center space-x-1">
                            <Link to="/volatile" className="py-4 px-2 text-gray-500 font-semibold hover:text-green-500 transition duration-300">Volatile</Link>
                            <Link to="/popular" className="py-4 px-2 text-gray-500 font-semibold hover:text-green-500 transition duration-300">Popular</Link>
                            <Link to="/saved" className="py-4 px-2 text-gray-500 font-semibold hover:text-green-500 transition duration-300">Saved</Link>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}
