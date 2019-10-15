export interface UniversityListObject {
  statusCode: string;
  totalCount: number;
  data: UniversityListData[];
}

export interface UniversityListData {
  id: number;
  name: string;
  abbreviation?: string;
  address?: string;
  status: boolean;
  verified: boolean;
  deleted: boolean;
  createdAt: number;
  modifiedAt: number;
  cityId?: number;
  alternativename?: string;
  phone?: string;
  pincode?: string;
  createdByUserId?: number;
  website?: string;
}