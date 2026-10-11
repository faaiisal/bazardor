import AuthForm from "@/components/AuthForm";
import { getOAuthConfig } from "@/lib/oauth-config";

export const metadata = { title: "সাইন আপ" };

export default function SignUpPage() {
  return <AuthForm mode="signup" {...getOAuthConfig()} />;
}
