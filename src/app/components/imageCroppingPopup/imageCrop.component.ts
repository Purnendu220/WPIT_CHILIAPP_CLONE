import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from "@angular/router";
import { PlatformLocation } from '@angular/common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CropperSettings } from '../../core/model/cropperSettings';

declare var $: any;

@Component({
  selector: 'app-imagecroppopup',
  templateUrl: './imageCrop.component.html',
  styleUrls: ['./imageCrop.component.css']
})
export class ImageCropComponent {

  @Output() notifyParent: EventEmitter<any> = new EventEmitter();

  public cropperSettings: CropperSettings = new CropperSettings();
  public fileToUpload: File;
  public imgPreviewSrc: any;
  public formatType: string;
  public format: string;

  constructor(public Browserlocation: PlatformLocation,public activeModal: NgbActiveModal) {
    Browserlocation.onPopState(() => {
      this.activeModal.close('Close Model');
  });  
   }

  ngOnInit() {
    this.cropperSettings.compressRatio = 1;
    this.getFileFormat(this.fileToUpload.name);    
  }

  ngAfterViewInit() {
    let thisObj = this;
    var basic = $('#crop_img').croppie({
      viewport: { width: thisObj.cropperSettings.minWidth, height: thisObj.cropperSettings.minHeight },
      boundary: { width: thisObj.cropperSettings.canvasWidth, height: thisObj.cropperSettings.canvasHeight },
      showZoomer: false,
      enableOrientation: true,
      quality: .7,
      format: thisObj.format
    });

    imagePreviewList(thisObj.fileToUpload);

    function imagePreviewList(file: File) {
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        thisObj.imgPreviewSrc = reader.result
        basic.croppie('bind', {
          url: thisObj.imgPreviewSrc,
        });
      }
    }

    $('#upload_crop').click(function () {
      basic.croppie('result', 'blob').then(function (result) {
        thisObj.notifyParent.next(result);
        thisObj.activeModal.close('after cropped');
      });
    })

  }



  getFileFormat(image) {
    if (image && image.indexOf("png") != -1) {
      this.format = "png";
      this.formatType = ".png";
    }
    else if (image && image.indexOf("jpg") != -1) {
      this.format = "jpeg";
      this.formatType = ".jpg";
    }
  }
}
