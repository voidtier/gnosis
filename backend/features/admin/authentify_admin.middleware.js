import jsonwebtoken from "jsonwebtoken";

export default function authentify_admin(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    // 401 means "Unauthenticated"
    return res.status(401).json({ message: "No token found, please log in." });
  }

  try {
    const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== "admin") {
      // 403 means "Forbidden" (You are logged in, but you aren't allowed here)
      return res.status(403).json({ message: "Access denied. Admins only." });
    }

    req.user = decoded;
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ message: "token expired, please log in again." });
  }
}
