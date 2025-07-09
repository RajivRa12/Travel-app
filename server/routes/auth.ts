import { Router, Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/User";

const JWT_SECRET = process.env.JWT_SECRET || "dev_secret";
const router = Router();

// Admin-only middleware
function requireAdmin(req: Request, res: Response, next: NextFunction) {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith("Bearer ")) return res.status(401).json({ error: "No token" });
  try {
    const decoded = jwt.verify(auth.split(" ")[1], JWT_SECRET) as { email: string; role: string };
    if (decoded.role !== "admin") return res.status(403).json({ error: "Admin only" });
    (req as any).user = decoded;
    next();
  } catch {
    return res.status(401).json({ error: "Invalid token" });
  }
}

// Register
router.post("/register", async (req: Request, res: Response) => {
  const { email, password, name, role } = req.body;
  if (!email || !password || !name) {
    return res.status(400).json({ error: "Missing fields" });
  }
  const existing = await User.findOne({ email });
  if (existing) {
    return res.status(409).json({ error: "User already exists" });
  }
  const hashed = await bcrypt.hash(password, 10);
  const user = new User({ email, password: hashed, name, role: role === "admin" ? "admin" : "customer" });
  await user.save();
  return res.status(201).json({ message: "User registered" });
});

// Login
router.post("/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ error: "Invalid credentials" });
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json({ error: "Invalid credentials" });
  const token = jwt.sign({ email, name: user.name, role: user.role }, JWT_SECRET, { expiresIn: "1d" });
  return res.json({ token, user: { email, name: user.name, role: user.role } });
});

// Profile (protected)
router.get("/profile", async (req: Request, res: Response) => {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith("Bearer ")) return res.status(401).json({ error: "No token" });
  try {
    const decoded = jwt.verify(auth.split(" ")[1], JWT_SECRET) as { email: string; name: string; role: string };
    const user = await User.findOne({ email: decoded.email });
    if (!user) return res.status(404).json({ error: "User not found" });
    return res.json({ email: user.email, name: user.name, role: user.role });
  } catch {
    return res.status(401).json({ error: "Invalid token" });
  }
});

// Admin: List all users
router.get("/admin/users", requireAdmin, async (req: Request, res: Response) => {
  const users = await User.find();
  return res.json({ users });
});

// Admin: Update user (name, role)
router.put("/admin/users/:email", requireAdmin, async (req: Request, res: Response) => {
  const { email } = req.params;
  const { name, role } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ error: "User not found" });
  if (name) user.name = name;
  if (role) user.role = role;
  await user.save();
  return res.json({ message: "User updated", user });
});

// Admin: Delete user
router.delete("/admin/users/:email", requireAdmin, async (req: Request, res: Response) => {
  const { email } = req.params;
  const user = await User.findOneAndDelete({ email });
  if (!user) return res.status(404).json({ error: "User not found" });
  return res.json({ message: "User deleted" });
});

export default router; 