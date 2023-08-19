import {STATUS_CODE} from '@server/entities/status-code';
import Board from '@server/models/board';
import {NextRequest, NextResponse} from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const req = await request.json()
    const {connection_string} = (req.body);
    if (!connection_string) {
      const body = {status: STATUS_CODE.FAILURE, message: 'Invalid query parameter'}
      return NextResponse.json(body)
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
      return NextResponse.json({status: STATUS_CODE.FAILURE, message: 'Board not found'});
    }

    const board = await Board.findOne({
      connection_string: connection_string,
    });
    if (!board)
      return NextResponse.json({status: STATUS_CODE.FAILURE, message: 'Board not found'});

    const responseString = `${board.to}_${board.from}`;
    return NextResponse.json({status: STATUS_CODE.SUCCESS, message: responseString});
  } catch (err) {
    return NextResponse.json({status: STATUS_CODE.FAILURE, message: err});
  }
}
