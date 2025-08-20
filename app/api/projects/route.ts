import { NextRequest, NextResponse } from 'next/server';
import { ProjectService } from '@/lib/services/project';
import { CreateProjectRequest } from '@/lib/types/project';

/**
 * API endpoint for project management
 * Supports GET (list projects) and POST (create project) operations
 */

/**
 * Retrieves all projects
 * @param {NextRequest} request - The incoming request object
 * @returns {Promise<NextResponse>} JSON response containing projects array
 */
export async function GET(): Promise<NextResponse> {
  try {
    const projects = await ProjectService.getProjects();
    return NextResponse.json(projects);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    );
  }
}

/**
 * Creates a new project
 * @param {NextRequest} request - The incoming request containing project data
 * @returns {Promise<NextResponse>} JSON response containing the created project
 */
export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body: CreateProjectRequest = await request.json();
    
    // Basic validation
    if (!body.title || !body.description || !body.technologies) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const project = await ProjectService.createProject(body);
    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Failed to create project' },
      { status: 500 }
    );
  }
} 