import { UserBasic } from './user-basic.model';
import {Media} from './media.model';

export interface Comment {
    id: number;
    virtualNewsId: number;
    newsCommentText: string;
    image: Media;
    user: UserBasic;
    createdAt: any;

}
