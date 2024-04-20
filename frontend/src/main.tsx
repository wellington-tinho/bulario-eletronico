import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClientProvider } from "@tanstack/react-query";
import "../src/styles/globals.sass"
import { queryClient } from './services/queryClient.ts';
import {
  RouterProvider,
} from "react-router-dom";
import { router } from './routes.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}> {/* use react-query to cache the api requests */}
      <RouterProvider router={router}/>
    </QueryClientProvider>
  </React.StrictMode>,
)
