npm i react-router-dom zustand react-hook-form zod axios

npm i --save @fortawesome/fontawesome-svg-core @fortawesome/free-solid-svg-icons @fortawesome/free-brands-svg-icons @fortawesome/react-fontawesome

npm install @emailjs/browser

npm install @supabase/supabase-js

-- Permite lectura pública en eventos
CREATE POLICY "Allow public read eventos"
ON eventos
FOR SELECT
USING (true);

-- Permite lectura pública en horarios
CREATE POLICY "Allow public read horarios"
ON horarios
FOR SELECT
USING (true);

# Para las imagenes

npm install html2canvas

# Para cambiar el puerto (Si usas Vite, cambia el puerto en vite.config.js:)

export default {
server: {
port: 5174,
strictPort: true
}
}
