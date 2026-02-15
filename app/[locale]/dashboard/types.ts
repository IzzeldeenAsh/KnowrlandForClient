export type ClientAction = 'deactivate' | 'delete';

export type ClientRecord = {
  id: number;
  name: string;
  email: string;
  country: string | null;
  status: string;
  verified: boolean;
};
