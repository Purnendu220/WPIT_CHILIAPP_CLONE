export interface UserProfile {
  statusCode: string;
  data: UserData;
}

export interface UserData {
  id: number;
  userTypeId: number;
  universityId: number;
  university: University;
  departmentId: number;
  department: Department;
  profileImage: ProfileImage;
  backgroundImage: ProfileImage;
  name: string;
  username: string;
  email: string;
  bio: string;
  mobileNo: string;
  gender: string;
  dob: number;
  major: string;
  graduationYear: number;
  canAddNews: boolean;
  receivePrivateMsgNotification: boolean;
  receivePrivateMsg: boolean;
  receiveCommentNotification: boolean;
  receiveLikeNotification: boolean;
  receiveFavoriteFollowNotification: boolean;
  receiveNewPostNotification: boolean;
  allowInPopularList: boolean;
  deactivatedByAdmin: boolean;
  xmppResponse: string;
  xmppDatetime: number;
  status: boolean;
  userVerified: boolean;
  emailVerified: boolean;
  newsCount: number;
  followerCount: number;
  followingCount: number;
  joinedBoardCount: number;
  board: Board[];
  isPremiumUser: boolean;
  packageInfo: PackageInfo;
  isfollow: boolean;
  totalAllocatedSpace: number;
  consumedSpace: number;
  createdAt: number;
  isBlocked: boolean;
  autoRenew: boolean;
  paymentMessage: string;
}

export interface PackageInfo {
  id: number;
  name: string;
  referenceId: string;
  trackId: string;
  description: string;
  allowImageInPost: number;
  allowBoards: number;
  audioLimit: number;
  videoLimit: number;
  cost: number;
  currencyUnit: string;
  purchaseDate: number;
  expiryDate: number;
}

export interface Board {
  id: number;
  userId: number;
  name: string;
  joinBoardCount: number;
  newsPostCount: number;
  isJoined: number;
  isPrivate: boolean;
  isArchived: boolean;
  createdAt: number;
  modifiedAt: number;
}

export interface ProfileImage {
  id: number;
  mediaType: string;
  originalMediaName: string;
  mediaSize: string;
  mediaSizeInByte: number;
  mediaPath: string;
  thumbnailPath: string;
  height: number;
  width: number;
  status: boolean;
  createdAt: number;
}

export interface Department {
  id: number;
  name: string;
  status: boolean;
  createdAt: number;
  modifiedAt: number;
}

export interface University {
  id: number;
  name: string;
  abbreviation: string;
  status: boolean;
  verified: boolean;
  deleted: boolean;
  createdAt: number;
  modifiedAt: number;
}