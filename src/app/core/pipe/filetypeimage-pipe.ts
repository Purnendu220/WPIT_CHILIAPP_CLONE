import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filetypeImage'
})
export class FileTypeImagePipe {
  transform(value: string, args: string): string {
      let fileNameArray=value.split('.');
      let fileType=fileNameArray[fileNameArray.length - 1];
    if (fileType === 'zip') {
      value = '/assets/images/zip.jpg';
      return value;
    } else if (fileType === 'pdf') {
      value = '/assets/images/pdf.jpg';
      return value;
    }
    else if (fileType === 'docx') {
        value = '/assets/images/docx.jpg';
        return value;
      }
      else if (fileType === 'doc') {
        value = '/assets/images/doc.jpg';
        return value;
      }
      else if (fileType === 'ppt') {
        value = '/assets/images/ppt.jpg';
        return value;
      }
      else if (fileType === 'pptx') {
        value = '/assets/images/pptx.jpg';
        return value;
      }
      else if (fileType === 'xls') {
        value = '/assets/images/xls.jpg';
        return value;
      }
      else if (fileType === 'xlsx') {
        value = '/assets/images/xlsx.jpg';
        return value;
      }
     

    
  }
}
