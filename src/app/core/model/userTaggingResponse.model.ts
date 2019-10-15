export interface HashTagObject {
  statusCode: string;
  totalCount: number;
  data: HashTagData[];
}

export interface HashTagData {
  id: number;
  name: string;
}