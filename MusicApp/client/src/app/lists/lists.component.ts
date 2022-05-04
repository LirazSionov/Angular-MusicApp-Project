import { Component, OnInit } from '@angular/core';
import { Member } from '../models/member';
import { Pagination } from '../models/pagination';
import { MemberService } from '../services/member.service';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {
  members:Partial<Member>[]=[];
  predicate='liked';
  pageNumber=1;
  pageSize=5;
  pagination:Pagination;
  constructor(private memberService: MemberService) { }

  ngOnInit(): void {
    this.loadLikes();
  }
  loadLikes() {
    this.memberService.getLikes(this.predicate,this.pageNumber,this.pageSize).subscribe(members=>{
      this.members=members.result;
      this.pagination=members.pagination;
    })
  }

  pageCached(event:any){
    this.pageNumber=event.page;
    this.loadLikes();
  }

}
