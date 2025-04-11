import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";

//components
import TextInput from "../TextInput";
import Button from "../Buttons/Button";

//hooks
import { useSignUp } from "../../hooks/useSignUp";

//utils
import { getErrorMessage } from "../../utils/functions";

export default function SignUpForm() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { mutate, isPending, error } = useSignUp();
  const navigate = useNavigate();

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
      className="flex flex-col gap-5 text-start shadow-[0px_5px_6px_1px_rgba(34,_197,_94,_0.5)] p-6 "
      onSubmit={handleSubmit}
    >
      <TextInput labelText="Email" type="email" setFunction={setEmail} />
      <TextInput
        labelText="Password"
        type="password"
        setFunction={setPassword}
      />
      <Button type="submit">Create Account</Button>
      {error ? <p className="text-red-500">{getErrorMessage(error)}</p> : null}
      {isPending ? <p>Sending Data ...</p> : null}
    </form>
  );
}
