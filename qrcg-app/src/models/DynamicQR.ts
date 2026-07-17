import mongoose, { Schema, Document, Model, Types } from "mongoose";

export interface IDynamicQR extends Document {
  userId: Types.ObjectId;
  name: string;
  shortCode: string;
  targetUrl: string;
  qrDesign: {
    dotsStyle: string;
    dotsColor: string;
    cornersSquareStyle: string;
    cornersSquareColor: string;
    cornersDotStyle: string;
    cornersDotColor: string;
    backgroundColor: string;
    backgroundRoundness: number;
    transparentBackground: boolean;
    logoUrl?: string;
    logoSize: number;
    margin: number;
  };
  status: "active" | "paused";
  totalScans: number;
  createdAt: Date;
  updatedAt: Date;
}

const DynamicQRSchema = new Schema<IDynamicQR>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true, trim: true },
    shortCode: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    targetUrl: { type: String, required: true },
    qrDesign: {
      dotsStyle: { type: String, default: "rounded" },
      dotsColor: { type: String, default: "#080808" },
      cornersSquareStyle: { type: String, default: "extra-rounded" },
      cornersSquareColor: { type: String, default: "#080808" },
      cornersDotStyle: { type: String, default: "dot" },
      cornersDotColor: { type: String, default: "#080808" },
      backgroundColor: { type: String, default: "#ffffff" },
      backgroundRoundness: { type: Number, default: 0 },
      transparentBackground: { type: Boolean, default: false },
      logoUrl: { type: String },
      logoSize: { type: Number, default: 0.4 },
      margin: { type: Number, default: 10 },
    },
    status: {
      type: String,
      enum: ["active", "paused"],
      default: "active",
    },
    totalScans: { type: Number, default: 0 },
  },
  { timestamps: true }
);

DynamicQRSchema.index({ userId: 1, createdAt: -1 });
DynamicQRSchema.index({ shortCode: 1 });

const DynamicQR: Model<IDynamicQR> =
  mongoose.models.DynamicQR ||
  mongoose.model<IDynamicQR>("DynamicQR", DynamicQRSchema);

export default DynamicQR;
