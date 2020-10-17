import mongoose, { Schema, Document } from "mongoose";

export interface IItem extends Document {
  name: string;
  description: string;
  attributes: Record<string, any>;
}

const ItemSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  attributes: { type: Object, default: {} },
});

export default mongoose.model<IItem>("Item", ItemSchema);
