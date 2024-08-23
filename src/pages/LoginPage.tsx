import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import requester from "../../requester";
import useStore, { User } from "../../store";
import { Routes, backendRoutes } from "../constants";

export default function LoginPage() {
  const navigate = useNavigate();
  const setUser = useStore((state) => state.setUser);
  const setAuthToken = useStore((state) => state.setAuthToken);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onsubmit = async () => {
    console.log("Redirecting to dashboard page");
    toast.loading("Logging in...", { duration: 2000, id: "loading" });
    try {
      const response = await requester.post(backendRoutes.Login, {
        username,
        password,
      });
      console.log(response);
      if (response) {
        console.log(response.data);
        toast.dismiss("loading");
        if (response.data.status === false)
          return toast.error(response.data.message, { duration: 2000 });

        const user = response.data.data.user as User;
        const authToken = response.data.data.authToken as string;
        setUser(user);
        setAuthToken(authToken);

        // update the store
        toast.success("Logged in successfully, redirecting to dashboard", {
          duration: 2000,
        });
        setTimeout(() => {
          navigate({ to: Routes.Dashboard });
        }, 2000);
      } else {
        toast.error("Invalid username or password", { duration: 2000 });
      }
    } catch (e) {
      toast.error("Invalid username or password", { duration: 2000 });
    }
  };

  return (
    <>
      <Toaster />
      <div className="flex min-h-screen flex-1">
        <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <div>
              <img
                alt="Your Company"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                className="h-10 w-auto"
              />
              <h2 className="mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Sign in to your account
              </h2>
              {/* <p className="mt-2 text-sm leading-6 text-gray-500">
                Not a member?{' '}
                <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                  Start a 14 day free trial
                </a>
              </p> */}
            </div>

            <div className="mt-10">
              <div>
                <div className="space-y-6">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Email address
                    </label>
                    <div className="mt-2">
                      <input
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        id="username"
                        name="text"
                        type="text"
                        required
                        autoComplete="text"
                        className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Password
                    </label>
                    <div className="mt-2">
                      <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        id="password"
                        name="password"
                        type="password"
                        required
                        autoComplete="current-password"
                        className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                      <label
                        htmlFor="remember-me"
                        className="ml-3 block text-sm leading-6 text-gray-700"
                      >
                        Remember me
                      </label>
                    </div>

                    {/* <div className="text-sm leading-6">
                      <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                        Forgot password?
                      </a>
                    </div> */}
                  </div>

                  <div>
                    <button
                      className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      onClick={onsubmit}
                    >
                      Sign in
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-10">
                <div className="relative">
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 flex items-center"
                  >
                    <div className="w-full border-t border-gray-200" />
                  </div>
                  <div className="relative flex justify-center text-sm font-medium leading-6">
                    <span className="bg-white px-6 text-gray-900">
                      Or continue with
                    </span>
                  </div>
                </div>

                <div className="mt-6 flex justify-center">
                  <w3m-connect-button />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="relative hidden w-0 flex-1 lg:block">
          <img
            alt=""
            src="https://images.unsplash.com/photo-1496917756835-20cb06e75b4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
      </div>
    </>
  );
}
