import {STATUS_CODE} from '@server/entities/status-code';
import Board from '@server/models/board';
import {NextRequest, NextResponse} from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const req = await request.json()
    const {connection_string} = (req.body);

    if (!connection_string) {
      return NextResponse.json({success: STATUS_CODE.FAILURE, message: 'Invalid request'});
    }

    const board = new Board({
      connection_string: connection_string,
      status: 'available',
    });
    const savedBoard = await board.save();
    return NextResponse.json({
      success: STATUS_CODE.SUCCESS,
      _id: savedBoard._id,
    });

  } catch (err) {
    return NextResponse.json({success: STATUS_CODE.FAILURE, message: err});
  }
}
