import { Component, OnInit } from '@angular/core';
import { Member } from 'src/app/models/member';
import { Pagination } from 'src/app/models/pagination';
import { UserParams } from 'src/app/models/user-params';
import { MemberService } from 'src/app/services/member.service';
@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
  members:Member[];
  pagination:Pagination;
  userParams:UserParams;
  instrumentTypeList:[{
    value:'nothing',
    display:'Nothing'
  },{
    value:'piano',
    display:'Piano'
  },{
    value:'cello',
    display:'Cello'}
    ,{
    value:'drums',
    display:'Drums'}
    ,{
    value:'saxophone',
    display:'Saxophone'}
    ,{
    value:'trumpet',
    display:'Trumpet'}];

  constructor(private memberService:MemberService) {
    this.userParams=this.memberService.UserParams;
   }

  ngOnInit(): void {
    this.loadMembers();
  }
  loadMembers(){
   // console.log(this.members);
    this.memberService.UserParams=this.userParams;
    this.memberService.getMembers(this.userParams).subscribe(
      res=>{
        this.members=res.result;
        this.pagination=res.pagination;
      }
    )
  }

  pageChanged({page}:any){
    this.userParams.pageNumber=page;
    this.memberService.UserParams=this.userParams;
    this.loadMembers();
  }
  resetFilters(){
    this.userParams=this.memberService.resetUserParams();
    this.loadMembers();
  }
}
