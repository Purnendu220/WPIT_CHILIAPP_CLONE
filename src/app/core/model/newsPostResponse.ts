export interface NewsPostResponse {
  statusCode: string;
  data: NewsPostResponseData[];
}

export interface NewsPostResponseData {
  id: number;
  virtualNewsId: number;
  newsText: string;
  masterPostTypeId: number;
  board?: Board;
  user: User;
  viewCount: number;
  likeCount: number;
  commentCount: number;
  isLiked: boolean;
  isCommented: boolean;
  isViewed: boolean;
  modifiedAt: number;
  createdAt: number;
}

export interface User {
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

export interface Board {
  id: number;
  name: string;
}