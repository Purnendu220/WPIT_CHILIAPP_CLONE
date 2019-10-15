import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PlatformLocation } from '@angular/common';
import { MessagesConstants } from '../constants';

@Component({
  selector: 'app-common-confirmation-popup',
  templateUrl: './common-confirmation-popup.component.html',
  styleUrls: ['./common-confirmation-popup.component.scss']
})
export class CommonConfirmationPopupComponent implements OnInit {
  public message: string;
  public title: string;
  public parent: any;
  public showCancel: any = true;
  public showConfirm: any = true;
  public cancelText: any = MessagesConstants.no;
  public confirmText: any = MessagesConstants.yes;    
  public refrenceObject: any;
  constructor(public activeModal: NgbActiveModal, private modalService: NgbModal, public location: PlatformLocation) {
    location.onPopState(() => {
      this.activeModal.close('Cross click');
    });
  }

  ngOnInit() {

  }
  confirmAction() {
    if (typeof this.parent.confirmAction !== "undefined") {
      if (this.refrenceObject) {
        this.parent.confirmAction(this.refrenceObject);
      } else {
        this.parent.confirmAction();        
      }
    }

    this.activeModal.close('Confirm click');

  }

  cancelAction() {
    if (typeof this.parent.cancelAction !== "undefined") {
      this.parent.cancelAction();
    }
    this.activeModal.close('Cancel click');
  }
  closePopup() {
    this.activeModal.close('Cross click');

  }
}
