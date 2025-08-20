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
  featured_project?: boolean;
  status?: 'active' | 'inactive' | 'archived';
  demo_type?: 'live' | 'local' | 'video' | 'none' | 'api' | 'discord';
  setup_instructions?: string;
  
  // Discord-specific fields
  discord_bot_id?: string;
  discord_invite_url?: string;
  discord_commands?: string[];
  discord_setup_steps?: string;
}

export interface CreateProjectRequest {
  title: string;
  affiliation?: string;
  description: string;
  technologies: string[];
  live_demo_url: string;
  github_url: string;
  image_url: string;
  featured_project?: boolean;
  status?: 'active' | 'inactive' | 'archived';
  demo_type?: 'live' | 'local' | 'video' | 'none' | 'api' | 'discord';
  setup_instructions?: string;
  
  // Discord-specific fields
  discord_bot_id?: string;
  discord_invite_url?: string;
  discord_commands?: string[];
  discord_setup_steps?: string;
}

export interface UpdateProjectRequest extends Partial<CreateProjectRequest> {
  id: string;
} 