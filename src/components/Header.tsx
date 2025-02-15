"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import toast from "react-hot-toast";

function Header() {
  const { data: session, status } = useSession();

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success("Signed out successfully");
    } catch (e) {
      toast.error("Something went wrong");
      console.log(e);
    }
  };
  return (
    <>
      <header className="w-full max-w-7xl mx-auto flex justify-between items-center p-4 bg-base-100 shadow-lg">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent hover:from-purple-600 hover:to-blue-500 transition-all duration-300 cursor-pointer">
            ReelsPro
          </h2>
        </div>
        <div>
          {session ? (
            <>
              <div className="flex items-center justify-start gap-4">
                <button
                  onClick={handleSignOut}
                  className="btn btn-primary hover:btn-secondary transition-colors duration-300"
                >
                  Sign Out
                </button>
                <Link
                  href={"#"}
                  className="btn btn-outline hover:btn-primary transition-colors duration-300"
                >
                  Dashboard
                </Link>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center justify-start gap-4">
                <Link
                  href={"/login"}
                  className="btn btn-primary hover:btn-secondary transition-colors duration-300"
                >
                  Login
                </Link>
                <Link
                  href={"/register"}
                  className="btn btn-outline hover:btn-primary transition-colors duration-300"
                >
                  Register
                </Link>
              </div>
            </>
          )}
        </div>
      </header>
    </>
  );
}

export default Header;
{
  /* <label className="swap swap-rotate">
  {/* this hidden checkbox controls the state */
}
<input type="checkbox" className="theme-controller" value="synthwave" />;

{
  /* sun icon */
}
<svg
  className="swap-off h-10 w-10 fill-current"
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 24 24"
>
  <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
</svg>;

{
  /* moon icon */
}
<svg
  className="swap-on h-10 w-10 fill-current"
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 24 24"
>
  <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
</svg>;
//</label> */}
