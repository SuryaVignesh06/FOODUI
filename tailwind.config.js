/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                black: '#000000',
                white: '#FFFFFF',
                accent: '#FF6A00',
                muted: 'rgba(255,255,255,0.1)',
            },
            fontFamily: {
                bebas: ['Bebas Neue', 'sans-serif'],
                oswald: ['Oswald', 'sans-serif'],
                inter: ['Inter', 'sans-serif'],
            },
            fontSize: {
                'hero': '160px',
            },
            keyframes: {
                marquee: {
                    '0%': { transform: 'translateX(0%)' },
                    '100%': { transform: 'translateX(-100%)' },
                }
            },
            animation: {
                marquee: 'marquee 10s linear infinite',
            }
        },
    },
    plugins: [],
}
