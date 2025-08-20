export interface Bug {
  id: string;
  title: string;
  description: string;
  steps_to_reproduce?: string;
  expected_behavior?: string;
  actual_behavior?: string;
  browser?: string;
  operating_system?: string;
  user_email?: string;
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'critical';
  created_at: string;
  updated_at: string;
  resolved_at?: string;
  admin_notes?: string;
}

export interface CreateBugRequest {
  title: string;
  description: string;
  steps_to_reproduce?: string;
  expected_behavior?: string;
  actual_behavior?: string;
  browser?: string;
  operating_system?: string;
  user_email?: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
}

export interface UpdateBugRequest {
  status?: 'open' | 'in_progress' | 'resolved' | 'closed';
  priority?: 'low' | 'medium' | 'high' | 'critical';
  admin_notes?: string;
}