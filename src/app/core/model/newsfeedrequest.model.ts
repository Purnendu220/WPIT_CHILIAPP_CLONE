export class NewsFeedRequest {
  userId: number;
  boardId:number;
  timestampForPage: number;
  rows: number;
  idForPage: number;
  pageDirection: string;
  type: string;
  appVersion: string;
}
