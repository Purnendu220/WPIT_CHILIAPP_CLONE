import { environment } from './../../environments/environment';


export class Constants {
  static baseURL = environment.baseURL;
  static WebUrl = environment.hostURL;
  static responseSuccess = '2XX';
  static responseInternalServer = '5XX';
  static userAgent = 'userAgent';
  static usetType = 'user_type';
  static isLoggedInKey = 'isLoggedIn';
  static authToken = 'Myu-Auth-Token';
  static defaultLanguage = 'localeId';
  static userDataKey = 'User';
  static pageSize = 20;
  static appVersion = '3.1.2';
  static newsFeed = 'newsFeed';
  static FileUploadProgress = "progress";
  static siteDirection = environment.language == 'ar'?"rtl":"ltr";


}


export class ObjectMediaType {
  static objectMediaTypeList = {
    7: 'pdf',
    8: 'ppt',
    9: 'doc',
    10: 'docx',
    11: 'xls',
    12: 'xlsx',
    13: 'pptx',
  };
}

export class ObjectMediaTypeList {
  static objectMediaTypesListDocument = ['PDF', 'PPT', 'PPTX', 'DOC', 'DOCX', 'XLS', 'XLSX'];
}

export class NewsType {
  static boardPost = 'boardPost';
  static newsFeed = 'newsFeed';
  static ownPost = 'ownPost';

}


