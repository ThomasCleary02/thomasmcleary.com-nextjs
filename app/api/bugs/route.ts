import { NextRequest, NextResponse } from 'next/server';
import { BugService } from '@/lib/services/bug';

export async function POST(request: NextRequest) {
  try {
    const bugData = await request.json();
    
    if (!bugData.title || !bugData.description) {
      return NextResponse.json(
        { error: 'Title and description are required' }, 
        { status: 400 }
      );
    }
    
    const bug = await BugService.createBug(bugData);
    return NextResponse.json(bug);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Failed to submit bug report' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const isAdmin = searchParams.get('admin') === 'true';
    
    if (!isAdmin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const bugs = await BugService.getAllBugs();
    return NextResponse.json(bugs);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch bugs' }, { status: 500 });
  }
}
