import AddLink from "@components/add-link";
import Links from "@components/links";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <AddLink />
        <Links />
      </div>
    </QueryClientProvider>
  );
}

export default App;
