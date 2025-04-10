import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

//css
import "./index.css";

//pages
import App from "./App.tsx";
import CharacterSingle from "./pages/characterSingle/CharacterSingle.tsx";
import Characters from "./pages/characters/Characters.tsx";
import Location from "./pages/location/Location.tsx";
import Episode from "./pages/episode/Episode.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
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

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
