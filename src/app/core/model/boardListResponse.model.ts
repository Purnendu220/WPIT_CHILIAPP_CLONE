export interface BoardListResponse {
  statusCode: string;
  data: BoardListData[];
}

export interface BoardListData {
  id: number;
  userId: number;
  userBasicInfoDto: UserBasicInfoDto;
  name: string;
  joinBoardCount: number;
  newsPostCount: number;
  isJoined: number;
  isPrivate: boolean;
  isArchived: boolean;
  modifiedAt: number;
}

export interface UserBasicInfoDto {
  id: number;
  userTypeId: number;
  name: string;
  username: string;
  email: string;
  profileImage: string;
  profileImageThumbnail: string;
  isfollow: boolean;
  receivePrivateMsg: boolean;
  isBlocked: boolean;
}