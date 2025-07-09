import Notification from "../models/Notification";
import Booking from "../models/Booking";

// After booking is confirmed:
await Notification.create({
  user: booking.userEmail,
  type: "booking",
  message: `Your booking #${booking._id} is confirmed!`,
  data: { bookingId: booking._id }
}); 