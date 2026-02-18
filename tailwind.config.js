/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                morocco: {
                    terracotta: '#D35400',
                    midnight: '#2C3E50',
                    saffron: '#F1C40F',
                    emerald: '#27AE60',
                    clay: '#E67E22',
                    sand: '#F7DC6F',
                }
            },
            fontFamily: {
                outfit: ['Outfit', 'sans-serif'],
                inter: ['Inter', 'sans-serif'],
            },
            backdropBlur: {
                xs: '2px',
            }
        },
    },
    plugins: [],
}
