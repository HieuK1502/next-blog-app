import { assets } from "@/assets/assets";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Sidebar = () => {
  return (
    <div className="flex flex-col bg-slate-100 ">
      <Link
        href={"/"}
        className="px-2 sm:pl-14 py-3 border border-customColor"
      >
        <p className="text-3xl font-bold">HieuWeaverse</p>
      </Link>

      <div className="w-28 sm:w-80 h-[100dvh] relative py-12  border border-customColor">
        <div className="w-[50%] sm:w-[80%] absolute right-0 space-y-5">
          <Link
            href={"/admin/addProduct"}
            className="flex items-center border border-customColor gap-3 font-medium px-3 py-2 bg-white shadow-[-5px_5px_0px_#242424]"
          >
            <Image src={assets.add_icon} alt="" width={28} />
            <p>Add documents</p>
          </Link>

          <Link
            href={"/admin/blogList"}
            className="flex items-center border border-customColor gap-3 font-medium px-3 py-2 bg-white shadow-[-5px_5px_0px_#242424]"
          >
            <Image src={assets.blog_icon} alt="" width={28} />
            <p>Documents list</p>
          </Link>

          <Link
            href={"/admin/subscription"}
            className="flex items-center border border-customColor gap-3 font-medium px-3 py-2 bg-white shadow-[-5px_5px_0px_#242424]"
          >
            <Image src={assets.email_icon} alt="" width={28} />
            <p>Subscription</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
