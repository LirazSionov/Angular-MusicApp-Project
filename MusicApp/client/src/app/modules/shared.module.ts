import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ToastrModule } from 'ngx-toastr';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';

@NgModule({
  declarations: [],
  imports: [
    NgxGalleryModule,
    BsDropdownModule.forRoot(),
    ToastrModule.forRoot({
      positionClass:'toast-bottom-right'}),
    TabsModule.forRoot(),
    CommonModule
  ],
  exports:[
    NgxGalleryModule,
    TabsModule,
    BsDropdownModule,
    ToastrModule
  ]
})
export class SharedModule { }
