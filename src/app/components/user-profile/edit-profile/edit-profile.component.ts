import { Component, ElementRef, OnInit, ViewChild, Input } from '@angular/core';
import { User } from '../../../core/model/user.model';
import { HttpUserUtilsService } from '../../../httpWrapperModule/http_user_util.service';
import { UrlResponseCodes, UserType, MessagesConstants } from '../../../core/constants';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { StorageService } from '../../../core/storage-service.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ImageCropComponent } from '../../imageCroppingPopup/imageCrop.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UtitlityService } from '../../../core/utils.service';
import { HttpMediaService } from '../../../httpWrapperModule/http_media.service';
import { ChangePasswordRequestDto } from '../../../core/model/changepassword-request-dto.model';
import { ShareDataSubscriptionService } from '../../common/sharedata-subscription.service';
import { ValidationService } from '../../common/validation-message-component/validation-service.service';
import { BaseComponentComponent } from '../../base-component/base-component.component';
declare var $: any;

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent extends BaseComponentComponent implements OnInit {


  @ViewChild('fileInput') fileInput: ElementRef;
  @ViewChild('coverInput') coverInput: ElementRef;
  @Input() model;

  editProfileForm: FormGroup;
  public changePasswordForm: FormGroup;
  errorMessage: string;
  successMessage: string;
  userData: User;
  userId: number;
  private changePasswordRequestDto: ChangePasswordRequestDto;
  graduationYearFakeArray: number[];
  graduationYearStart = (new Date()).getFullYear() + 15;
  bioModel: string = '';
  uploadProfileProgess: boolean = false;
  uploadBackgroundProgess: boolean = false;
  currentPass = "password";
  newPass = "password";
  confirmPass = "password";
  userNamePattern = '^[A-Za-z][a-zA-Z0-9_]*$';
  // phoneNumberPattern='^[+0-9][0-9]*$';
  public showDisabledButton: boolean = false;
  placeholderSave = MessagesConstants.placeholderSave;

  selectedDepartment: any[] = [];
  departmentList: any[] = [];
  graduationYearList: any[] = [];
  selectedGraduationYear: any = [];

  configDepartment = { displayKey: 'name' ,
    search: true,
    height: 'auto',
    placeholder : MessagesConstants.Department
  }
  configGraduationYear = {
    search: true,
    height: 'auto',
    placeholder : MessagesConstants.GraduationYear
  }


  constructor(private activatedRoute: ActivatedRoute, private userService: HttpUserUtilsService,
    private mediaservice: HttpMediaService, private formbuilder: FormBuilder, private router: Router, private modalService: NgbModal,
    private sharedDataSubsriptionService: ShareDataSubscriptionService) {
    super();
  }
  ngAfterViewInit() {
  }
  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      let queryParam = params['query'];
      if (queryParam == 'changePassword') {
        $('.nav-tabs a[href="#' + 'password' + '"]').tab('show');
      } else {
        $('.nav-tabs a[href="#' + 'info' + '"]').tab('show');
      }
    });
    for (let i = 0; i < 75; i++) {
      this.graduationYearList[i] = (this.graduationYearStart - i).toString();
    }
    this.userId = StorageService.getUserId();
    this.userService.getUserData(this.userId, this, true);
    this.initForm(this.userData);
    this.graduationYearFakeArray = new Array(75);
    this.fileInput.nativeElement.onclick = () => {
      this.fileInput.nativeElement.value = '';
    };
    this.coverInput.nativeElement.onclick = () => {
      this.coverInput.nativeElement.value = '';
    };
    this.userService.getDepartments("", this, false);
  }

  initForm(userData: User) {
    this.editProfileForm = this.formbuilder.group({
      'name': [userData ? userData.name : '', Validators.required],
      'username': [userData ? '@' + userData.username : '', [Validators.required, Validators.maxLength(120), ValidationService.userPattern]],
      'bio': [userData ? userData.bio : '', [Validators.maxLength(150)]],
      'email': [userData ? userData.email : '', [Validators.required, Validators.maxLength(120), Validators.email]],
      'mobileNumber': [userData ? userData.mobileNo : '', [Validators.maxLength(16), ValidationService.numberPattern]],
      'gender': [userData ? userData.gender : ''],
      'dob': [userData ? userData.dob : '0000000000'],
      'graduationYear': [userData ? userData.graduationYear : ''],
      'universityName': [userData ? userData.university.name : '']
    });
    this.changePasswordForm = this.formbuilder.group({
      'password': ['', Validators.required],
      'newPassword': ['', Validators.required],
      'confirmPassword': ['', Validators.required],
    });
  }

  //uploadprofile pic start

  afterFileChageToUpload(files, picFor) {

    const modalRef = UtitlityService.openModal(this.modalService, ImageCropComponent, ' cropperMaster ');
    modalRef.componentInstance.fileToUpload = files[0];

    modalRef.componentInstance.cropperSettings.keepAspect = true;
    modalRef.componentInstance.cropperSettings.minHeight = (picFor == 'profile') ? 250 : 300;
    modalRef.componentInstance.cropperSettings.minWidth = (picFor == 'profile') ? 250 : 800;
    modalRef.componentInstance.cropperSettings.canvasHeight = (picFor == 'profile') ? 500 : 550;
    ;
    modalRef.componentInstance.cropperSettings.canvasWidth = (picFor == 'profile') ? 800 : 1100;
    modalRef.componentInstance.cropperSettings.width = (picFor == 'profile') ? 250 : 300;
    modalRef.componentInstance.cropperSettings.height = (picFor == 'profile') ? 250 : 800;
    modalRef.componentInstance.cropperSettings.croppedHeight = (picFor == 'profile') ? 250 : 300;
    modalRef.componentInstance.cropperSettings.croppedWidth = (picFor == 'profile') ? 250 : 800;

    modalRef.componentInstance.notifyParent.subscribe(($e) => {

      if (picFor == 'profile') {
        this.uploadProfileProgess = true;
      } else {
        this.uploadBackgroundProgess = true;
      }

      let mediaDto = {
        mediaName: Date.now().toString().concat((files[0].type == 'image/png') ? '.png' : '.jpg'),
        objectType: 'user',
        mediaFor: (picFor == 'profile') ? 'UserProfile' : 'UserBackground',
        mediaType: 'Image',
        objectDataId: StorageService.getUserId(),
        media: $e
      };
      this.mediaservice.uploadUserImg(mediaDto, this, false);
    })
  }
  //end upload profile pic


  //edit Profile Form Group Validation Function Start
  private markFormGroupTouched(formGroup: FormGroup) {
    try {
      (<any>Object).values(formGroup.controls).forEach(control => {
        control.markAsTouched();
        if (control.controls) {
          control.controls.forEach(c => this.markFormGroupTouched(c));
        }
      });
    }
    catch (ex) {
      // Code to handle exception
    }
  }
  // edit Profile Form Group Validation Function End

  updateProfile() {
    var re = new RegExp(this.userNamePattern);
    if (!re.test(this.editProfileForm.value.username) && this.editProfileForm.value.username.indexOf('@') == 0) {
      this.editProfileForm.controls['username'].setValue(this.editProfileForm.value.username.substring(1, this.editProfileForm.value.username.length));

    }
    if (this.editProfileForm.valid) {
      this.userData.name = this.editProfileForm.value.name.trim();
      this.userData.username = this.editProfileForm.value.username.trim();
      this.userData.bio = this.editProfileForm.value.bio;
      this.userData.email = this.editProfileForm.value.email.trim();
      this.userData.mobileNo = this.editProfileForm.value.mobileNumber ? this.editProfileForm.value.mobileNumber.trim() :'' ;
      this.userData.gender = this.editProfileForm.value.gender == 'null' ? null : this.editProfileForm.value.gender;
      this.userData.dob = this.editProfileForm.value.dob;
      this.userData.graduationYear = this.editProfileForm.value.graduationYear;
      this.userData.departmentId = null;
      this.userData.graduationYear = (this.selectedGraduationYear.length) ? this.selectedGraduationYear[0] : null;
      if (this.selectedDepartment && this.selectedDepartment.length > 0) {
        this.userData.departmentId = this.selectedDepartment[0].id;
      }
      this.userService.putUserData(this.userData, this, true);
      this.showDisabledButton = true;
    }
    else {
      this.markFormGroupTouched(this.editProfileForm)
    }
  }

  gettinguserdob(event) {
    this.editProfileForm.controls['dob'].setValue(event);

  }

  onSuccess(type: any, responsedata: any) {
    console.log(responsedata);
    switch (type) {
      case UrlResponseCodes.getUserCode:
        StorageService.setUser(responsedata);

        this.userData = responsedata;

        this.selectedDepartment = ((this.userData.department != undefined)) ? [this.userData.department] : [];
        this.selectedGraduationYear = (this.userData.graduationYear) ? [this.userData.graduationYear.toString()] : -1;
        if (this.userData.bio) {
          this.bioModel = this.userData.bio;
        }
        this.initForm(responsedata);

        this.sharedDataSubsriptionService.refreshUserData(StorageService.getUser());

        break;
      case UrlResponseCodes.putUserCode:
        this.showDisabledButton = false;
        StorageService.setUser(responsedata);
        this.showAlertMessage("success", "", MessagesConstants.profileUpdateMessage, 4000);
        setTimeout(() => {
          UtitlityService.redirectUser(this.router, 'user', this.userData.id);
        }, 1000);
        this.sharedDataSubsriptionService.refreshUserData(StorageService.getUser());
        break;
      case UrlResponseCodes.uploadProfCode:
        this.userData.profileImage = responsedata.data;
        this.uploadProfileProgess = false;
        this.userService.getUserData(this.userId, this, true);

        break;
      case UrlResponseCodes.uploadBackCode:
        this.userData.backgroundImage = responsedata.data;
        this.uploadBackgroundProgess = false;
        this.userService.getUserData(this.userId, this, true);

        break;

      case UrlResponseCodes.userChangePasswordCode:
        this.showAlertMessage("Success", "", MessagesConstants.PasswordChangedSuccess, 2000);
        setTimeout(() => {
          UtitlityService.redirectUser(this.router, 'user', this.userData.id)
        }, 1000);
        break;

      case UrlResponseCodes.userMediaDelete:
        if (responsedata == 'back') {
          this.uploadBackgroundProgess = false;
        }
        if (responsedata == 'prof') {
          this.uploadProfileProgess = false;
        }
        this.userService.getUserData(this.userId, this, true);
        break;
      case UrlResponseCodes.getDepList:
        this.departmentList = responsedata;
        break;

    }
  }

  onFailure(type: any, response: string) {
    switch (type) {
      case UrlResponseCodes.loginUserCode:
        this.errorMessage = response;
        break;
      case UrlResponseCodes.putUserCode:
        this.showDisabledButton = false;
        this.errorMessage = response;
        break;
      case UrlResponseCodes.uploadProfCode:
        this.uploadProfileProgess = false;
        break;
      case UrlResponseCodes.uploadBackCode:
        this.uploadBackgroundProgess = false;
        break;
      case UrlResponseCodes.userChangePasswordCode:
        break;
      case UrlResponseCodes.userMediaDelete:
        this.uploadProfileProgess = false;
        this.uploadBackgroundProgess = false;

        break;
    }
  }

  changePassword() {
    this.markFormGroupTouched(this.changePasswordForm);
    if (this.changePasswordForm.valid) {
      this.changePasswordRequestDto = new ChangePasswordRequestDto();
      this.changePasswordRequestDto.userId = StorageService.getUserId();
      this.changePasswordRequestDto.password = this.changePasswordForm.value.password;
      this.changePasswordRequestDto.newPassword = this.changePasswordForm.value.newPassword;
      this.changePasswordRequestDto.confirmPassword = this.changePasswordForm.value.confirmPassword;
      this.userService.changePassword(this.changePasswordRequestDto, this, false);
    }
  }
  showHidePassword(type) {
    if (type === 'pass') {
      this.currentPass = this.currentPass === "password" ? "text" : "password";
    }
    if (type === 'newpass') {
      this.newPass = this.newPass === "password" ? "text" : "password";
    }
    if (type === 'confirmpass') {
      this.confirmPass = this.confirmPass === "password" ? "text" : "password";
    }
  }
  deleteMedia(id, type) {
    if (type == 'prof') {
      this.uploadProfileProgess = true;
    } else {
      this.uploadBackgroundProgess = true;
    }
    this.mediaservice.deleteUserMedia(id, this, false, type);
  }
  showAlertMessage(type, status, message, erroTime?: any) {
    this.sharedDataSubsriptionService.show(type, status, message, erroTime);
  }
}
