import {Schema, model} from 'mongoose';
import {TBoard, BoardModel} from '@server/entities/board-schema';


const boardSchema = new Schema<TBoard, BoardModel>({
  connection_string: {
    type: String,
    minlength: 5,
    maxlength: 15,
    unique: true,
    required: true,
  },
  ping: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
  },
  from: {
    type: String,
    default: null,
  },
  to: {
    type: String,
    default: null,
  },
});

export * from '@server/entities/board-schema'
export default model('Board', boardSchema);
