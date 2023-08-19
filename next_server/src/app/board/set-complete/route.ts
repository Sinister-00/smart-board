import {STATUS_CODE} from '@server/entities/status-code';
import Board from '@server/models/board';
import {NextRequest, NextResponse} from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const req = await request.json()
    const {connection_string} = (req.body);
    if (!connection_string) {
      return NextResponse.json({success: STATUS_CODE.FAILURE, message: 'Invalid query parameter'});
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
      return NextResponse.json({success: STATUS_CODE.FAILURE, message: 'Board not found'});
    }

    return NextResponse.json({success: STATUS_CODE.SUCCESS});
  } catch (err) {
    return NextResponse.json({success: STATUS_CODE.FAILURE, message: err});
  }
}
