import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';
import { Member } from '../models/member';
import { User } from '../models/user';
import { AccountService } from '../services/account.service';
import { MemberService } from '../services/member.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
member!:Member;
user!:User;
@ViewChild('editForm') editForm:NgForm
@HostListener('window:beforeunload',['$event'])
unloadNotification($event:any){
  if (this.editForm.dirty) {
    $event.returnValue=true;
  }
}


  constructor(private accountServices :AccountService,
    private memberService: MemberService,
    private toastr:ToastrService
    )
   {
    this.accountServices.currentUser$.pipe(take(1)).subscribe(user=> this.user = user as User);
   }

  ngOnInit(): void {
    this.loadMember();
  }

  loadMember(){
    this.memberService.getMember(this.user.username).subscribe(member=>{
      this.member=member;
    })
  }
  updateMember(){
    this.memberService.updateMember(this.member).subscribe(()=>{
      this.toastr.success("Profile updated successfully")
      this.editForm.reset(this.member)
    });
  }

}
