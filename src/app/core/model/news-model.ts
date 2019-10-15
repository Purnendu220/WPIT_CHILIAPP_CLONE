import {Board} from '../../httpWrapperModule/responseModels/userProfileResponse';
import {UserBasic} from './user-basic.model';
import {Media} from './media.model';

export interface News {
  id: number;
  virtualNewsId: number;
  newsText: string;
  masterPostTypeId: number;
  board: Board;
  user: UserBasic;
  media: Media[];
  viewCount: number;
  likeCount: number;
  commentCount: number;
  isLiked: boolean;
  isCommented: boolean;
  isViewed: boolean;
  modifiedAt: number;
  createdAt: number;
}


