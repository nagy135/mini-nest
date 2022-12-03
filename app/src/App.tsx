import AddLink from "@components/add-link";
import Links from "@components/links";
import TokenContextProvider from "@context/token";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TokenContextProvider>
        <div className="App m-2">
          <AddLink />
          <Links />
        </div>
      </TokenContextProvider>
    </QueryClientProvider>
  );
}

export default App;
