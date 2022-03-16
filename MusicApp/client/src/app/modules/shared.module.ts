import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ToastrModule } from 'ngx-toastr';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FileUploadModule } from 'ng2-file-upload';
import {BsDatepickerModule} from  'ngx-bootstrap/datepicker'

@NgModule({
  declarations: [],
  imports: [
    BrowserAnimationsModule,
    NgxSpinnerModule,
    NgxGalleryModule,
    BsDropdownModule.forRoot(),
    ToastrModule.forRoot({
      positionClass:'toast-bottom-right'}),
    TabsModule.forRoot(),
    CommonModule,
    FileUploadModule,
    BsDatepickerModule.forRoot()
  ],
  exports:[
    NgxGalleryModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    TabsModule,
    BsDropdownModule,
    ToastrModule,
    FileUploadModule,
    BsDatepickerModule
  ]
})
export class SharedModule { }
