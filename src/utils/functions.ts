import { FirebaseError } from "firebase/app";

export const getErrorMessage = (error: unknown) => {
  if (error instanceof FirebaseError) {
    switch (error.code) {
      case "auth/email-already-in-use":
        return "This email is already in use.";
      case "auth/invalid-email":
        return "The email address is not valid.";
      case "auth/missing-password":
        return "The password is missing.";
      case "auth/invalid-credential":
        return "Incorrect password.";
      case "auth/weak-password":
        return "The password is too weak (minimum 6 characters).";
      default:
        return error.message;
    }
  }
  return "An unknown error occurred.";
};
