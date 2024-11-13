// Import các thư viện và module cần thiết
import { NextResponse } from "next/server"; // Để tạo phản hồi HTTP trong Next.js
import fs from "fs/promises"; // Dùng fs/promises để dùng promises cho các thao tác với hệ thống tệp
import { ConnectDB } from "@/lib/config/db"; // Kết nối đến cơ sở dữ liệu
import BlogModel from "@/lib/models/blog.model"; // Mô hình Blog để thao tác với cơ sở dữ liệu
import sharp from "sharp"; // Thư viện xử lý hình ảnh

// Handler cho phương thức GET - lấy danh sách blogs hoặc một blog cụ thể
export const GET = async (req) => {
  try {
    await ConnectDB(); // Kết nối đến cơ sở dữ liệu

    // Lấy ID của blog từ các tham số truy vấn URL
    const blogId = req.nextUrl.searchParams.get("id");

    // Nếu có ID, tìm một blog cụ thể theo ID
    if (blogId) {
      const blog = await BlogModel.findById(blogId);
      return NextResponse.json(blog); // Trả về blog dưới dạng JSON
    } else {
      // Nếu không có ID, tìm tất cả các blog
      const blogs = await BlogModel.find({});
      return NextResponse.json({ blogs }); // Trả về danh sách blogs dưới dạng JSON
    }
  } catch (error) {
    console.error("Error fetching blogs:", error); // Ghi lỗi vào console nếu có lỗi xảy ra
    // Trả về phản hồi lỗi nếu có lỗi xảy ra, với mã lỗi 500
    return NextResponse.json(
      { success: false, msg: "Failed to fetch blogs", error: error.message },
      { status: 500 },
    );
  }
};

// Handler cho phương thức POST - tạo mới một blog
export const POST = async (req) => {
  try {
    await ConnectDB(); // Kết nối đến cơ sở dữ liệu

    // Lấy dữ liệu từ form gửi lên
    const formData = await req.formData();
    const timestamp = Date.now(); // Tạo dấu thời gian để đảm bảo tên tệp là duy nhất
    const image = formData.get("image"); // Lấy tệp hình ảnh từ form data

    // Kiểm tra xem có tệp hình ảnh không
    if (!image) {
      // Nếu không có hình ảnh, trả về phản hồi lỗi với mã lỗi 400
      return NextResponse.json(
        { success: false, msg: "No image provided" },
        { status: 400 },
      );
    }

    // Chuyển đổi dữ liệu hình ảnh từ dạng ArrayBuffer thành Buffer
    const imageByteData = await image.arrayBuffer();
    const buffer = Buffer.from(imageByteData);

    // Xử lý hình ảnh: thay đổi kích thước ảnh bằng sharp
    const resizedBuffer = await sharp(buffer)
      .resize(800, 600, { fit: "contain" }) // Thay đổi kích thước hình ảnh
      .toBuffer();

    // Xây dựng đường dẫn lưu tệp hình ảnh
    const path = `./public/${timestamp}_${image.name}`;
    await fs.writeFile(path, resizedBuffer); // Ghi dữ liệu hình ảnh vào tệp

    // Tạo URL của hình ảnh để lưu vào cơ sở dữ liệu
    const imgUrl = `/${timestamp}_${image.name}`;
    const blogData = {
      title: formData.get("title"),
      description: formData.get("description"),
      category: formData.get("category"),
      author: formData.get("author"),
      image: imgUrl,
      authorImg: formData.get("authorImg"),
    };

    // Lưu dữ liệu blog vào cơ sở dữ liệu
    await BlogModel.create(blogData);
    console.log("Blog saved"); // Ghi log thông báo blog đã được lưu

    // Trả về phản hồi thành công
    return NextResponse.json({ success: true, msg: "Blog added" });
  } catch (error) {
    console.error("Error uploading blog:", error); // Ghi lỗi vào console nếu có lỗi xảy ra
    // Trả về phản hồi lỗi nếu có lỗi xảy ra, với mã lỗi 500
    return NextResponse.json(
      { success: false, msg: "Failed to upload blog", error: error.message },
      { status: 500 },
    );
  }
};

// Handler cho phương thức DELETE - xóa blog theo ID
export const DELETE = async (req) => {
  try {
    await ConnectDB(); // Kết nối đến cơ sở dữ liệu

    // Lấy ID của blog từ các tham số truy vấn URL
    const id = req.nextUrl.searchParams.get("id");
    const blog = await BlogModel.findById(id);

    // Kiểm tra xem blog có tồn tại không
    if (!blog) {
      // Nếu không tìm thấy blog, trả về phản hồi lỗi với mã lỗi 404
      return NextResponse.json(
        { success: false, msg: "Blog not found" },
        { status: 404 },
      );
    }

    // Xóa hình ảnh liên quan đến blog từ hệ thống tập tin
    await fs.unlink(`./public${blog.image}`);
    // Xóa blog khỏi cơ sở dữ liệu
    await BlogModel.findByIdAndDelete(id);

    // Trả về phản hồi thành công
    return NextResponse.json({ success: true, msg: "Blog deleted" });
  } catch (error) {
    console.error("Error deleting blog:", error); // Ghi lỗi vào console nếu có lỗi xảy ra
    // Trả về phản hồi lỗi nếu có lỗi xảy ra, với mã lỗi 500
    return NextResponse.json(
      { success: false, msg: "Failed to delete blog", error: error.message },
      { status: 500 },
    );
  }
};
