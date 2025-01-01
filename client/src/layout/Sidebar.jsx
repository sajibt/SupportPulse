import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Users, Settings, X } from 'lucide-react';

const Sidebar = ({ isOpen, onClose, user }) => {
    const location = useLocation();

    const menuItems = [
        {
            name: 'Dashboard',
            icon: Home,
            path: user?.role === 'admin' ? '/admin/dashboard' : '/dashboard',
        },
        ...(user?.role === 'admin'
            ? [
                {
                    name: 'User Management',
                    icon: Users,
                    path: '/admin/users',
                },
            ]
            : []),
        {
            name: 'Settings',
            icon: Settings,
            path: '/settings',
        },
    ];

    return (
        <>
            {/* Mobile backdrop */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden"
                    onClick={onClose}
                />
            )}

            {/* Sidebar */}
            <div
                className={`fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
            >
                <div className="h-full flex flex-col">
                    <div className="h-16 flex items-center justify-between px-4 lg:hidden">
                        <span className="text-2xl font-bold text-indigo-600">Menu</span>
                        <button
                            onClick={onClose}
                            className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none"
                        >
                            <X className="h-6 w-6" />
                        </button>
                    </div>

                    <nav className="flex-1 px-4 py-4 space-y-1">
                        {menuItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = location.pathname === item.path;

                            return (
                                <Link
                                    key={item.name}
                                    to={item.path}
                                    className={`flex items-center px-4 py-3 text-sm font-medium rounded-md ${isActive
                                            ? 'bg-indigo-50 text-indigo-600'
                                            : 'text-gray-700 hover:bg-gray-50'
                                        }`}
                                >
                                    <Icon className="h-5 w-5 mr-3" />
                                    {item.name}
                                </Link>
                            );
                        })}
                    </nav>

                    <div className="p-4 border-t border-gray-200">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <div className="h-10 w-10 rounded-full bg-indigo-600 flex items-center justify-center">
                                    <span className="text-white font-medium text-sm">
                                        {user?.name?.charAt(0)}
                                    </span>
                                </div>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm font-medium text-gray-700">{user?.name}</p>
                                <p className="text-xs font-medium text-gray-500 capitalize">{user?.role}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
