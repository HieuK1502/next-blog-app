import mongoose from "mongoose";

const EmailSchema = new mongoose.Schema({
  email: { type: String, require: true },
  date: { type: Date, default: Date.now },
});

// mongoose.model được sử dụng để tạo model từ schema.
// mongoose.models.email được kiểm tra để xem có tồn tại model email chưa;
// nếu không, mongoose.model("email", EmailSchema) sẽ tạo model mới.
const EmailModel =
  mongoose.models.email || mongoose.model("email", EmailSchema);

export default EmailModel;
