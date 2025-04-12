import { Link } from "react-router-dom";

//components
import Button from "./Buttons/Button";

//hooks
import { useAuth } from "../hooks/useAuth";

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="sticky text-base sm:text-lg top-0 bg-green-300 text-blue-500  border-b-4 border-blue-500 md:text-xl">
      <nav
        className="flex justify-between items-center  p-6 
"
      >
        <div>
          <Link to="/">Rick And Morty</Link>
        </div>
        <div className="flex gap-4">
          <Link to="/characters">Characters</Link>
          {user ? (
            <>
              <Button variant="content" onClick={logout}>
                Logout
              </Button>
            </>
          ) : null}
        </div>
      </nav>
    </header>
  );
}
