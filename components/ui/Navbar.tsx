"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";
import { mainLinks } from "@/constants";
import { userLinks } from "@/constants";
import {
  AiOutlineUser,
  AiOutlineShoppingCart,
  AiOutlineHeart,
} from "react-icons/ai";
import { FiMenu } from "react-icons/fi";
import { MdClose } from "react-icons/md";
import { TbBracketsAngle } from "react-icons/tb";
import Link from "next/link";
import { User } from "@prisma/client";
import CartIcon from "@/app/(shoppingcart)/components/ui/CartIcon";
import WishlistIcon from "@/app/(wishlist)/components/WishList";
interface NavbarProps {
  user: User;
}

const Navbar:React.FC<NavbarProps> = ({user}) => {
  const [openMobileMenu, setOpenMobileMenu] = useState(false);
  const [openUserMenu, setOpenUserMenu] = useState(false);
  // const [userAuth, setUserAuth] = useState(false);
  const mobileMenuHandler = () => {
    setOpenMobileMenu(!openMobileMenu);
  };
  const userMenuHandler = () => {
    setOpenUserMenu(!openUserMenu);
  };
  return (
    <nav>
      <div className="main-container border-b border-1 flex justify-between items-center py-2 relative">
        <Link href={"/"}>
          <div className="flex gap-1 items-center text-3xl font-medium text-black">
            <h1>DEV-THERADS</h1>
            <TbBracketsAngle />
          </div>
        </Link>
        <ul className="flex gap-10 max-md:hidden">
          {mainLinks.map((link,index) => (
            <Link href={link.route} key={index}>
              <li>{link.label}</li>
            </Link>
          ))}
        </ul>
        <div className="flex gap-5 text-xl [&>*]:cursor-pointer">
          <CartIcon />
          <WishlistIcon />
          <div className="max-md:hidden" onClick={userMenuHandler}>
            <AiOutlineUser />
          </div>
          <div className="md:hidden" onClick={mobileMenuHandler}>
            {openMobileMenu ? <MdClose /> : <FiMenu />}
          </div>
        </div>
        {/* user menu */}
        {openUserMenu && (
          <div className="z-10 absolute right-0 top-[40px] w-28 bg-gray-700 rounded-md p-4 text-white max-md:hidden text-center">
            {!user ? (
              <ul>
                <Link href={"/sign-in"}>
                  <li>Sign In</li>
                </Link>
                <Link href={"/sign-up"}>
                  <li>Sign Up</li>
                </Link>
              </ul>
            ) : (
              <ul>
                {userLinks.map((link,index) => (
                  <Link href={link.route} key={index} >
                    <li>{link.label}</li>
                  </Link>
                ))}
                <li className="cursor-pointer" onClick={() => signOut()}>
                  Sign Out
                </li>
              </ul>
            )}
          </div>
        )}
      </div>
      {/* MBOLIE MENU */}
      {openMobileMenu && (
        <div className="md:hidden">
          <div className="absolute right-5 w-48 bg-gray-700 py-5 shadow-md rounded-md p-4 text-white text-center z-[99999]">
            <ul className="flex flex-col gap-5">
              {mainLinks.map((link,index) => (
                <Link href={link.route} key={index} >
                  <li>{link.label}</li>
                </Link>
              ))}
              {!user ? (
                <>
                  <Link href={"/sign-in"}>
                    <li>Log In</li>
                  </Link>
                  <Link href={"/sign-up"}>
                    <li>Sign Up</li>
                  </Link>
                </>
              ) : (
                <>
                  {userLinks.map((link, index) => (
                    <Link key={index} href={link.route}>
                      <li>{link.label}</li>
                    </Link>
                  ))}
                  <li
                    className="cursor-pointer"
                    onClick={() => signOut()}
                  >
                    Sign Out
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
