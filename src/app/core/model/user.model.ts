import { University } from './university.model'
import { Department } from './department.model'
import { Media } from './media.model'
import { Board } from './board.model'
import { Package } from './package.model'


export interface User {
    id: number;
    userTypeId: number;
    universityId: number;
    university: University;
    departmentId: number;
    department: Department;
    profileImage: Media;
    backgroundImage: Media;
    name: string;
    username: string;
    email: string;
    gender: string;
    bio: string;
    dob : Date;
    mobileNo: string;
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
    packageInfo: Package;
    isfollow: boolean;
    totalAllocatedSpace: number;
    consumedSpace: number;
    createdAt: number;
    isBlocked: boolean;
    autoRenew: boolean;
}



