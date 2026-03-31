export type ClientAction = 'deactivate' | 'delete';

export type ClientRecord = {
  id: number;
  name: string;
  email: string;
  whatsappCountryCode: string | null;
  whatsappNumber: string | null;
  country: string | null;
  status: string;
  verified: boolean;
};
