import mongoose, { Document, Schema } from "mongoose";

export interface IMessage extends Document {
  sender: string;
  recipient: string;
  content: string;
  timestamp: Date;
  read: boolean;
  room: string;
}

const MessageSchema = new Schema<IMessage>({
  sender: { type: String, required: true },
  recipient: { type: String, required: true },
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  read: { type: Boolean, default: false },
  room: { type: String, required: true },
});

const Message = mongoose.model<IMessage>("Message", MessageSchema);
export default Message; 