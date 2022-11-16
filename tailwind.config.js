/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./*.html'],
  theme: {
    
    screens:{
      sm:'480px',
      md:'786px',
      lg:'976px',
      xl:'1440px'
    },
    extend: {
      colors:{
        bodyBg:"#071319",
        white:"#fff",
        yellowCol:"#e1a02e",
        slate: "#000", 
        ansCorrect:"#2BC481"
      },
      backgroundImage:{
        'active-step':"url('/img/step_activ.png')",
        'quest-imgD':"url('/img/quest.png')",
        'quest-imgT':"url('/img/quest_m.webp')",
        'background':"url('/img/audBag.jpg')"
      }
    },
  },
  plugins: [],
}