export class MessagesConstants {
  //static myvalue=environment.xyz==3?"arabic value":" english value";
  static 'typeTeacher' = environment.language == 'ar'? "معلم او دكتور":"Teacher or Professor";
  static 'typeStudent' = environment.language == 'ar'? "طالب":"Student";
  static 'typeDepartment' = environment.language == 'ar'?"ادارة او نادي":"Department or Club";
  static 'typeParent' = environment.language == 'ar'? "ولي أمر":"Parent";
  static 'connectionRefused'=environment.language == 'ar'? "لا يوجد اتصال مع الانترنت. حاول مرة اخرى بعد الاتصال بالانترنت":"No internet connection available. Please connect to the internet and try again. ";
  static 'serverError' = environment.language == 'ar'? "يبدو ان هناك خطأ ما. يرجى المحاولة مرة اخرى":"Some error occured. Please try again.";
  static 'internalServerMsg' = environment.language == 'ar'? "هناك خلل ما، يرجى الضغط للمحاولة مرة اخرى": "Something went wrong. Click to try again.";
  static 'imageLimit' = environment.language == 'ar'? "إختر ما لا يزيد عن ٤ صور، أو فيديو لا يزيد عن ٣٠ ثانية ":"You can upload only ";
  static 'images' = environment.language == 'ar'? "صور":" images.";
  //static 'captureBeforeSelect' = environment.language == 'ar'? "arabic..please capture image before":"please capture a image before selecting.";
  static 'imgVideoDocerror' = environment.language == 'ar'? "لا تستطيع إختيار الصور والفيديو في نفس الوقت":"You cannot select photos and videos at the same time.";
  static 'PostPublishSuccess' = environment.language == 'ar'? "تم النشر":"Published.";
  static 'PasswordChangedSuccess' = environment.language == 'ar'? "تم تغيير كلمة السر ":"Password changed successfully.";
  static 'selectReason' = environment.language == 'ar'? "يرجى إختيار السبب":"Please select a reason.";
  static 'unfollowConfirmation' = environment.language == 'ar'? "إلغاء متابعة":"Unfollow";
  static 'chatInProgressAlert' = environment.language == 'ar'? "هذه الصفحة قيد التطوير. بامكانكم استخدام هذه الخاصية من الهاتف.":"This section is under development. You can use this feature from your mobile device.";
  static 'cancelJoinRequest' = environment.language == 'ar' ? "هل تريد إلغاء طلب الانضمام؟" : "Do you want to cancel your join request?";
  static 'unjojnBoard' = environment.language == 'ar' ? "هل ترغب بالغاء الانضمام لهذا البورد؟" : "Leave this board?";
  static 'blockUser'= environment.language == 'ar'? "لن يتمكن هذا المستخدم من العثور على بروفايلك أو مشاهدة بوستاتك. ولن يقوم ماي يو بإعلام  هذا المستخدم  بالحظر.":"They won't be able to find your profile or posts on myU. myU won't let them know you've blocked them.";
  static 'unBlockUser'= environment.language == 'ar'? "هل تريد إلغاء الحظر عن هذا المستخدم؟":"Are you sure you want to unblock this user?";
  static 'notMemberofBoard' = environment.language == 'ar'? "لم تقم بالانضمام لهذا البورد":"You are not a member of this board.";
  static 'someErrorMediaAccess'= environment.language == 'ar'?"هناك خلل ما متعلق بصلاحيات الجهاز. يرجى مراجعة اعدادات الجهاز.":"There is some error with your device permissions. please check your phone settings.";
  static 'NotAllowedError'= environment.language == 'ar'?"الصلاحيات غير متاحة للتطبيق للقيام بهذه المهمة. يرجى تمكين الصلاحيات من اعدادات الجهاز.":"The permission is not enabled for myU to perforom this action. Please enable it through your browser settings.";
  static 'CookiesDisabled'= environment.language == 'ar'?"متصفح الانترنت قام بحجب الكوكيز. يرجى تمكينها ثم المحاولة مرة اخرى.":"Your browser has disabled cookies. Please enable them and try again.";
  static 'following' = environment.language == 'ar'? "متابع":"Following";
  static 'follower' = environment.language == 'ar'? "متابِعون":"Follower";
  static 'joinedBoard' = environment.language == 'ar'? "البوردات":"Joined Board";
  static 'writeMessage' = environment.language == 'ar'? "":"Write a Message...";
  static 'moveToProfile' = environment.language == 'ar'? "هل تريد اعادة هذا البورد الى صفحتك الشخصية؟":"Are you sure you want to move this board to your profile?";
  static 'moveToArchive' = environment.language == 'ar'? "هل تريد أرشفة هذا الصف؟ ":"Are you sure you want to archive this class?";
  static 'moveToProfileTitle' = environment.language == 'ar'? "نقل إلى الصفحة الشخصية ":"Move to profile ";
  static 'moveToArchiveTitle' = environment.language == 'ar'? "نقل إلى الصفحة الشخصية ":"Move to archive ";
  static 'emailSentSuccessfully' = environment.language == 'ar'?"تم ارسال رابط تغيير الباسوورد الى ايميلك. ":"Check your email inbox, and click the link in the email you received to reset your password.";
  static 'fileNotFoundTitle' =environment.language == 'ar'?"لا يوجد ملف":"File not found";
  static 'fileNotFoundMessage1' =environment.language == 'ar'?"لا يمكنك فتح هذا الملف <strong> ":"You cannot open this file because <strong> ";
  static 'fileNotFoundMessage2' =environment.language == 'ar'?"</strong> لأنه قد تم حذفه.":"</strong> has been deleted.";
  static 'pleaseSelectBoard' =environment.language == 'ar'?"Please select a board where you want to post news.":"Please select a board where you want to post news.";
  static 'featureNotSupportedError' =environment.language == 'ar'?"This feature is not supported in this browser.":"This feature is not supported in this browser.";
  static 'blockedUserMessage1' =environment.language == 'ar'?"يجب إلغاء الحظرعن <strong>(user)</strong> أولاً لتتمكن من المتابعة. ":"Unblock <strong>(user)</strong> first, to start following."
  static 'requiredReportReason' =environment.language == 'ar'?"Report reason is required.":" Report reason is required.";
  static 'chatInProgressTitle' = environment.language == 'ar'?"مراسلة":"Chat";
  static 'cancel' = environment.language == 'ar'?"إلغاء الامر":"Cancel";
  static 'block' = environment.language == 'ar'?"حظر ":"Block";
  static 'unblock' = environment.language == 'ar'?"إلغاء الحظر":"Unblock";
  static 'shareUsernameMessage' = environment.language == 'ar'?"قم بإعطاء اسم المستخدم الخاص بك (@username) للطلبة ليتمكنوا من العثور على بروفايلك والانضمام لهذا الصف":"Share your username (@username) with users so they can find your profile and join your class";
  static 'passwordUpdateMessage' = environment.language == 'ar'?"تم تغيير كلمة السر ":"Password changed successfully.";
  static 'profileUpdateMessage' = environment.language == 'ar'?"Profile updated successfully":"Profile updated successfully";
  static 'publicOnPost' = environment.language == 'ar'?"عام":"Public";
  static 'viewUserList' = environment.language == 'ar'?"View User List":"View User List";
  static 'LikeUserList' = environment.language == 'ar'?"Like User List":"Like User List";
  static 'placeholderSave' = environment.language == 'ar'?"حفظ":"Save";
  static 'justNow'= environment.language == 'ar'? "الآن فقط":"just now"
  static 'minutes'= environment.language == 'ar'? "الدقائق":"minutes"
  static 'minute'= environment.language == 'ar'? "اللحظة":"minute"
  static 'hours'= environment.language == 'ar'? "ساعات":"hours"
  static 'hour'= environment.language == 'ar'? "ساعة":"hour"
  static 'days'= environment.language == 'ar'? "أيام":"days"
  static 'day'= environment.language == 'ar'? "يوم":"day"
  static 'yes' = environment.language == 'ar'?"نعم":"Yes";
  static 'no' = environment.language == 'ar'?"لا":"No";
  static 'close' = environment.language == 'ar'?"إغلاق":"Close";
  static 'Department' = environment.language == 'ar'?"القسم":"Department";
  static 'GraduationYear' = environment.language == 'ar'?"سنة التخرج ":"Graduation Year";

}

