import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

//css
import "./index.css";

//context
import { AuthProvider } from "./context/authContext.tsx";

//components
import ProtectedRoutes from "./components/ProtectedRoutes.tsx";
import Layout from "./components/Layout.tsx";

//pages
import App from "./App.tsx";
import CharacterSingle from "./pages/characterSingle/CharacterSingle.tsx";
import Characters from "./pages/characters/Characters.tsx";
import Location from "./pages/location/Location.tsx";
import Episode from "./pages/episode/Episode.tsx";
import SignUp from "./pages/signUp/SignUp.tsx";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "/signUp",
        element: <SignUp />,
      },
      {
        element: <ProtectedRoutes />,
        children: [
          {
            path: "/characters",
            element: <Characters />,
          },
          {
            path: "/characters/:id",
            element: <CharacterSingle />,
          },
          {
            path: "/location/:id",
            element: <Location />,
          },
          {
            path: "/episode/:id",
            element: <Episode />,
          },
        ],
      },
    ],
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
