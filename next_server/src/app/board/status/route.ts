import {STATUS_CODE} from '@server/entities/status-code';
import Board from '@server/models/board';
import {NextRequest, NextResponse} from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const req = await request.json()
    const {connection_string} = (req.body);
    if (!connection_string || typeof connection_string !== 'string') {
      return NextResponse.json({error: 'Invalid query parameter'});
    }

    const board = await Board.findOne({
      connection_string: connection_string,
    });

    if (!board) {
      return NextResponse.json({status: STATUS_CODE.FAILURE, message: 'Board not found'});
    }

    const currentTime = Date.now();
    const lastPingTime = board.ping.getTime();

    if (currentTime - lastPingTime < 10000) {
      return NextResponse.json({status: STATUS_CODE.SUCCESS, message: 'Online'});
    } else {
      return NextResponse.json({status: STATUS_CODE.FAILURE, message: 'Offline'});
    }
  } catch (error) {
    return NextResponse.json({status: STATUS_CODE.FAILURE, message: 'Internal server error'});
  }
}
