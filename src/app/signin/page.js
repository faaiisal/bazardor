import AuthForm from "@/components/AuthForm";
import { safeReturnTo } from "@/lib/redirect";
import { getOAuthConfig } from "@/lib/oauth-config";

export const metadata = { title: "সাইন ইন" };

export default async function SignInPage({ searchParams }) {
  const params = await searchParams;
  return (
    <AuthForm
      mode="signin"
      returnTo={safeReturnTo(params?.redirectTo, "/")}
      registered={params?.registered === "1"}
      {...getOAuthConfig()}
    />
  );
}
