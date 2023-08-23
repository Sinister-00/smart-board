import {STATUS_CODE} from '@server/entities/status-code';
import Board from '@server/models/board';
import {NextRequest, NextResponse} from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const req = await request.json()
    const {connection_string, from, to} = req.body;

    if (!connection_string || !from || !to) {
      return NextResponse.json({success: STATUS_CODE.FAILURE, message: 'Invalid request'});
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
      return NextResponse.json({success: STATUS_CODE.FAILURE, message: 'Board not found'});
    }

    return NextResponse.json({success: STATUS_CODE.SUCCESS});

  } catch (err) {
    return NextResponse.json({success: STATUS_CODE.FAILURE, message: err});
  }
}
