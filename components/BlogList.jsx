import { blog_data } from "@/assets/assets";
import React, { useEffect, useState } from "react";
import BlogItem from "./BlogItem";
import { motion } from "framer-motion";
import axios from "axios";

const BlogList = () => {
  const [menu, setMenu] = useState("All");

  const [blogs, setBlogs] = useState([]);

  // gọi API và lấy dữ liệu từ server.
  // thực hiện yêu cầu GET đến endpoint /api/blog và lưu phản hồi (response) vào biến res.
  const fetchBlogs = async () => {
    const res = await axios.get("/api/blog");
    setBlogs(res.data.blogs);
    console.log(res.data.blogs);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div>
      <div className="flex justify-center gap-9 my-10">
        <button
          onClick={() => setMenu("All")}
          className={
            menu === "All"
              ? "bg-customColor text-white py-1 px-4 rounded-sm"
              : ""
          }
        >
          All
        </button>
        <button
          onClick={() => setMenu("Technology")}
          className={
            menu === "Technology"
              ? "bg-customColor text-white py-1 px-4 rounded-sm"
              : ""
          }
        >
          Technology
        </button>
        <button
          onClick={() => setMenu("Startup")}
          className={
            menu === "Startup"
              ? "bg-customColor text-white py-1 px-4 rounded-sm"
              : ""
          }
        >
          Startup
        </button>
        <button
          onClick={() => setMenu("Lifestyle")}
          className={
            menu === "Lifestyle"
              ? "bg-customColor text-white py-1 px-4 rounded-sm"
              : ""
          }
        >
          Lifestyle
        </button>
      </div>

      <div className="flex flex-wrap justify-around gap-1 gap-y-10 mb-16 xl:mx-24">
        {blogs
          // Kiểm tra xem danh mục (category) có phải là "All" hay không.
          // Nếu đúng, giữ lại tất cả các item (In ra toàn bộ Blog).
          // Ngược lại, chỉ giữ lại các item có danh mục trùng với giá trị menu (In ra những Blog trùng với category).
          .filter((item) => (menu === "All" ? true : item.category === menu))
          .map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <BlogItem
                id={item._id}
                image={item.image}
                title={item.title}
                description={item.description}
                category={item.category}
              />
            </motion.div>
          ))}
      </div>
    </div>
  );
};

export default BlogList;
