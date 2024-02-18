// import jwtDecode from "jwt-decode"; // Thư viện giải mã JWT trong React Native
// import { CLERK_PEM_PUBLIC_KEY } from "@env";

// export default async function handleAuthentication(req, res) {
//   try {
//     // Lấy token từ cookies hoặc header Authorization
//     const sessToken = req.cookies["__session"]; // Cookie __session chứa token
//     const token = req.headers.authorization;

//     // Kiểm tra xem người dùng đã đăng nhập chưa
//     if (sessToken === undefined && token === undefined) {
//       res.status(401).json({ error: "not signed in" });
//       return;
//     }

//     // Giải mã token và trả về thông tin xác thực
//     let decoded = "";
//     if (token) {
//       decoded = jwtDecode(token, CLERK_PEM_PUBLIC_KEY);
//       res.status(200).json({ sessToken: decoded });
//     } else {
//       decoded = jwtDecode(sessToken, CLERK_PEM_PUBLIC_KEY);
//       res.status(200).json({ sessToken: decoded });
//     }
//   } catch (error) {
//     res.status(400).json({
//       error: "Invalid Token",
//     });
//   }
// }
