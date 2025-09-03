import { Routes, Route } from "react-router";
import Home from "@/pages/Home";
import Posts from "@/pages/Posts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/user/:user_id/posts" element={<Posts />} />
      </Routes>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
