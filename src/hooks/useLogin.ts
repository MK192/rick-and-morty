import { useMutation } from "@tanstack/react-query";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

type LoginInput = {
  email: string;
  password: string;
};

export const useLogin = () => {
  return useMutation({
    mutationFn: async ({ email, password }: LoginInput) => {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      const token = await user.getIdToken();
      return { user, token };
    },
  });
};
