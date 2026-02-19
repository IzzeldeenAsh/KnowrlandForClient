export type RoleRecord = {
  id: number;
  name: string;
  display_name: string;
  description?: string;
  permissions?: unknown[];
};

export type PermissionRecord = {
  id: number;
  name: string;
  display_name: string;
  description?: string;
};

