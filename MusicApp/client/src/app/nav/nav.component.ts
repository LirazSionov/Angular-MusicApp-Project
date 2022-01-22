import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AccountService } from '../services/account.service';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model:any={};
  loggedIn=false;

  constructor(
    private accountService: AccountService) { }

  ngOnInit(): void {
  }
  logout(){
    this.loggedIn=false;
  }
  login(){
    this.accountService.login(this.model).subscribe({
    next:(response)=>{
       this.loggedIn=true;
       console.log(response);
  },
  error:(error)=>{
    console.log('Failed to login',error);
  },
  complete:()=>{}
  });
  }

}
