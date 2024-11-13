import { assets } from "@/assets/assets";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "react-toastify";

const Header = () => {
  const [email, setEmail] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("email", email); // Thêm email vào formData
    formData.append("name", name); // Thêm name vào formData

    // axios.post(url, data, config)
    // url: Địa chỉ URL của endpoint mà bạn muốn gửi yêu cầu POST đến.
    // data: Dữ liệu bạn muốn gửi đến server. Đây có thể là một đối tượng JavaScript, chuỗi, hoặc FormData.
    // config (tùy chọn): Các cấu hình bổ sung cho yêu cầu HTTP, như headers, params, timeout, v.v.
    const res = await axios.post("/api/email", formData);
    if (res.data.success) {
      toast.success(res.data.msg);
      setEmail("");
    } else {
      toast.error("Error");
    }
  };

  return (
    <div className="p-5 md:px-12 lg:px-28">
      <div className="flex justify-between items-center">
        <p className="text-3xl font-bold">HieuWeaverse</p>
        <Link href={"/admin/addProduct"}>
          <button
            className="flex items-center gap-2 font-medium py-1 px-3 sm:py-3 sm:px-6 
          border border-solid border-customColor shadow-custom"
          >
            <span className="text-2xl">+</span> Upload your document now
          </button>
        </Link>
      </div>

      <div className="text-center my-8">
        <h1 className="text-3xl sm:text-5xl font-medium text-black">
          Learn web development
        </h1>
        <p className="mt-10 max-w-[740px] m-auto text-xs sm:text-base">
          Explore our growing collection of courses on key web design and
          development subjects. An industry expert has written each course,
          helped by members of the Chrome team. Follow the modules
          sequentially, or dip into the topics you most want to learn about.
        </p>
        <form
          onSubmit={onSubmitHandler}
          action=""
          className="flex justify-between max-w-[500px] scale-75 sm:scale-100 mx-auto mt-10 border border-customColor
          shadow-custom"
        >
          <input
            type="email"
            placeholder="Enter your email"
            className="pl-4 outline-none"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <button
            type="submit"
            className="border-l border-customColor p-4 sm:px-8 active:bg-gray-600 active:text-white"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
};

export default Header;
