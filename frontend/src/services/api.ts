import axios from 'axios';

// const URL = import.meta.env.VITE_API_URL; // example to use .env
let URL = '';

if (process.env.NODE_ENV !== 'production') {
  URL = 'http://localhost:3000/'
  
} else {
  URL = 'https://json-server-vercel-tau-nine.vercel.app/'  
}


const api = axios.create({
  baseURL: URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
