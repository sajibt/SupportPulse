// tailwind.config.js

const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
        "./public/index.html"
    ],
    darkMode: 'class', // Enable dark mode with class strategy
    theme: {
        extend: {
            colors: {
                // Primary brand colors
                primary: {
                    50: '#f0f9ff',
                    100: '#e0f2fe',
                    200: '#bae6fd',
                    300: '#7dd3fc',
                    400: '#38bdf8',
                    500: '#0ea5e9',
                    600: '#0284c7',
                    700: '#0369a1',
                    800: '#075985',
                    900: '#0c4a6e',
                    950: '#082f49',
                },
                // Secondary accent colors
                secondary: {
                    50: '#f5f3ff',
                    100: '#ede9fe',
                    200: '#ddd6fe',
                    300: '#c4b5fd',
                    400: '#a78bfa',
                    500: '#8b5cf6',
                    600: '#7c3aed',
                    700: '#6d28d9',
                    800: '#5b21b6',
                    900: '#4c1d95',
                    950: '#2e1065',
                },
                // Success colors
                success: {
                    50: '#f0fdf4',
                    100: '#dcfce7',
                    200: '#bbf7d0',
                    300: '#86efac',
                    400: '#4ade80',
                    500: '#22c55e',
                    600: '#16a34a',
                    700: '#15803d',
                    800: '#166534',
                    900: '#14532d',
                    950: '#052e16',
                },
                // Warning colors
                warning: {
                    50: '#fffbeb',
                    100: '#fef3c7',
                    200: '#fde68a',
                    300: '#fcd34d',
                    400: '#fbbf24',
                    500: '#f59e0b',
                    600: '#d97706',
                    700: '#b45309',
                    800: '#92400e',
                    900: '#78350f',
                    950: '#451a03',
                },
                // Error colors
                error: {
                    50: '#fef2f2',
                    100: '#fee2e2',
                    200: '#fecaca',
                    300: '#fca5a5',
                    400: '#f87171',
                    500: '#ef4444',
                    600: '#dc2626',
                    700: '#b91c1c',
                    800: '#991b1b',
                    900: '#7f1d1d',
                    950: '#450a0a',
                },
                // Neutral colors for text and backgrounds
                neutral: {
                    50: '#fafafa',
                    100: '#f5f5f5',
                    200: '#e5e5e5',
                    300: '#d4d4d4',
                    400: '#a3a3a3',
                    500: '#737373',
                    600: '#525252',
                    700: '#404040',
                    800: '#262626',
                    900: '#171717',
                    950: '#0a0a0a',
                },
            },
            // Custom background colors for different themes
            backgroundColor: {
                'light-primary': '#ffffff',
                'light-secondary': '#f9fafb',
                'dark-primary': '#111827',
                'dark-secondary': '#1f2937',
            },
            // Text colors for different themes
            textColor: {
                'light-primary': '#111827',
                'light-secondary': '#4b5563',
                'dark-primary': '#f9fafb',
                'dark-secondary': '#d1d5db',
            },
            // Border colors
            borderColor: {
                'light-primary': '#e5e7eb',
                'light-secondary': '#d1d5db',
                'dark-primary': '#374151',
                'dark-secondary': '#4b5563',
            },
            // Custom font family
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
                heading: ['Poppins', 'system-ui', 'sans-serif'],
            },
            // Custom spacing
            spacing: {
                'chat-height': 'calc(100vh - 16rem)',
            },
            // Custom border radius
            borderRadius: {
                'chat': '1.5rem',
            },
            // Custom shadows
            boxShadow: {
                'chat': '0 0 15px 0 rgba(0, 0, 0, 0.05)',
                'card-dark': '0 0 15px 0 rgba(0, 0, 0, 0.3)',
            },
        },
    },
    plugins: [
        require('@tailwindcss/forms'),
        require('@tailwindcss/typography'),
        require('@tailwindcss/aspect-ratio'),
        // Custom plugin for chat bubbles
        function({ addComponents }) {
            addComponents({
                '.chat-bubble': {
                    borderRadius: '1.5rem',
                    padding: '1rem 1.5rem',
                    maxWidth: '80%',
                    width: 'fit-content',
                },
                '.chat-bubble-user': {
                    backgroundColor: 'var(--color-primary-500)',
                    color: 'white',
                    marginLeft: 'auto',
                },
                '.chat-bubble-admin': {
                    backgroundColor: 'var(--color-neutral-100)',
                    color: 'var(--color-neutral-900)',
                    marginRight: 'auto',
                },
            })
        },
    ],
}
