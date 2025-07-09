import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  email: string;
  password: string;
  name: string;
  role: "customer" | "agent" | "admin";
  pushSubscription?: any;
}

const UserSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  role: { type: String, enum: ["customer", "agent", "admin"], default: "customer" },
  pushSubscription: { type: Schema.Types.Mixed },
});

const User = mongoose.model<IUser>("User", UserSchema);
export default User; 