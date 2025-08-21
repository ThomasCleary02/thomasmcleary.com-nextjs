import { NextRequest, NextResponse } from 'next/server';
import { BugService } from '@/lib/services/bug';
import { AuthService } from '@/lib/utils/auth';

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Verify admin authentication
    const token = request.cookies.get('admin_token')?.value;
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const payload = AuthService.verifyToken(token);
    if (!payload) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    await BugService.deleteBug(params.id);
    return NextResponse.json({ message: 'Bug report deleted successfully' });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Failed to delete bug report' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const updates = await request.json();
    const bug = await BugService.updateBug(params.id, {
      status: updates.status,
      admin_notes: updates.admin_notes
    });
    return NextResponse.json(bug);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Failed to update bug report' }, { status: 500 });
  }
}
