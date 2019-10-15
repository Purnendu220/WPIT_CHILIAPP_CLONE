import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CoreModule } from '../../../core/core.module';
import { EditProfileComponent } from './edit-profile.component';
import { RoutingEditrofile } from './edit-profile.routing';
import { ImageCropModule } from '../../imageCroppingPopup/imageCrop.module';
import { CustomDatePickerModule } from '../../custom-date-picker/custom-date-picker.module';
import { SelectDropDownModule } from 'ngx-select-dropdown';

@NgModule({
  imports: [
    CommonModule,
    RoutingEditrofile,
    ReactiveFormsModule,
    FormsModule,
    CoreModule,
    ImageCropModule,
    CustomDatePickerModule,
    SelectDropDownModule
  ],
  declarations: [EditProfileComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EditProfileModule { }
