import { FormEvent, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

//components
import Button from "../Buttons/Button";
import TextInput from "../TextInput";

//hooks
import { useLogin } from "../../hooks/useLogin";

//utils
import { getErrorMessage } from "../../utils/functions";

export default function LoginForm() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { mutate, isPending, error } = useLogin();
  const navigate = useNavigate();
  const token = localStorage.getItem("fireToken");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    mutate(
      { email, password },
      {
        onSuccess: ({ token }) => {
          localStorage.setItem("fireToken", token);
          navigate("/characters");
        },
      }
    );
  };
  return (
    <form
      className="flex flex-col gap-6 text-start shadow-[0px_5px_6px_1px_rgba(34,_197,_94,_0.5)] p-6"
      onSubmit={handleSubmit}
    >
      <TextInput labelText="Email" type="email" setFunction={setEmail} />
      <TextInput
        labelText="Password"
        type="password"
        setFunction={setPassword}
      />
      <Button type="submit">Login</Button>
      {error ? <p className="text-red-500">{getErrorMessage(error)}</p> : null}
      {isPending ? <p>Sending Data</p> : null}
      {token ? null : (
        <Link to="/signUp" className="text-blue-700 text-xl hover:underline">
          Sign Up
        </Link>
      )}
    </form>
  );
}
