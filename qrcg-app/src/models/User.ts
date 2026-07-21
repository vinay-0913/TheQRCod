import mongoose, { Schema, Document, Model } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  hashedPassword?: string;
  plan: "free" | "pro";
  qrLimit: number;
  planExpiresAt?: Date;
  razorpayPaymentId?: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    hashedPassword: { type: String },
    plan: { type: String, enum: ["free", "pro"], default: "free" },
    qrLimit: { type: Number, default: 0 },
    planExpiresAt: { type: Date },
    razorpayPaymentId: { type: String },
  },
  { timestamps: true }
);

const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;
