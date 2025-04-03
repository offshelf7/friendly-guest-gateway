
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import App from './App.tsx'
import './index.css'
// import { AuthProvider } from './contexts/AuthContext'
import { MockAuthContext } from './contexts/MockAuthContext'

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
    },
  },
})

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      {/* AuthProvider temporarily disabled for debugging */}
      <MockAuthContext.Provider value={MockAuthContext._context.Provider.value}>
        <App />
      </MockAuthContext.Provider>
    </BrowserRouter>
  </QueryClientProvider>
);
