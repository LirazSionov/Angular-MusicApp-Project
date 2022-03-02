import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ToastrModule } from 'ngx-toastr';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from 'ngx-spinner';

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
    CommonModule
  ],
  exports:[
    NgxGalleryModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    TabsModule,
    BsDropdownModule,
    ToastrModule
  ]
})
export class SharedModule { }
