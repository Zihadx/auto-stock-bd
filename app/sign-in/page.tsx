import type { Metadata } from "next";
import { SignInExperience } from "./sign-in-experience";

export const metadata: Metadata = {
  title: "Sign in",
  description:
    "Sign in to access your reserved AutoStock BD inventory, saved vehicles, and private listings.",
};

export default function SignInPage() {
  return <SignInExperience />;
}