// import { defineConfig } from 'vite'
// import tailwindcss from '@tailwindcss/vite'

// export default defineConfig({
//   plugins: [
//     tailwindcss(),
//   ],
// })


import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react' // si estás usando React

export default defineConfig({
  plugins: [react()],
})
