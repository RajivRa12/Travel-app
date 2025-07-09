import { Router, Request, Response } from "express";
import Notification from "../models/Notification";
import webpush from 'web-push';
import User from '../models/User';

const router = Router();

// Create notification
router.post("/", async (req: Request, res: Response) => {
  const { user, type, message, data } = req.body;
  if (!user || !type || !message) return res.status(400).json({ error: "Missing fields" });
  const notification = new Notification({ user, type, message, data });
  await notification.save();
  // Send push notification if user has subscription
  const userDoc = await User.findOne({ email: user });
  if (userDoc && userDoc.pushSubscription) {
    try {
      await webpush.sendNotification(
        userDoc.pushSubscription,
        JSON.stringify({
          title: 'Travel App',
          body: message,
          url: data && data.bookingId ? `/bookings/${data.bookingId}` : '/',
        })
      );
    } catch (err) {
      console.error('Web push error:', err);
    }
  }
  res.status(201).json({ notification });
});

// Fetch notifications for user
router.get("/:user", async (req: Request, res: Response) => {
  const { user } = req.params;
  const notifications = await Notification.find({ user }).sort({ createdAt: -1 });
  res.json({ notifications });
});

// Mark notification as read
router.put("/:id/read", async (req: Request, res: Response) => {
  const { id } = req.params;
  const notification = await Notification.findByIdAndUpdate(id, { read: true }, { new: true });
  if (!notification) return res.status(404).json({ error: "Notification not found" });
  res.json({ notification });
});

export default router; 