export class InfiniteScroll {
  static throttle = 300;
  static scrollDistance = 1;
  static scrollUpDistance = 2;
}

// ?idForPage=0&pageDirection=next&rows=20&type=newsFeedNews&userId=58852&
// appVersion=3.1.2&debug=true
export class UrlConstants {
  static baseURLMidl = environment.baseURL + environment.baseURLMidl;
  static baseURLUserService = environment.baseURL + environment.baseURLUserService;
  static baseURLMdeiaService = environment.baseURL + environment.baseURLMediaService;
  static localUrl = 'http://192.168.100.37:8080/' + environment.baseURLMediaService

  // midl urls
  static getAllUniversitiesList = UrlConstants.baseURLMidl.concat('typeahed?');
  static getNewsFeedList = UrlConstants.baseURLMidl.concat('news?');
  static getNewsCommentList = UrlConstants.baseURLMidl.concat('news/comment?');
  static postNewsCommentList = UrlConstants.baseURLMidl.concat('news/comment');
  static newsDelete = UrlConstants.baseURLMidl.concat('news/');
  static newsReport = UrlConstants.baseURLMidl.concat('news/poke');
  static newsCommentDelete = UrlConstants.baseURLMidl.concat('news/comment/');
  static newsLikeUnlike = UrlConstants.baseURLMidl.concat('news/like?');
  static newsLikesUserList = UrlConstants.baseURLMidl.concat('news/like');
  static newsViewsUserList = UrlConstants.baseURLMidl.concat('news/view');
  static hashTagNewsList = UrlConstants.baseURLMidl.concat('news/hashtag');
  static exploreNewsList = UrlConstants.baseURLMidl.concat('news/explore?');
  static board = UrlConstants.baseURLMidl.concat('board');
  static archiveBoard = UrlConstants.baseURLMidl.concat('archive-board');
  static profileBoard = UrlConstants.baseURLMidl.concat('un-archive-board')
  static usernotification = UrlConstants.baseURLMidl.concat('notification');
  static newBoardRequest = UrlConstants.baseURLMidl.concat('board/join/request');
  static departmentListUrl = UrlConstants.baseURLMidl.concat('typeahed?type=department');
  // userservice urls
  static userLoginApi = UrlConstants.baseURLUserService.concat('user/login');
  static userSignupApi = UrlConstants.baseURLUserService.concat('user');
  static userChangePassword = UrlConstants.baseURLUserService.concat('user/changePassword');
  static userForgotPassword = UrlConstants.baseURLUserService.concat('user/forgotPassword');
  static user = UrlConstants.baseURLUserService.concat('user');
  static blockOrUnblockUser = UrlConstants.baseURLUserService.concat('user/block');
  static boardMediaUrl = UrlConstants.baseURLMidl.concat('board/media');
  static searchBoardMediaUrl = UrlConstants.baseURLMidl.concat('search-media-inboards');
  static userBoardListUrl = UrlConstants.baseURLMidl.concat('board');
  static postNewsApiUrl = UrlConstants.baseURLMidl.concat('news');
  static userTaggingUrl = UrlConstants.baseURLMidl.concat('typeahed');
  static userMentionUrl = UrlConstants.baseURLUserService.concat('user/myRelative');

