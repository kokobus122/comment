"use client";
import {
  LoginLink,
  LogoutLink,
  RegisterLink,
  useKindeBrowserClient,
} from "@kinde-oss/kinde-auth-nextjs";
import { Loader2 } from "lucide-react";
import Image from "next/image";

const Navbar = () => {
  const { user, isAuthenticated, isLoading } = useKindeBrowserClient();

  return (
    <nav className="bg-cyan-500 drop-shadow-lg flex justify-between p-2 min-h-14">
      <div className="flex items-center gap-2 text-white">
        {!isAuthenticated && (
          <div>
            <RegisterLink className="bg-black/10 p-2 rounded-md mr-2 hover:bg-black/20 duration-300">
              Register
            </RegisterLink>
            <LoginLink className="bg-black/10 p-2 rounded-md hover:bg-black/20 duration-300">
              Login
            </LoginLink>
          </div>
        )}
        {isAuthenticated && (
          <LogoutLink className="bg-black/10 p-2 rounded-md hover:bg-black/20 duration-300">
            Logout
          </LogoutLink>
        )}
      </div>
      {isLoading && (
        <Loader2 className="animate-spin text-white my-auto mr-2" />
      )}
      {isAuthenticated && (
        <Image
          src={user?.picture || ""}
          alt={user?.given_name || ""}
          className="rounded-full"
          width={40}
          height={40}
        />
      )}
    </nav>
  );
};

export default Navbar;
