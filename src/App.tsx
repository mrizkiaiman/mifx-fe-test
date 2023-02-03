import Home from './pages/home'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

function App() {
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      <Home /> <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default App
