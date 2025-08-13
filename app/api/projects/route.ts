import { NextRequest, NextResponse } from 'next/server';
import { getAllProjects, createProject } from '@/lib/services/projectService';
import { CreateProjectRequest } from '@/lib/types/project';

export async function GET() {
  try {
    const projects = await getAllProjects();
    return NextResponse.json(projects);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: CreateProjectRequest = await request.json();
    
    // Basic validation
    if (!body.title || !body.description || !body.technologies) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const project = await createProject(body);
    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Failed to create project' },
      { status: 500 }
    );
  }
} 