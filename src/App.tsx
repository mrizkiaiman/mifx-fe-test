import Main from './pages/main'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

function App() {
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      <Main /> <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default App
