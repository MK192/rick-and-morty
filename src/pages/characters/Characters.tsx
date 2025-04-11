//components
import Button from "../../components/Buttons/Button";

//hooks
import { useAuth } from "../../hooks/useAuth";

export default function Characters() {
  const { user, logout } = useAuth();

  console.log(user);
  return (
    <div>
      <Button onClick={logout}>Logout</Button>
      Characters
    </div>
  );
}
