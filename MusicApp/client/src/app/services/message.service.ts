import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Message } from '../models/Message';
import { getPaginatedResult, getPaginationParams } from './pagination-helper';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  baseUrl = environment.apiUrl;
  constructor(private http:HttpClient){ }

  getMessage(pageNumber:number,pageSize:number,container:string){
    let params=getPaginationParams(pageNumber,pageSize);
    params=params.append("container",container);
    return getPaginatedResult<Message[]>(`${this.baseUrl}massages`, params, this.http);
  }


  getMessageThread(username:string){
    return this.http.get<Message[]>(`${this.baseUrl}messages/thread/${username}`);
  }
  sendMessage(username:string,content:string){
    const createMessage = { recipientUsername:username,content }
    return this.http.post(this.baseUrl + 'massges',createMessage);
  }
  deleteMessage(id:number): Observable<any>{
    return this.http.delete(`${this.baseUrl}messages/${id}`);
  }
}
