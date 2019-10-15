export interface UserMention {
  statusCode: string;
  data: UserMentionData[];
}

export interface UserMentionData {
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