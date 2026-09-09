import type { Metadata } from "next";
import { SignUpExperience } from "./sign-up-experience";

export const metadata: Metadata = {
  title: "Create an account",
  description:
    "Request access to AutoStock BD — verified inventory, private listings, and dealer-direct pricing for members.",
};

export default function SignUpPage() {
  return <SignUpExperience />;
}