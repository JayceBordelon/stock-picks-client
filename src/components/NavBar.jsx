import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function NavBar() {

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

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
                <div className="flex justify-between items-center">
                    <a className="flex items-center py-4 px-2">
                        <img src="https://www.svgrepo.com/show/59584/bull-silhouette.svg" className="rounded-lg h-10 mr-2" alt="logo" />
                        <span className="font-semibold text-white text-lg">B&B</span>
                    </a>
                    <div className="md:hidden">
                        <button onClick={toggleMobileMenu} className="text-gray-500 font-semibold hover:text-white transition duration-300">
                            <svg className="h-6 w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                {isMobileMenuOpen ? (
                                    <path d="M6 18L18 6M6 6l12 12"></path> // X icon for close
                                ) : (
                                    <path d="M4 6h16M4 12h16m-7 6h7"></path> // Hamburger icon
                                )}
                            </svg>
                        </button>
                    </div>
                    <div className={`md:flex hidden items-center space-x-1 ${isMobileMenuOpen ? 'flex' : 'hidden'}`}>
                        <Link to="/volatile" className="py-4 px-2 text-gray-500 font-semibold hover:text-green-500 transition duration-300">Volatile</Link>
                        <Link to="/popular" className="py-4 px-2 text-gray-500 font-semibold hover:text-green-500 transition duration-300">Popular</Link>
                        {/* <Link to="/saved" className="py-4 px-2 text-gray-500 font-semibold hover:text-green-500 transition duration-300">Saved</Link> */}
                    </div>
                </div>
                {isMobileMenuOpen && (
                    <div className="md:hidden bg-gray-700">
                        <Link to="/volatile" className="block py-2 px-4 text-sm text-gray-500 hover:text-green-500">Volatile</Link>
                        <Link to="/popular" className="block py-2 px-4 text-sm text-gray-500 hover:text-green-500">Popular</Link>
                        {/* <Link to="/saved" className="block py-2 px-4 text-sm text-gray-500 hover:text-green-500">Saved</Link> */}
                    </div>
                )}
            </div>
        </nav>
    );
}
