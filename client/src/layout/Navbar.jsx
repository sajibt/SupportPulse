import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Bell } from 'lucide-react';

const Navbar = ({ onMenuClick, user }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch({ type: 'LOGOUT' });
        navigate('/login');
    };

    return (
        <nav className="bg-white shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <button
                            onClick={onMenuClick}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 lg:hidden"
                        >
                            <Menu className="h-6 w-6" />
                        </button>
                        <Link to="/" className="flex-shrink-0 flex items-center ml-4">
                            <span className="text-2xl font-bold text-indigo-600">Logo</span>
                        </Link>
                    </div>

                    <div className="flex items-center">
                        <button className="p-2 rounded-full text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none">
                            <Bell className="h-6 w-6" />
                        </button>
                        <div className="ml-4 relative flex items-center">
                            <div className="flex items-center">
                                <span className="hidden md:block mr-4 text-sm font-medium text-gray-700">
                                    Welcome, {user?.name}
                                </span>
                                <button
                                    onClick={handleLogout}
                                    className="ml-2 px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md"
                                >
                                    Logout
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

