import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

//css
import "./index.css";

//context
import { AuthProvider } from "./context/authContext.tsx";

//pages
import App from "./App.tsx";
import CharacterSingle from "./pages/characterSingle/CharacterSingle.tsx";
import Characters from "./pages/characters/Characters.tsx";
import Location from "./pages/location/Location.tsx";
import Episode from "./pages/episode/Episode.tsx";
import SignUp from "./pages/signUp/SignUp.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/signUp",
    element: <SignUp />,
  },
  {
    path: "/characters",
    element: <Characters />,
  },
  {
    path: "/characterSingle",
    element: <CharacterSingle />,
  },
  {
    path: "/location",
    element: <Location />,
  },
  {
    path: "/episode",
    element: <Episode />,
  },
]);
const queryClient = new QueryClient();
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);
