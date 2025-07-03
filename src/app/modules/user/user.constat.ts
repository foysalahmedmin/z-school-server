import { TRole } from './user.type';

export const ROLES: TRole[] = [
  'super-admin',
  'admin',
  'faculty',
  'student',
] as const;
