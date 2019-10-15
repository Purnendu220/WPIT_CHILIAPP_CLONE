export interface UserBasic {
    id: number;
    userTypeId: number;
    name: string;
    username: string;
    email: string;
    profileImage: string;
    coverImage: string;
    profileImageThumbnail: string;
    coverImageThumbnail: string;
    isfollow: boolean;
    receivePrivateMsg: boolean;
    isBlocked: boolean;
}
