import { UserBasic } from './user-basic.model';

export interface Board {
    id: number;
    userId: number;
    userBasicInfo: UserBasic;
    name: string;
    joinBoardCount: number;
    newsPostCount: number;
    isJoined: number;
    isPrivate: boolean;
    isArchived: boolean;
    createdAt: any;
    modifiedAt: any;
}