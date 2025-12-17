/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                "primary": "#1dc956",
                "primary-dark": "#16a34a",
                "background-light": "#f8fbf9",
                "background-dark": "#112116",
                "surface-light": "#ffffff",
                "surface-dark": "#1e2e24",
                "text-primary-light": "#0e1b12",
                "text-primary-dark": "#eef4f0",
                "text-secondary-light": "#509567",
                "text-secondary-dark": "#8bc49e",
            },
            fontFamily: {
                "display": ["Lexend", "sans-serif"]
            },
            borderRadius: { "DEFAULT": "0.5rem", "lg": "0.75rem", "xl": "1rem", "full": "9999px" },
        },
    },
    plugins: [],
}
