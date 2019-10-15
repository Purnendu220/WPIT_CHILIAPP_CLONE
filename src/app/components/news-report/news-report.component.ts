import { ShareDataSubscriptionService } from './../common/sharedata-subscription.service';
import {Component, OnInit} from '@angular/core';
import {HttpMidlUtilService} from '../../httpWrapperModule/http_midl_util.service';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NewsReportRequest} from '../../core/model/newsreportrequest.model';
import {UrlResponseCodes, MessagesConstants} from '../../core/constants';
import {StorageService} from '../../core/storage-service.service';
import {AppLogger} from "../../core/logger";
import { BaseComponentComponent } from '../base-component/base-component.component';

@Component({
  selector: 'app-news-report',
  templateUrl: './news-report.component.html',
  styleUrls: ['./news-report.component.scss']
})
export class NewsReportComponent extends BaseComponentComponent implements OnInit {
  public isTextBoxOpen: boolean = false;
  public virtualNewsId: number;
  public reportForm: FormGroup;
  public reportType:number;

  constructor(private modalService: NgbModal,
              public activeModal: NgbActiveModal,
              private formbuilder: FormBuilder,
              private  httpMidlUtilService: HttpMidlUtilService,private shareDataSubscriptionService:ShareDataSubscriptionService) {
    super();
  }


  ngOnInit() {
    this.reportForm = this.formbuilder.group({
      'masterPokeId': ['', Validators.required],
      'otherPoke': ['', Validators.required]
    });

  }

  onSuccess(type: any, responseData: any) {
    switch (type) {
      case UrlResponseCodes.newsReportCode:
        this.activeModal.close('Close Model');


    }

  }

  onFailure(type: any, response: string) {
    AppLogger.log('news-report', response);
  }


  otherClick(value: number) {
    this.reportType=value;
    if (value === 4) {
      this.isTextBoxOpen = true;
    }
  }

  reportSubmit() {
    if (!this.reportForm.value.masterPokeId) {
      this.showAlertMessage("Error","",MessagesConstants.selectReason,2000);

      return false;
    }
    const newsReportRequestObj = new NewsReportRequest();
    newsReportRequestObj.virtualNewsId = this.virtualNewsId;
    newsReportRequestObj.userId = StorageService.getUserId();
    newsReportRequestObj.masterPokeId = this.reportForm.value.masterPokeId;
    if (this.reportType === 4 ) {
      if(this.reportForm.valid && this.reportForm.value.otherPoke.trim()){
        
        newsReportRequestObj.otherPoke = this.reportForm.value.otherPoke.trim();
        this.httpMidlUtilService.reportNews(newsReportRequestObj, this, true);
       }else{
        this.showAlertMessage("Error","",MessagesConstants.requiredReportReason,2000);
}

    }
    else{
      this.httpMidlUtilService.reportNews(newsReportRequestObj, this, true);

    }
 


  }
  showAlertMessage(type,status, message,erroTime?:any) {
    this.shareDataSubscriptionService.show(type,status, message,erroTime);
  }
}
