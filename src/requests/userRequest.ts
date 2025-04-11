type UserDataType = {
  email: string;
  password: string;
};
export default function fetchUserData({ email, password }: UserDataType) {
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log("Logged in:", user);
      // Redirect user or set auth state here
    } catch (err: any) {
      setError(err.message);
    }
  };
}
