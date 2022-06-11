import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MemberListComponent } from '../members/member-list/member-list.component';
import { MemberDetailComponent } from '../members/member-detail/member-detail.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from './shared.module';
import { MemberMessagesComponent } from '../members/member-messages/member-messages.component';
import { MemberDetailsResolver } from '../Resolvers/member-details.resolver';


const routes:Routes=[
  {path:'',component:MemberListComponent,pathMatch:'full'},
  {path:':username',
   component:MemberDetailComponent,
   resolve:{
    member:MemberDetailsResolver
   }
  }
]

@NgModule({
  declarations: [
    MemberListComponent,
    MemberDetailComponent,
    MemberMessagesComponent

  ],
  imports: [
    SharedModule,
    CommonModule,
    RouterModule.forChild(routes),
  ],
  exports:[
    RouterModule,
    MemberListComponent,
    MemberDetailComponent
  ]
})
export class MembersModule { }
