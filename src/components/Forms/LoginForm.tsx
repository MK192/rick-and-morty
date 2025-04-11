import { FormEvent, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

//components
import Button from "../Buttons/Button";
import TextInput from "../TextInput";

//utils
import { getErrorMessage } from "../../utils/functions";

type LoginInput = { email: string; password: string };

export default function LoginForm() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { mutate, isPending, error } = useMutation({
    mutationFn: async ({ email, password }: LoginInput) => {
      await signInWithEmailAndPassword(auth, email, password);
    },
  });

  const navigate = useNavigate();
  const token = localStorage.getItem("fireToken");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    mutate(
      { email, password },
      {
        onSuccess: () => {
          navigate("/characters");
        },
      }
    );
  };
  return (
    <form
      className="flex flex-col gap-6 min-h-64 text-start shadow-[0px_3px_4px_0px_rgba(0,_0,_0,_0.3)] p-6"
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
