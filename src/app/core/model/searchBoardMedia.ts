export interface SearchBoardMedia {
  statusCode: string;
  data: SearchBoardMediaData[];
}

export interface SearchBoardMediaData {
  board: Board;
  media: Media[];
  totalMediaCount: number;
}

export interface Media {
  id: number;
  mediaType: string;
  mediaName: string;
  originalMediaName: string;
  mediaSize: string;
  mediaSizeInByte: number;
  mediaPath: string;
  status: boolean;
  createdAt: number;
}

export interface Board {
  id: number;
  name: string;
}