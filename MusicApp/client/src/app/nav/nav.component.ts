import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { AccountService } from '../services/account.service';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model:any={};
  currentUser$:Observable<User|null>;
  constructor(
    private accountService: AccountService) {
      this.currentUser$=this.accountService.currentUser$;
     }

  ngOnInit(): void {
  }
  logout(){
    this.accountService.logout();
  }
  login(){
    this.accountService.login(this.model).subscribe({
    next:(response)=>{
       console.log(response);
  },
  error:(error)=>{
    console.log('Failed to login',error);
  },
  complete:()=>{}
  });
  }


}
