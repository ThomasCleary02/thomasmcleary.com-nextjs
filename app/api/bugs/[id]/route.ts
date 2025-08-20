import { NextRequest, NextResponse } from 'next/server';
import { BugService } from '@/lib/services/bug';

export async function DELETE(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
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
    const bug = await BugService.updateBugStatus(params.id, updates.status, updates.admin_notes);
    return NextResponse.json(bug);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Failed to update bug report' }, { status: 500 });
  }
}
