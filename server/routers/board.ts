import express, {Request, Response} from 'express';
import Board, {BoardDocument} from '../models/board';
import {STATUS_CODE} from '../entities/status-code';

const boardRouter = express.Router();

boardRouter.get('/status', async (req: Request, res: Response) => {
  try {
    const {conn_string} = req.query;
    if (!!conn_string && typeof conn_string !== 'string') {
      return res.status(400).json({error: 'Invalid query parameter'});
    }

    const board: BoardDocument | null = await Board.findOne({
      connection_string: conn_string,
    });

    if (!board) {
      return res.json({status: STATUS_CODE.FAILURE, message: 'Board not found'});
    }

    const currentTime = Date.now();
    const lastPingTime = board.ping.getTime();

    if (currentTime - lastPingTime < 10000) {
      return res.json({status: STATUS_CODE.SUCCESS, message: 'Online'});
    } else {
      return res.json({status: STATUS_CODE.FAILURE, message: 'Offline'});
    }
  } catch (error) {
    res.status(500).json({status: STATUS_CODE.FAILURE, message: 'Internal server error'});
  }
});

boardRouter.get('/ping', async (req: Request, res: Response) => {
  try {
    const {connection_string} = req.query;
    if (!!connection_string) {
      return res.status(400).json({status: STATUS_CODE.FAILURE, message: 'Invalid query parameter'});
    }

    const timeNow = new Date();
    const updateResponse = await Board.updateOne(
      {connection_string: connection_string},
      {
        $set: {
          ping: timeNow,
        },
        $currentDate: {lastModified: true},
      }
    );

    if (updateResponse.matchedCount === 0) {
      return res.status(404).json({status: STATUS_CODE.FAILURE, message: 'Board not found'});
    }

    const board = await Board.findOne({
      connection_string: connection_string,
    });
    if (!board)
      return res.status(404).json({status: STATUS_CODE.FAILURE, message: 'Board not found'});

    const responseString = `${board.to}_${board.from}`;
    res.json({status: STATUS_CODE.SUCCESS, message: responseString});
  } catch (err) {
    res.status(500).json({status: STATUS_CODE.FAILURE, message: err});
  }
});

boardRouter.get('/setComplete', async (req: Request, res: Response) => {
  try {
    const {connection_string} = req.query;

    if (typeof connection_string !== 'string') {
      return res.status(400).json({success: STATUS_CODE.FAILURE, message: 'Invalid query parameter'});
    }

    const response = await Board.updateOne(
      {connection_string: connection_string},
      {
        $set: {
          status: 'available',
          from: null,
          to: null,
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

export default boardRouter;
