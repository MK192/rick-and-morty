import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { auth } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

//components
import TextInput from "../TextInput";
import Button from "../Buttons/Button";

//utils
import { getErrorMessage } from "../../utils/functions";

type SignUpInput = {
  email: string;
  password: string;
};

export default function SignUpForm() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const { mutate, isPending, error } = useMutation({
    mutationFn: async ({ email, password }: SignUpInput) => {
      await createUserWithEmailAndPassword(auth, email, password);
    },
  });

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
      className="flex flex-col gap-5 min-h-64 text-start shadow-[0px_3px_4px_0px_rgba(0,_0,_0,_0.3)] p-6 "
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
