import { ConnectDB } from "@/lib/config/db";
import EmailModel from "@/lib/models/email.model";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  try {
    // Kết nối đến cơ sở dữ liệu
    await ConnectDB();

    // Lấy dữ liệu form từ request
    const formData = await req.formData();
    const emailData = {
      email: formData.get("email"),
    };

    // Tạo email mới trong cơ sở dữ liệu
    await EmailModel.create(emailData);

    // Trả về phản hồi thành công
    return NextResponse.json({ success: true, msg: "Email subscribe" });
  } catch (error) {
    console.error("Error in POST handler:", error);

    // Trả về phản hồi lỗi nếu có lỗi xảy ra
    return NextResponse.json(
      {
        success: false,
        msg: "Failed to subscribe email",
        error: error.message,
      },
      { status: 500 },
    );
  }
};

export const GET = async (req) => {
  try {
    // Kết nối đến cơ sở dữ liệu
    await ConnectDB();

    // Truy vấn tất cả các email từ cơ sở dữ liệu
    const emails = await EmailModel.find({});

    // Trả về phản hồi với danh sách email
    return NextResponse.json({ success: true, emails });
  } catch (error) {
    console.error("Error in GET handler:", error);

    // Trả về phản hồi lỗi nếu có lỗi xảy ra
    return NextResponse.json(
      { success: false, msg: "Failed to fetch emails", error: error.message },
      { status: 500 },
    );
  }
};

export const DELETE = async (req) => {
  const id = await req.nextUrl.searchParams.get("id");
  await EmailModel.findByIdAndDelete(id);
  return NextResponse.json({ success: true, msg: "Email deleted" });
};
