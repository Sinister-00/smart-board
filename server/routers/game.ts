import express, {Request, Response} from 'express';
import Board from '../models/board';
import {STATUS_CODE} from '../entities/status-code';

const gameRouter = express.Router();

gameRouter.post('/registerBoard', async (req: Request, res: Response) => {
  try {
    const {connection_string} = req.body;
    if (!!connection_string) {
      return res.status(400).json({success: STATUS_CODE.FAILURE, message: 'Invalid request'});
    }

    const board = new Board({
      connection_string: connection_string,
      status: 'available',
    });
    const savedBoard = await board.save();
    res.json({
      success: STATUS_CODE.SUCCESS,
      _id: savedBoard._id,
    });

  } catch (err) {
    res.status(500).json({success: STATUS_CODE.FAILURE, message: err});
  }
});

gameRouter.post('/sendMove', async (req: Request, res: Response) => {
  try {
    const {connection_string, from, to} = req.body;
    if (!!connection_string || !!from || !!to) {
      return res.status(400).json({success: STATUS_CODE.FAILURE, message: 'Invalid request'});
    }

    const response = await Board.updateOne(
      {connection_string: connection_string},
      {
        $set: {
          from: from,
          to: to,
          status: 'processing',
        },
        $currentDate: {lastModified: true},
      }
    );
    if (response.matchedCount === 0) {
      return res.status(404).json({success: STATUS_CODE.FAILURE, message: 'Board not found'});
    }
    res.json({success: STATUS_CODE.SUCCESS});

  } catch (err) {
    res.status(500).json({success: STATUS_CODE.FAILURE, message: err});
  }
});

export default gameRouter;
