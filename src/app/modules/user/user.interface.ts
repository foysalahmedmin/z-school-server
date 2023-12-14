export interface TUser {
  id: string;
  username: string;
  password: string;
  need_password_change: boolean;
  role: 'admin' | 'student' | 'faculty';
  status: 'in-progress' | 'blocked';
  is_deleted: boolean;
}
