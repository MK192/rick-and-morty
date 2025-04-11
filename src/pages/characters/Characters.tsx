//hooks
import { useAuth } from "../../hooks/useAuth";

export default function Characters() {
  const { user, logout } = useAuth();

  return <div>Characters</div>;
}
