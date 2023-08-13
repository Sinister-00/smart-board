import {Document, Model} from 'mongoose';

type TBoard = {
  connection_string: string;
  ping: Date;
  status?: string;
  from?: string | null;
  to?: string | null;
};

type BoardDocument = TBoard & Document;

type BoardModel = Model<BoardDocument>;

export {TBoard, BoardDocument, BoardModel};