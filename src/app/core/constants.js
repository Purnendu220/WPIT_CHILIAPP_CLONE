"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var environment_1 = require("./../../environments/environment");
var Constants = /** @class */ (function () {
    function Constants() {
    }
    Constants.baseURL = environment_1.environment.baseURL;
    Constants.WebUrl = environment_1.environment.hostURL;
    Constants.responseSuccess = '2XX';
    Constants.responseInternalServer = '5XX';
    Constants.userAgent = 'userAgent';
    Constants.usetType = 'user_type';
    Constants.isLoggedInKey = 'isLoggedIn';
    Constants.authToken = 'Myu-Auth-Token';
    Constants.defaultLanguage = 'localeId';
    Constants.userDataKey = 'User';
    Constants.pageSize = 20;
    Constants.appVersion = '3.1.2';
    Constants.newsFeed = 'newsFeed';
    Constants.FileUploadProgress = "progress";
    Constants.siteDirection = environment_1.environment.language == 'ar' ? "rtl" : "ltr";
    return Constants;
}());
exports.Constants = Constants;
var ObjectMediaType = /** @class */ (function () {
    function ObjectMediaType() {
    }
    ObjectMediaType.objectMediaTypeList = {
        7: 'pdf',
        8: 'ppt',
        9: 'doc',
        10: 'docx',
        11: 'xls',
        12: 'xlsx',
        13: 'pptx',
    };
    return ObjectMediaType;
}());
exports.ObjectMediaType = ObjectMediaType;
var ObjectMediaTypeList = /** @class */ (function () {
    function ObjectMediaTypeList() {
    }
    ObjectMediaTypeList.objectMediaTypesListDocument = ['PDF', 'PPT', 'PPTX', 'DOC', 'DOCX', 'XLS', 'XLSX'];
    return ObjectMediaTypeList;
}());
exports.ObjectMediaTypeList = ObjectMediaTypeList;
var NewsType = /** @class */ (function () {
    function NewsType() {
    }
    NewsType.boardPost = 'boardPost';
    NewsType.newsFeed = 'newsFeed';
    NewsType.ownPost = 'ownPost';
    return NewsType;
}());
exports.NewsType = NewsType;
var MessagesConstants = /** @class */ (function () {
    function MessagesConstants() {
    }
    //static myvalue=environment.xyz==3?"arabic value":" english value";
    MessagesConstants['typeTeacher'] = environment_1.environment.language == 'ar' ? "معلم او دكتور" : "Teacher or Professor";
    MessagesConstants['typeStudent'] = environment_1.environment.language == 'ar' ? "طالب" : "Student";
    MessagesConstants['typeDepartment'] = environment_1.environment.language == 'ar' ? "ادارة او نادي" : "Department or Club";
    MessagesConstants['typeParent'] = environment_1.environment.language == 'ar' ? "ولي أمر" : "Parent";
    MessagesConstants['connectionRefused'] = environment_1.environment.language == 'ar' ? "لا يوجد اتصال مع الانترنت. حاول مرة اخرى بعد الاتصال بالانترنت" : "No internet connection available. Please connect to the internet and try again. ";
    MessagesConstants['serverError'] = environment_1.environment.language == 'ar' ? "يبدو ان هناك خطأ ما. يرجى المحاولة مرة اخرى" : "Some error occured. Please try again.";
    MessagesConstants['internalServerMsg'] = environment_1.environment.language == 'ar' ? "هناك خلل ما، يرجى الضغط للمحاولة مرة اخرى" : "Something went wrong. Click to try again.";
    MessagesConstants['imageLimit'] = environment_1.environment.language == 'ar' ? "إختر ما لا يزيد عن ٤ صور، أو فيديو لا يزيد عن ٣٠ ثانية " : "You can upload only ";
    MessagesConstants['images'] = environment_1.environment.language == 'ar' ? "صور" : " images.";
    //static 'captureBeforeSelect' = environment.language == 'ar'? "arabic..please capture image before":"please capture a image before selecting.";
    MessagesConstants['imgVideoDocerror'] = environment_1.environment.language == 'ar' ? "لا تستطيع إختيار الصور والفيديو في نفس الوقت" : "You cannot select photos and videos at the same time.";
    MessagesConstants['PostPublishSuccess'] = environment_1.environment.language == 'ar' ? "تم النشر" : "Published.";
    MessagesConstants['PasswordChangedSuccess'] = environment_1.environment.language == 'ar' ? "تم تغيير كلمة السر " : "Password changed successfully.";
    MessagesConstants['selectReason'] = environment_1.environment.language == 'ar' ? "يرجى إختيار السبب" : "Please select a reason.";
    MessagesConstants['unfollowConfirmation'] = environment_1.environment.language == 'ar' ? "إلغاء متابعة" : "Unfollow";
    MessagesConstants['chatInProgressAlert'] = environment_1.environment.language == 'ar' ? "هذه الصفحة قيد التطوير. بامكانكم استخدام هذه الخاصية من الهاتف." : "This section is under development. You can use this feature from your mobile device.";
    MessagesConstants['cancelJoinRequest'] = environment_1.environment.language == 'ar' ? "هل تريد إلغاء طلب الانضمام؟" : "Do you want to cancel your join request?";
    MessagesConstants['unjojnBoard'] = environment_1.environment.language == 'ar' ? "هل ترغب بالغاء الانضمام لهذا البورد؟" : "Leave this board?";
    MessagesConstants['blockUser'] = environment_1.environment.language == 'ar' ? "لن يتمكن هذا المستخدم من العثور على بروفايلك أو مشاهدة بوستاتك. ولن يقوم ماي يو بإعلام  هذا المستخدم  بالحظر." : "They won't be able to find your profile or posts on myU. myU won't let them know you've blocked them.";
    MessagesConstants['unBlockUser'] = environment_1.environment.language == 'ar' ? "هل تريد إلغاء الحظر عن هذا المستخدم؟" : "Are you sure you want to unblock this user?";
    MessagesConstants['notMemberofBoard'] = environment_1.environment.language == 'ar' ? "لم تقم بالانضمام لهذا البورد" : "You are not a member of this board.";
    MessagesConstants['someErrorMediaAccess'] = environment_1.environment.language == 'ar' ? "هناك خلل ما متعلق بصلاحيات الجهاز. يرجى مراجعة اعدادات الجهاز." : "There is some error with your device permissions. please check your phone settings.";
    MessagesConstants['NotAllowedError'] = environment_1.environment.language == 'ar' ? "الصلاحيات غير متاحة للتطبيق للقيام بهذه المهمة. يرجى تمكين الصلاحيات من اعدادات الجهاز." : "The permission is not enabled for myU to perforom this action. Please enable it through your browser settings.";
    MessagesConstants['CookiesDisabled'] = environment_1.environment.language == 'ar' ? "متصفح الانترنت قام بحجب الكوكيز. يرجى تمكينها ثم المحاولة مرة اخرى." : "Your browser has disabled cookies. Please enable them and try again.";
    MessagesConstants['following'] = environment_1.environment.language == 'ar' ? "متابع" : "Following";
    MessagesConstants['follower'] = environment_1.environment.language == 'ar' ? "متابِعون" : "Follower";
    MessagesConstants['joinedBoard'] = environment_1.environment.language == 'ar' ? "البوردات" : "Joined Board";
    MessagesConstants['writeMessage'] = environment_1.environment.language == 'ar' ? "" : "Write a Message...";
    MessagesConstants['moveToProfile'] = environment_1.environment.language == 'ar' ? "هل تريد اعادة هذا البورد الى صفحتك الشخصية؟" : "Are you sure you want to move this board to your profile?";
    MessagesConstants['moveToArchive'] = environment_1.environment.language == 'ar' ? "هل تريد أرشفة هذا الصف؟ " : "Are you sure you want to archive this class?";
    MessagesConstants['moveToProfileTitle'] = environment_1.environment.language == 'ar' ? "نقل إلى الصفحة الشخصية " : "Move to profile ";
    MessagesConstants['moveToArchiveTitle'] = environment_1.environment.language == 'ar' ? "نقل إلى الصفحة الشخصية " : "Move to archive ";
    MessagesConstants['emailSentSuccessfully'] = environment_1.environment.language == 'ar' ? "تم ارسال رابط تغيير الباسوورد الى ايميلك. " : "Check your email inbox, and click the link in the email you received to reset your password.";
    MessagesConstants['fileNotFoundTitle'] = environment_1.environment.language == 'ar' ? "لا يوجد ملف" : "File not found";
    MessagesConstants['fileNotFoundMessage1'] = environment_1.environment.language == 'ar' ? "لا يمكنك فتح هذا الملف <strong> " : "You cannot open this file because <strong> ";
    MessagesConstants['fileNotFoundMessage2'] = environment_1.environment.language == 'ar' ? "</strong> لأنه قد تم حذفه." : "</strong> has been deleted.";
    MessagesConstants['pleaseSelectBoard'] = environment_1.environment.language == 'ar' ? "Please select a board where you want to post news." : "Please select a board where you want to post news.";
    MessagesConstants['featureNotSupportedError'] = environment_1.environment.language == 'ar' ? "This feature is not supported in this browser." : "This feature is not supported in this browser.";
    MessagesConstants['blockedUserMessage1'] = environment_1.environment.language == 'ar' ? "يجب إلغاء الحظرعن <strong>(user)</strong> أولاً لتتمكن من المتابعة. " : "Unblock <strong>(user)</strong> first, to start following.";
    MessagesConstants['requiredReportReason'] = environment_1.environment.language == 'ar' ? "Report reason is required." : " Report reason is required.";
    MessagesConstants['chatInProgressTitle'] = environment_1.environment.language == 'ar' ? "مراسلة" : "Chat";
    MessagesConstants['cancel'] = environment_1.environment.language == 'ar' ? "إلغاء الامر" : "Cancel";
    MessagesConstants['block'] = environment_1.environment.language == 'ar' ? "حظر " : "Block";
    MessagesConstants['unblock'] = environment_1.environment.language == 'ar' ? "إلغاء الحظر" : "Unblock";
    MessagesConstants['shareUsernameMessage'] = environment_1.environment.language == 'ar' ? "قم بإعطاء اسم المستخدم الخاص بك (@username) للطلبة ليتمكنوا من العثور على بروفايلك والانضمام لهذا الصف" : "Share your username (@username) with users so they can find your profile and join your class";
    MessagesConstants['passwordUpdateMessage'] = environment_1.environment.language == 'ar' ? "تم تغيير كلمة السر " : "Password changed successfully.";
    MessagesConstants['profileUpdateMessage'] = environment_1.environment.language == 'ar' ? "Profile updated successfully" : "Profile updated successfully";
    MessagesConstants['publicOnPost'] = environment_1.environment.language == 'ar' ? "عام" : "Public";
    MessagesConstants['viewUserList'] = environment_1.environment.language == 'ar' ? "View User List" : "View User List";
    MessagesConstants['LikeUserList'] = environment_1.environment.language == 'ar' ? "Like User List" : "Like User List";
    MessagesConstants['placeholderSave'] = environment_1.environment.language == 'ar' ? "حفظ" : "Save";
    MessagesConstants['justNow'] = environment_1.environment.language == 'ar' ? "الآن فقط" : "just now";
    MessagesConstants['minutes'] = environment_1.environment.language == 'ar' ? "الدقائق" : "minutes";
    MessagesConstants['minute'] = environment_1.environment.language == 'ar' ? "اللحظة" : "minute";
    MessagesConstants['hours'] = environment_1.environment.language == 'ar' ? "ساعات" : "hours";
    MessagesConstants['hour'] = environment_1.environment.language == 'ar' ? "ساعة" : "hour";
    MessagesConstants['days'] = environment_1.environment.language == 'ar' ? "أيام" : "days";
    MessagesConstants['day'] = environment_1.environment.language == 'ar' ? "يوم" : "day";
    MessagesConstants['yes'] = environment_1.environment.language == 'ar' ? "نعم" : "Yes";
    MessagesConstants['no'] = environment_1.environment.language == 'ar' ? "لا" : "No";
    MessagesConstants['close'] = environment_1.environment.language == 'ar' ? "إغلاق" : "Close";
    MessagesConstants['Department'] = environment_1.environment.language == 'ar' ? "القسم" : "Department";
    MessagesConstants['GraduationYear'] = environment_1.environment.language == 'ar' ? "سنة التخرج " : "Graduation Year";
    return MessagesConstants;
}());
exports.MessagesConstants = MessagesConstants;
var InfiniteScroll = /** @class */ (function () {
    function InfiniteScroll() {
    }
    InfiniteScroll.throttle = 300;
    InfiniteScroll.scrollDistance = 1;
    InfiniteScroll.scrollUpDistance = 2;
    return InfiniteScroll;
}());
exports.InfiniteScroll = InfiniteScroll;
// ?idForPage=0&pageDirection=next&rows=20&type=newsFeedNews&userId=58852&
// appVersion=3.1.2&debug=true
var UrlConstants = /** @class */ (function () {
    function UrlConstants() {
    }
    UrlConstants.baseURLMidl = environment_1.environment.baseURL + environment_1.environment.baseURLMidl;
    UrlConstants.baseURLUserService = environment_1.environment.baseURL + environment_1.environment.baseURLUserService;
    UrlConstants.baseURLMdeiaService = environment_1.environment.baseURL + environment_1.environment.baseURLMediaService;
    UrlConstants.localUrl = 'http://192.168.100.37:8080/' + environment_1.environment.baseURLMediaService;
    // midl urls
    UrlConstants.getAllUniversitiesList = UrlConstants.baseURLMidl.concat('typeahed?');
    UrlConstants.getNewsFeedList = UrlConstants.baseURLMidl.concat('news?');
    UrlConstants.getNewsCommentList = UrlConstants.baseURLMidl.concat('news/comment?');
    UrlConstants.postNewsCommentList = UrlConstants.baseURLMidl.concat('news/comment');
    UrlConstants.newsDelete = UrlConstants.baseURLMidl.concat('news/');
    UrlConstants.newsReport = UrlConstants.baseURLMidl.concat('news/poke');
    UrlConstants.newsCommentDelete = UrlConstants.baseURLMidl.concat('news/comment/');
    UrlConstants.newsLikeUnlike = UrlConstants.baseURLMidl.concat('news/like?');
    UrlConstants.newsLikesUserList = UrlConstants.baseURLMidl.concat('news/like');
    UrlConstants.newsViewsUserList = UrlConstants.baseURLMidl.concat('news/view');
    UrlConstants.hashTagNewsList = UrlConstants.baseURLMidl.concat('news/hashtag');
    UrlConstants.exploreNewsList = UrlConstants.baseURLMidl.concat('news/explore?');
    UrlConstants.board = UrlConstants.baseURLMidl.concat('board');
    UrlConstants.archiveBoard = UrlConstants.baseURLMidl.concat('archive-board');
    UrlConstants.profileBoard = UrlConstants.baseURLMidl.concat('un-archive-board');
    UrlConstants.usernotification = UrlConstants.baseURLMidl.concat('notification');
    UrlConstants.newBoardRequest = UrlConstants.baseURLMidl.concat('board/join/request');
    UrlConstants.departmentListUrl = UrlConstants.baseURLMidl.concat('typeahed?type=department');
    // userservice urls
    UrlConstants.userLoginApi = UrlConstants.baseURLUserService.concat('user/login');
    UrlConstants.userSignupApi = UrlConstants.baseURLUserService.concat('user');
    UrlConstants.userChangePassword = UrlConstants.baseURLUserService.concat('user/changePassword');
    UrlConstants.userForgotPassword = UrlConstants.baseURLUserService.concat('user/forgotPassword');
    UrlConstants.user = UrlConstants.baseURLUserService.concat('user');
    UrlConstants.blockOrUnblockUser = UrlConstants.baseURLUserService.concat('user/block');
    UrlConstants.boardMediaUrl = UrlConstants.baseURLMidl.concat('board/media');
    UrlConstants.searchBoardMediaUrl = UrlConstants.baseURLMidl.concat('search-media-inboards');
    UrlConstants.userBoardListUrl = UrlConstants.baseURLMidl.concat('board');
    UrlConstants.postNewsApiUrl = UrlConstants.baseURLMidl.concat('news');
    UrlConstants.userTaggingUrl = UrlConstants.baseURLMidl.concat('typeahed');
    UrlConstants.userMentionUrl = UrlConstants.baseURLUserService.concat('user/myRelative');
    UrlConstants.mediaUploadApi = UrlConstants.baseURLMdeiaService.concat('media');
    UrlConstants.userLogut = UrlConstants.baseURLUserService.concat('user/logout');
    UrlConstants.existingMediaUploadApi = UrlConstants.baseURLMdeiaService.concat('media/existing');
    UrlConstants.userSearchTypeAHead = UrlConstants.baseURLUserService.concat('user/typeahed?');
    UrlConstants.explorerAPI = UrlConstants.baseURLUserService.concat('user/explore?');
    //mediaservice
    UrlConstants.media = UrlConstants.baseURLMdeiaService.concat('media');
    return UrlConstants;
}());
exports.UrlConstants = UrlConstants;
var UrlResponseCodes = /** @class */ (function () {
    function UrlResponseCodes() {
    }
    UrlResponseCodes.getAllUniversitiesCode = 'getUniversityList';
    UrlResponseCodes.loginUserCode = 'login';
    UrlResponseCodes.getUserCode = 'getUser';
    UrlResponseCodes.getUserSearchCode = 'getUserSearch';
    UrlResponseCodes.getFollowerCode = 'getFollowers';
    UrlResponseCodes.getFollowingCode = 'getFollowings';
    UrlResponseCodes.postFollowTogggleCode = 'postFollowToggle';
    UrlResponseCodes.postBlockTogggleCode = 'postBlockToggle';
    UrlResponseCodes.getBlockedUsers = 'blockedUsers';
    UrlResponseCodes.blockOrUnblockUserCode = 'blockOrUnblockUser';
    UrlResponseCodes.signupUserCode = 'signup';
    UrlResponseCodes.boardMediaUrlCode = 'boardmediaurl';
    UrlResponseCodes.MultipleFileUploadApi = 'multiplefileUpload';
    UrlResponseCodes.existingMediaUploadCode = 'existingMediaUploadCode';
    UrlResponseCodes.userBoardListResponseCode = 'userBoardListResponseCode';
    UrlResponseCodes.postNewsResponseCode = 'postNewsResponseCode';
    UrlResponseCodes.publishNewsResponseCode = 'publishNewsResponseCode';
    UrlResponseCodes.userTaggingResponseCode = 'userTaggingResponseCode';
    UrlResponseCodes.userMentionResponseCode = 'userMentionResponseCode';
    UrlResponseCodes.putUserCode = 'putUser';
    UrlResponseCodes.boardPostCode = 'boardPost';
    UrlResponseCodes.boardJoinCode = 'boardJoin';
    UrlResponseCodes.boardUnjoinCode = 'boardUnjoin';
    UrlResponseCodes.boardPutCode = 'boardPut';
    UrlResponseCodes.boardDeleteCode = 'boardDelete';
    UrlResponseCodes.boardArchiveCode = 'boardArchive';
    UrlResponseCodes.boardProfileCode = 'boardProfile';
    UrlResponseCodes.boardMediaTypes = 'boardMediatypes';
    UrlResponseCodes.boardMedia = 'boardMedia';
    UrlResponseCodes.boardMember = 'boardMember';
    UrlResponseCodes.getNewsListCode = 'getNewsList';
    UrlResponseCodes.getNewsCommentListCode = 'getNewsCommentList';
    UrlResponseCodes.postNewsCommentCode = 'postNewsComment';
    UrlResponseCodes.newsCommentDeleteCode = 'newsCommentDelete';
    UrlResponseCodes.newsDeleteCode = 'newsDelete';
    UrlResponseCodes.newsReportCode = 'newsReport';
    UrlResponseCodes.newsLikeUnLikeCode = 'newsLikeUnLike';
    UrlResponseCodes.newsLikesUserListCode = 'newsLikesUserList';
    UrlResponseCodes.newsViewsUserListCode = 'newsViewsUserList';
    UrlResponseCodes.hashTagNewsListCode = 'hashTagNewsList';
    UrlResponseCodes.exploreNewsListCode = 'exploreNewsList';
    UrlResponseCodes.notificationsYouType = 'you';
    UrlResponseCodes.notificationsFollowingType = 'following';
    UrlResponseCodes.getExploreOwnUniversityCode = 'ownUniversity';
    UrlResponseCodes.getExploreOtherUniversityCode = 'otherUniversity';
    UrlResponseCodes.NewBoardRequest = 'newBoardRequest';
    UrlResponseCodes.fileUploadResponse = 'fileuploadFinalResponse';
    UrlResponseCodes.getNewsCode = 'getNews';
    UrlResponseCodes.uploadProfCode = 'uploadProf';
    UrlResponseCodes.uploadBackCode = 'uploadBack';
    UrlResponseCodes.userChangePasswordCode = 'userChangePassword';
    UrlResponseCodes.userForgotPasswordCode = 'userForgotPassword';
    UrlResponseCodes.getJoinedBoardListCode = 'getJoinedBoardList';
    UrlResponseCodes.joinrequestAccept = 'joinrequestAccept';
    UrlResponseCodes.joinrequestReject = 'joinrequestReject';
    UrlResponseCodes.userMediaDelete = 'userMediaDelete';
    UrlResponseCodes.getDepList = 'getDepList';
    return UrlResponseCodes;
}());
exports.UrlResponseCodes = UrlResponseCodes;
var UserType = /** @class */ (function () {
    function UserType() {
    }
    UserType.typeIdList = { 1: MessagesConstants.typeTeacher, 2: MessagesConstants.typeStudent, 3: MessagesConstants.typeDepartment, 4: 'Promoter', 5: MessagesConstants.typeParent };
    return UserType;
}());
exports.UserType = UserType;
