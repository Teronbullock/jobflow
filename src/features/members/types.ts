export interface Member {
  organizationId: string;
  userId: string;
  role: string;
  createdAt: Date;
  id: string;
  user: {
    id: string;
    name: string;
    email: string;
    image?: string | null;
  };
}

export interface MembersResponse {
  members: Member[];
  total: number;
}
