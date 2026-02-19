export type StaffStatus = 'active' | 'inactive';

export type DepartmentRecord = {
  id: number;
  name?: string;
  names?: { en?: string; ar?: string };
};

export type PositionRecord = {
  id: number;
  name?: string;
  names?: { en?: string; ar?: string };
};

export type StaffRecord = {
  id: number;
  name: string;
  email: string;
  roles: string[];
  department: DepartmentRecord | null;
  position: PositionRecord | null;
  profilePhotoUrl: string | null;
  status: string;
  verified: boolean;
};

