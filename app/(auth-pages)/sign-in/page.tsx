import { signInAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default async function Login(props: { searchParams: Promise<Message> }) {
  const searchParams = await props.searchParams;
  return (
    <div className="w-full min-h-screen bg-gray-100 flex justify-center items-center"> {/* Full width and height */}
      <form className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full space-y-6"> {/* Form centered */}
        <h1 className="text-3xl font-semibold text-center text-gray-800">Sign in</h1>
        <p className="text-sm text-center text-gray-500">
          Don't have an account?{" "}
          <Link className="text-blue-600 font-medium hover:underline" href="/sign-up">
            Sign up
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

          <div className="flex justify-between items-center">
            <Label htmlFor="password" className="text-gray-700">Password</Label>
            <Link className="text-xs text-blue-600 hover:underline" href="/forgot-password">
              Forgot Password?
            </Link>
          </div>
          <Input
            type="password"
            name="password"
            placeholder="Your password"
            required
            className="mt-2 px-4 py-3 border rounded-lg shadow-sm w-full focus:ring-2 focus:ring-blue-500"
          />

          <SubmitButton
            pendingText="Signing In..."
            formAction={signInAction}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Sign in
          </SubmitButton>

          <FormMessage message={searchParams} />
        </div>
      </form>
    </div>
  );
}
