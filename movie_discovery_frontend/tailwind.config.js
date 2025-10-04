/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      colors: {
        background: "#000000",
        surface: "#1F2937",
        text: "#FFFFFF",
        primary: {
          DEFAULT: "#F97316"
        },
        secondary: {
          DEFAULT: "#10B981"
        },
        success: "#10B981",
        error: "#EF4444"
      },
      borderRadius: {
        xl: "14px",
        '2xl': "20px"
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(249,115,22,0.3), 0 10px 25px rgba(0,0,0,0.6)"
      }
    }
  },
  plugins: []
};
