import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MemberListComponent } from '../members/member-list/member-list.component';
import { MemberDetailComponent } from '../members/member-detail/member-detail.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from './shared.module';
import { MemberCardComponent } from '../members/member-card/member-card.component';


const routes:Routes=[
  {path:'',component:MemberListComponent,pathMatch:'full'},
  {path:':username',component:MemberDetailComponent},
]

@NgModule({
  declarations: [
    MemberListComponent,
    MemberDetailComponent,
    MemberCardComponent,


  ],
  imports: [
    SharedModule,
    CommonModule,
    RouterModule.forChild(routes),
  ],
  exports:[
    RouterModule,
    MemberListComponent,
    MemberDetailComponent,
    MemberCardComponent
  ]
})
export class MembersModule { }
