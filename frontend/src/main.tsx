import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { QueryClientProvider } from "@tanstack/react-query";
import "../src/styles/globals.sass"
import { queryClient } from './services/queryClient.ts';


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}> {/* use react-query to cache the api requests */}
      <App />
    </QueryClientProvider>
  </React.StrictMode>,
)
