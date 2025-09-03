export type JobRole = 'tech' | 'id' | 'gd' | 'qa';

// User interface
export interface User {
  id?: number;           
  username: string;      
  email: string;         
  jobRole: JobRole;      
}
