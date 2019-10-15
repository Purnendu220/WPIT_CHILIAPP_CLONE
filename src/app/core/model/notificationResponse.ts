export interface NotificationListResponse {
  statusCode: string;
  totalCount: number;
  data: NotificationListData;
}

export interface NotificationListData {
  joinBoardRequest: JoinBoardRequest;
  notifications: Notification[];
}

export interface Notification {
  id: number;
  notificationTypeId: number;
  notificationType: string;
  objectDataId: number;
  userWhoFiredEvent: UserWhoFiredEvent;
  userToNotify: UserWhoFiredEvent;
  message: string;
  isRead: boolean;
  createdAt: number;
}

export interface UserWhoFiredEvent {
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

export interface JoinBoardRequest {
  joinBoardRequestCount: number;
}
