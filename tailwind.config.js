/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./pages/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}'],
    theme: {
        screens: {
            xs: '330px',
            sm: '470px',
            md: '640px',
            lg: '768px',
            xl: '992px',
            '2xl': '1200px',
            '3xl': '1500px',
        },
    },
    plugins: [],
}
