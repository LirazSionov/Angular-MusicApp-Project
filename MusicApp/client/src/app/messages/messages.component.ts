import { Component, OnInit } from '@angular/core';
import { Message } from '../models/Message';
import { Pagination } from '../models/pagination';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  messages:Message[]=[];
  pagination:Pagination;
  container:string='Unread';
  pageNumber:number=1;
  pageSize:number=5;
  loading:boolean=false;


  constructor(private messageService:MessageService) { }

  ngOnInit(): void {
    this.loadMessages();
  }

  loadMessages(){
    this.loading=true;
    this.messageService.getMessage(this.pageNumber,this.pageSize,this.container).subscribe(x =>{
      this.messages=x.result;
      this.pagination=x.pagination;
      this.loading=false;
    });
  }

  pageChange(event:any):void{
    //if(this.pageNumber!= event.page){
      this.pageNumber=event.page;
      this.loadMessages();
 // }
  }
  deleteMessage(id:number){
    this.messageService.deleteMessage(id).subscribe(() => {
      this.messages.splice(this.messages.findIndex(m => m.id === id),1);
    });
  }
}
