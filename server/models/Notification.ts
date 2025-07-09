import mongoose, { Document, Schema } from "mongoose";

export interface INotification extends Document {
  user: string;
  type: string;
  message: string;
  data: any;
  read: boolean;
  createdAt: Date;
}

const NotificationSchema = new Schema<INotification>({
  user: { type: String, required: true },
  type: { type: String, required: true },
  message: { type: String, required: true },
  data: { type: Schema.Types.Mixed },
  read: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

const Notification = mongoose.model<INotification>("Notification", NotificationSchema);
export default Notification; 