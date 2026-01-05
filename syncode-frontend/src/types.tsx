
export interface User {
  id: string;
  username: string;
  email: string;
}

export enum ProgrammingLanguage {
  JAVASCRIPT = 'javascript',
  PYTHON = 'python'
}

export interface Room {
  id: string;
  name: string;
  language: ProgrammingLanguage;
  createdBy: string;
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}
