import bcryptjs from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import user_model from "../user/user.model.js";

export async function login_admin_controller(req, res) {
  try {
    const { email, password } = req.body;
    const foundUser = await user_model.findOne({ email });
    if (!foundUser) {
      return res.json("email or password is incorrect");
    }

    if (foundUser.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Access denied. Admin only.", success: false });
    }

    const corretPassword = await bcryptjs.compare(password, foundUser.password);

    if (!corretPassword) {
      return res
        .status(401)
        .json({ message: "email or password is incorrect", success: false });
    }

    const token = jsonwebtoken.sign(
      {
        id: foundUser._id,
        username: foundUser.username,
        email: foundUser.email,
        role: foundUser.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );

    res.cookie("token", token, { httpOnly: true });
    return res.status(200).json({
      message: "Welcome back, Admin",
      user: {
        username: foundUser.username,
        email: foundUser.email,
        role: foundUser.role,
      },
      success: true,
    });
  } catch (error) {
    return res.status(500).send("Error logging in: " + error.message);
  }
}

export async function get_user_data() {
  try {
    const { user } = req;

    if (!user) {
      return res.status(403).json({
        message: "Access denied. User isn't available",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Welcome back, Admin",
      user: {
        username: user.username,
        email: user.email,
        role: user.role,
      },
      success: true,
    });
  } catch (error) {
    return res.status(500).send("Error letting in: " + error.message);
  }
}
