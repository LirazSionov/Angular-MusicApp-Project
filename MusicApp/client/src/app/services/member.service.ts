import { HttpClient  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Member } from '../models/member';
import { PaginatedResult } from '../models/pagination';
import { User } from '../models/user';
import { UserParams } from '../models/user-params';
import { AccountService } from './account.service';
import { getPaginatedResult, getPaginationParams } from './pagination-helper';
@Injectable({
  providedIn: 'root'
})
export class MemberService {
  baseUrl=environment.apiUrl;
  members:Member[] = [];
  memberCache = new Map<string,PaginatedResult<Member[]>>();
  user:User;
  userParams:UserParams;

  constructor(
    private http:HttpClient,
    private accountService:AccountService
    ) {
      this.accountService.currentUser$
      .pipe(take(1))
      .subscribe((user:any)=>{
        this.user=user;
        this.userParams=new UserParams(user);
      });
     }

     addLike(username:string){
      const url=`${this.baseUrl}likes/${username}`;
     return this.http.post(url,{});
    }

     getLikes(predicate:string, pageNumber:number,pageSize:number){
       let params = getPaginationParams(pageNumber,pageSize);
       params.append('predicate',predicate);
       return getPaginatedResult<Partial<Member>[]>(`${this.baseUrl}likes`,params,this.http);
       //return this.http.get<Partial<Member>[]>(`${this.baseUrl}likes?predicate=${predicate}`);
     }

     public get UserParams() : UserParams {
      return this.userParams;
    }

    public set UserParams(userParams : UserParams) {
      this.userParams = userParams;
    }
    resetUserParams(){
      this.userParams=new UserParams(this.user);
      return this.userParams;
    }

  getMembers(userParams:UserParams): Observable<PaginatedResult<Member[]>>{
    // debugger
    const cacheKey=Object.values(userParams).join('-');
    const response=this.memberCache.get(cacheKey);
    //console.log(response);
    if(response) return of(response);

    let params = getPaginationParams(userParams.pageNumber,userParams.pageSize);
    params=params.append('minCost',userParams.minCost.toString());//maybe int
    params=params.append('maxCost',userParams.maxCost.toString());//maybe int
    params=params.append('instrumentType',userParams.instrumentType);
    params=params.append('orderBy',userParams.orderBy);

    return getPaginatedResult<Member[]>(`${this.baseUrl}users`,params,this.http)
    .pipe(
      tap(res=>this.memberCache.set(cacheKey,res))
    );
  }
  // get() : Observable<Array<Member>>{
  //   return this.http.get<Array<Member>>(`${this.baseUrl}users/set-main-photo/${PhotoId}`,{});

  // }

  getMember(username:string): Observable<Member>{
    // const member=this.members.find(x=>x.username==username);
    // if (member) {
    //   return of(member);
    // }
    const members = [...this.memberCache.values()];
    const allMembers = members.reduce((arr:Member[],elem:PaginatedResult<Member[]>)=>arr.concat(elem.result),[]);
    const foundMember = allMembers.find(m => m.username === username);

    if(foundMember) return of(foundMember);

    return this.http.get<Member>(`${this.baseUrl}users/${username}`);
  }
  updateMember(member:Member){
    return this.http.put(`${this.baseUrl}users`,member).pipe(
      tap(_ => {
        const index=this.members.findIndex(x => x.id === member.id);
        this.members[index] = member;
      })
    );
  }
  setMainPhoto(PhotoId:number):Observable<any>{
    return this.http.put(`${this.baseUrl}users/set-main-photo/${PhotoId}`,{});
  }
  deletePhoto(PhotoId:number){
    return this.http.delete(`${this.baseUrl}users/delete-photo/${PhotoId}`);
  }
}
