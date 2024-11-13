import { assets } from "@/assets/assets";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const BlogItem = ({ title, description, category, image, id }) => {
  return (
    <div className="flex flex-col items-start justify-between max-w-[330px] sm:max-w-[300px] bg-white border border-black hover:shadow-custom">
      <Link href={`/blogs/${id}`}>
        <Image
          src={image}
          alt=""
          layout="responsive"
          width={400}
          height={400} // Đặt chiều cao cố định cho hình ảnh
          className="border-b border-customColor"
        />
      </Link>

      <p className=" ml-5 mt-5 px-1  bg-customColor text-white text-sm">
        {category}
      </p>

      <div className="p-5 flex flex-col h-[250px]">
        {" "}
        {/* Đặt chiều cao cố định cho nội dung */}
        <h5 className="mb-2 text-lg font-medium tracking-tight text-gray-900">
          {title}
        </h5>
        <p
          className="mb-3 text-sm tracking-tight text-gray-700 overflow-hidden"
          dangerouslySetInnerHTML={{ __html: description.slice(0, 120) }}
        ></p>
        <div className="flex-grow flex items-end">
          {/* Đảm bảo nút "Read more" luôn nằm ở dưới cùng */}
          <Link
            href={`/blogs/${id}`}
            className="inline-flex items-center py-2 font-semibold text-center"
          >
            <p>Read more</p>
            <Image src={assets.arrow} alt="" width={12} className="ml-2" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogItem;
