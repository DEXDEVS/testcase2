import React from "react";
import { useForm } from "react-hook-form";
import { useLoginMutation } from "../../features/auth/authApi";

const LoginForm = () => {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const [login, { isLoading, isError }] = useLoginMutation();

  const handleOnsubmit = (data) => {
    login(data);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 ">
      <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-lg">
        <h2 className="mb-6 text-2xl font-bold text-center">Login</h2>
        {isError && (
          <p className="text-rose-500 text-center my-4">
            Wrong! credential please try again
          </p>
        )}
        <form onSubmit={handleSubmit(handleOnsubmit)}>
          <div className="mb-4">
            <label
              className="block mb-2 text-sm font-bold text-gray-700"
              htmlFor="username"
            >
              Email or Username
            </label>
            <input
              className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              {...register("username")}
              placeholder="Enter Email or Username"
            />
          </div>
          <div className="mb-4">
            <label
              className="block mb-2 text-sm font-bold text-gray-700"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Enter Password"
              {...register("password")}
            />
          </div>
          <div className="mb-6 text-center">
            <button
              disabled={isLoading}
              className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
              type="submit"
            >
              {isLoading ? (
                <span className="loading loading-spinner loading-md"></span>
              ) : (
                "Login"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
