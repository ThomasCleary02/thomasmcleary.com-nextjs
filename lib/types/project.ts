export interface Project {
  id: string;
  title: string;
  affiliation?: string;
  description: string;
  technologies: string[];
  live_demo_url: string;
  github_url: string;
  image_url: string;
  created_at: string;
}

export interface CreateProjectRequest {
  title: string;
  affiliation?: string;
  description: string;
  technologies: string[];
  live_demo_url: string;
  github_url: string;
  image_url: string;
}

export interface UpdateProjectRequest extends Partial<CreateProjectRequest> {
  id: string;
} 