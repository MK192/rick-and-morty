import { useMutation } from "@tanstack/react-query";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

type SignUpInput = {
  email: string;
  password: string;
};

export const useSignUp = () => {
  return useMutation({
    mutationFn: async ({ email, password }: SignUpInput) => {
      const userCredential = await createUserWithEmailAndPassword(
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
