import mongoose, { Schema, Document, Model, Types } from "mongoose";

export interface IScan extends Document {
  qrId: Types.ObjectId;
  timestamp: Date;
  ipHash: string;
  userAgent: string;
  device: string;
  browser: string;
  os: string;
  country: string;
  city: string;
  referrer: string;
}

const ScanSchema = new Schema<IScan>({
  qrId: { type: Schema.Types.ObjectId, ref: "DynamicQR", required: true },
  timestamp: { type: Date, default: Date.now },
  ipHash: { type: String, default: "" },
  userAgent: { type: String, default: "" },
  device: { type: String, default: "unknown" },
  browser: { type: String, default: "unknown" },
  os: { type: String, default: "unknown" },
  country: { type: String, default: "unknown" },
  city: { type: String, default: "unknown" },
  referrer: { type: String, default: "" },
});

ScanSchema.index({ qrId: 1, timestamp: -1 });
ScanSchema.index({ qrId: 1 });

const Scan: Model<IScan> =
  mongoose.models.Scan || mongoose.model<IScan>("Scan", ScanSchema);

export default Scan;
