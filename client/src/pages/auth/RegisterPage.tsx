import React from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

import RegisterForm from "../../components/RegisterForm/RegisterForm";

const RegisterPage: React.FC = () => {
  return (
    <div className="min-w-sm md:min-w-md relative bg-white/90 backdrop-blur-lg  border border-gray-100 shadow rounded-xl ">
      <div className="p-4 sm:p-8">
        <div className="text-left">
          <h1 className="block mb-1 p-0 text-xl/6 text-gray-800 font-bold">
            Create your account
          </h1>
          <p className="m-0 p-0 text-sm/5">Sign up to get started.</p>
        </div>

        <div className="mt-8">
          <button
            onClick={() => toast.error("Toast me please")}
            type="button"
            className="w-full py-3 px-4 inline-flex justify-center cursor-pointer items-center gap-x-2 rounded-lg  border-none bg-gray-200 text-gray-800 hover:bg-gray-300 focus:outline-hidden focus:ring-gray-500 disabled:opacity-50 disabled:pointer-events-none"
          >
            <svg
              className="w-4 h-auto"
              width="46"
              height="47"
              viewBox="0 0 46 47"
              fill="none"
            >
              <path
                d="M46 24.0287C46 22.09 45.8533 20.68 45.5013 19.2112H23.4694V27.9356H36.4069C36.1429 30.1094 34.7347 33.37 31.5957 35.5731L31.5663 35.8669L38.5191 41.2719L38.9885 41.3306C43.4477 37.2181 46 31.1669 46 24.0287Z"
                fill="#4285F4"
              />
              <path
                d="M23.4694 47C29.8061 47 35.1161 44.9144 39.0179 41.3012L31.625 35.5437C29.6301 36.9244 26.9898 37.8937 23.4987 37.8937C17.2793 37.8937 12.0281 33.7812 10.1505 28.1412L9.88649 28.1706L2.61097 33.7812L2.52296 34.0456C6.36608 41.7125 14.287 47 23.4694 47Z"
                fill="#34A853"
              />
              <path
                d="M10.1212 28.1413C9.62245 26.6725 9.32908 25.1156 9.32908 23.5C9.32908 21.8844 9.62245 20.3275 10.0918 18.8588V18.5356L2.75765 12.8369L2.52296 12.9544C0.909439 16.1269 0 19.7106 0 23.5C0 27.2894 0.909439 30.8731 2.49362 34.0456L10.1212 28.1413Z"
                fill="#FBBC05"
              />
              <path
                d="M23.4694 9.07688C27.8699 9.07688 30.8622 10.9863 32.5344 12.5725L39.1645 6.11C35.0867 2.32063 29.8061 0 23.4694 0C14.287 0 6.36607 5.2875 2.49362 12.9544L10.0918 18.8588C11.9987 13.1894 17.25 9.07688 23.4694 9.07688Z"
                fill="#EB4335"
              />
            </svg>
            <span className="text-sm font-medium">Sign up with Google</span>
          </button>

          <div className="py-3 flex items-center text-xs text-gray-400 uppercase before:flex-1 before:border-t before:border-gray-200 before:me-6 after:flex-1 after:border-t after:border-gray-200 after:ms-6">
            Or
          </div>

          <RegisterForm />

          <p className="mt-6 font-medium text-sm text-gray-600 ">
            Already on Lumen?
            <Link
              className="text-blue-600 ml-1 decoration-2 hover:underline focus:outline-hidden focus:underline font-medium"
              to="/auth/login"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
