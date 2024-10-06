export type Organization = {
    id: string;
    name: string;
    color: string;
    created_at: string;
    updated_at: string;
    favorite: boolean;
    project_count: number;
    status: string;
    user_count: number;
  }
  
 export type OrgUser = {
    organization_id: string;
    role: string;
  }