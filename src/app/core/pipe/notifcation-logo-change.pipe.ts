import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'notifcationLogoChange'
})
export class NotifcationLogoChangePipe implements PipeTransform {

  transform(value: string, args?: any): any {
    switch(value){
      case 'NewsLikeUserChain':
      case 'NewsLike':
      return '<span class="notificationType bg_pink_light p_t_5"><i class="fas fa-heart f_s_12"></i></span>';
      case 'NewsCommentedUserChain':
      case 'NewsCommentMention':
      case 'NewsCommentThreadUsers':
      case 'NewsCommentOwnerUser':
      return '<span class="notificationType bg_theam_light p_t_5"><i class="fas fa-heart f_s_12"></i></span>';
      case 'BoardCreate':
      case 'JoinBoard':
      case 'JoinBoardRequest':
      case 'NewsPostBoard':
      case 'PrivateBoardAcceptRequest':
      // tslint:disable-next-line:max-line-length
      return '<span class="notificationType bg_voilet_light p_t_5 rotate_45deg"><i class="fas fa-thumbtack f_s_12"></i></span>';
      case 'NewsPost':
      case 'NewsPostBoard':
      case 'NewsPostMention':
      return '';
      case 'FollowUser':
      case 'FollowUserChain':
      return '<span class="notificationType bg_green_light p_t_0"><i class="material-icons f_s_22">&#xE145;</i></i></span>';

  }
  }

}