  static mediaUploadApi = UrlConstants.baseURLMdeiaService.concat('media');
  static userLogut = UrlConstants.baseURLUserService.concat('user/logout')
  static existingMediaUploadApi = UrlConstants.baseURLMdeiaService.concat('media/existing');
  static userSearchTypeAHead = UrlConstants.baseURLUserService.concat('user/typeahed?');

  static explorerAPI = UrlConstants.baseURLUserService.concat('user/explore?');

  //mediaservice
  static media = UrlConstants.baseURLMdeiaService.concat('media');

}

export class UrlResponseCodes {
  static getAllUniversitiesCode = 'getUniversityList';
  static loginUserCode = 'login';
  static getUserCode = 'getUser';
  static getUserSearchCode = 'getUserSearch';
  static getFollowerCode = 'getFollowers';
  static getFollowingCode = 'getFollowings';
  static postFollowTogggleCode = 'postFollowToggle';
  static postBlockTogggleCode = 'postBlockToggle';
  static getBlockedUsers = 'blockedUsers';
  static blockOrUnblockUserCode = 'blockOrUnblockUser';

  static signupUserCode = 'signup';
  static boardMediaUrlCode = 'boardmediaurl';
  static MultipleFileUploadApi = 'multiplefileUpload';
  static existingMediaUploadCode = 'existingMediaUploadCode';
  static userBoardListResponseCode = 'userBoardListResponseCode'
  static postNewsResponseCode = 'postNewsResponseCode';
  static publishNewsResponseCode = 'publishNewsResponseCode';
  static userTaggingResponseCode = 'userTaggingResponseCode'
  static userMentionResponseCode = 'userMentionResponseCode'

  static putUserCode = 'putUser';
  static boardPostCode = 'boardPost';
  static boardJoinCode = 'boardJoin';
  static boardUnjoinCode = 'boardUnjoin';
  static boardPutCode = 'boardPut';
  static boardDeleteCode = 'boardDelete';
  static boardArchiveCode = 'boardArchive';
  static boardProfileCode = 'boardProfile';
  static boardMediaTypes = 'boardMediatypes';
  static boardMedia = 'boardMedia';
  static boardMember = 'boardMember';
  static getNewsListCode = 'getNewsList';
  static getNewsCommentListCode = 'getNewsCommentList';
  static postNewsCommentCode = 'postNewsComment';
  static newsCommentDeleteCode = 'newsCommentDelete';
  static newsDeleteCode = 'newsDelete';
  static newsReportCode = 'newsReport';
  static newsLikeUnLikeCode = 'newsLikeUnLike';
  static newsLikesUserListCode = 'newsLikesUserList';
  static newsViewsUserListCode = 'newsViewsUserList';
  static hashTagNewsListCode = 'hashTagNewsList';
  static exploreNewsListCode = 'exploreNewsList';
  static notificationsYouType = 'you';
  static notificationsFollowingType = 'following';
  static getExploreOwnUniversityCode = 'ownUniversity';
  static getExploreOtherUniversityCode = 'otherUniversity';
  static NewBoardRequest = 'newBoardRequest';
  static fileUploadResponse = 'fileuploadFinalResponse';
  static getNewsCode = 'getNews';
  static uploadProfCode = 'uploadProf';
  static uploadBackCode = 'uploadBack';
  static userChangePasswordCode = 'userChangePassword';
  static userForgotPasswordCode = 'userForgotPassword';
  static getJoinedBoardListCode = 'getJoinedBoardList';
  static joinrequestAccept = 'joinrequestAccept';
  static joinrequestReject = 'joinrequestReject';
  static userMediaDelete = 'userMediaDelete'
  static getDepList = 'getDepList'
}
export class UserType {
  static typeIdList = { 1: MessagesConstants.typeTeacher, 2: MessagesConstants.typeStudent, 3: MessagesConstants.typeDepartment, 4: 'Promoter', 5: MessagesConstants.typeParent };
}


