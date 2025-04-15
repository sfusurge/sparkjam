/** @type {import('tailwindcss').Config} */
const config = {
	content: [
		'./app/**/*.{js,ts,jsx,tsx}',
		'./pages/**/*.{js,ts,jsx,tsx}',
		'./components/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		extend: {
			fontFamily: {
				sans: ['var(--font-mona-sans)', 'sans-serif'],
				display: ['var(--font-mona-sans)', 'sans-serif'],
			},
			colors: {
				background: 'var(--color-background)',
				foreground: 'var(--color-foreground)',
			},
		},
	},
	plugins: [],
}

export default config
