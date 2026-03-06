// import jwt from "jsonwebtoken";
// // seller login :/api/seller/login
// export const sellerLogin = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     if (
//       password === process.env.SELLER_PASSWORD &&
//       email === process.env.SELLER_EMAIL
//     ) {
//       const token = jwt.sign({ email }, process.env.JWT_SECRET, {
//         expiresIn: "7d",
//       });
//       res.cookie("sellerToken", token, {
//         httpOnly: true,
//         secure: process.env.NODE_ENV === "production",
//         sameSite: process.env.NODE_ENV === "production" ? "none" : "Strict",
//         maxAge: 7 * 24 * 60 * 60 * 1000,
//       });
//       return res
//         .status(200)
//         .json({ message: "Login successful", success: true });
//     } else {
//       return res
//         .status(400)
//         .json({ message: "Invalid credentials", success: false });
//     }
//   } catch (error) {
//     console.error("Error in sellerLogin:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

// // check seller auth  : /api/seller/is-auth
// export const checkAuth = async (req, res) => {
//   try {
//     res.status(200).json({
//       success: true,
//     });
//   } catch (error) {
//     console.error("Error in checkAuth:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };
// // logout seller: /api/seller/logout
// export const sellerLogout = async (req, res) => {
//   try {
//     res.clearCookie("sellerToken", {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       sameSite: process.env.NODE_ENV === "production" ? "none" : "Strict",
//     });
//     return res.status(200).json({
//       message: "Logged out successfully",
//       success: true,
//     });
//   } catch (error) {
//     console.error("Error in logout:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };
import jwt from "jsonwebtoken";


// seller login
export const sellerLogin = async (req, res) => {

  try {

    const { email, password } = req.body;

    if (
      email === process.env.SELLER_EMAIL &&
      password === process.env.SELLER_PASSWORD
    ) {

      const token = jwt.sign(
        { email },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );

      res.cookie("sellerToken", token, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        maxAge: 7 * 24 * 60 * 60 * 1000
      });

      return res.status(200).json({
        success: true,
        message: "Seller login successful"
      });

    } else {

      return res.status(400).json({
        success: false,
        message: "Invalid credentials"
      });

    }

  } catch (error) {

    console.error("sellerLogin error:", error);

    res.status(500).json({
      success: false,
      message: "Internal server error"
    });

  }

};


// check seller auth
export const checkAuth = async (req, res) => {

  try {

    res.status(200).json({
      success: true
    });

  } catch (error) {

    console.error("seller checkAuth error:", error);

    res.status(500).json({
      success: false,
      message: "Internal server error"
    });

  }

};


// seller logout
export const sellerLogout = async (req, res) => {

  try {

    res.clearCookie("sellerToken", {
      httpOnly: true,
      secure: true,
      sameSite: "None"
    });

    res.status(200).json({
      success: true,
      message: "Seller logged out successfully"
    });

  } catch (error) {

    console.error("sellerLogout error:", error);

    res.status(500).json({
      success: false,
      message: "Internal server error"
    });

  }

};
