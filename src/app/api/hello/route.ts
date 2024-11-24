import { NextResponse , NextRequest} from 'next/server';

export async function GET(req: Request, res: Response) {
    return NextResponse.json({ message: 'Hello World' });
}

export async function POST(req: Request, res: Response) {
    return NextResponse.json({ message: 'Hello World', method: 'POST' });
}
