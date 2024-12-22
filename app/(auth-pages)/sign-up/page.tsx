import { signUpAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default async function Signup(props: { searchParams: Promise<Message> }) {
  const searchParams = await props.searchParams;

  if ("message" in searchParams) {
    return (
      <div className="w-full flex-1 flex items-center justify-center h-screen sm:max-w-md p-4">
        <FormMessage message={searchParams} />
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gray-100 flex justify-center items-center"> {/* Full screen with background */}
      <form className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full space-y-6">
        <h1 className="text-3xl font-semibold text-center text-gray-800">Sign up</h1>
        <p className="text-sm text-center text-gray-500">
          Already have an account?{" "}
          <Link className="text-blue-600 font-medium hover:underline" href="/sign-in">
            Sign in
          </Link>
        </p>

        <div className="space-y-4">
          <div>
            <Label htmlFor="email" className="text-gray-700">Email</Label>
            <Input
              name="email"
              placeholder="you@example.com"
              required
              className="mt-2 px-4 py-3 border rounded-lg shadow-sm w-full focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <Label htmlFor="password" className="text-gray-700">Password</Label>
            <Input
              type="password"
              name="password"
              placeholder="Your password"
              minLength={6}
              required
              className="mt-2 px-4 py-3 border rounded-lg shadow-sm w-full focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <SubmitButton
            pendingText="Signing up..."
            formAction={signUpAction}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Sign up
          </SubmitButton>

          <FormMessage message={searchParams} />
        </div>
      </form>
    </div>
  );
}
