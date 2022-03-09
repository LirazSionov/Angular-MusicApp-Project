import { Component, Input, OnInit } from '@angular/core';
import { Member } from 'src/app/models/member';
import { FileUploader, FileUploaderOptions } from 'ng2-file-upload';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/models/user';
import { AccountService } from 'src/app/services/account.service';
import { take } from 'rxjs';
import { MemberService } from 'src/app/services/member.service';
import { Photo } from 'src/app/models/photo';

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.css']
})
export class PhotoEditorComponent implements OnInit {
  @Input() member:Member;
  uploader:FileUploader;
  hasBaseDropZoneOver:boolean=false;
  baseUrl=environment.apiUrl;
  user:User;
  constructor(private accountService:AccountService,private memberService:MemberService) {
    this.accountService.currentUser$.pipe(take(1)).subscribe(user=>this.user=user as User)
   }

  ngOnInit(): void {
    this.initializeUploader();
  }

  initializeUploader(){
    const options:FileUploaderOptions={
      url:`${this.baseUrl}users/add-photo`,
      authToken:`Bearer ${this.user.token}`,
      isHTML5:true,
      allowedFileType:['image'],
      removeAfterUpload:true,
      autoUpload:false,
      maxFileSize:10*1024*1024
    }
    this.uploader=new FileUploader(options)
    this.uploader.onAfterAddingFile=(file)=>{
      file.withCredentials=false;
    }
    this.uploader.onSuccessItem=(item,respons,status,header)=>{
      if(respons){
        const photo=JSON.parse(respons);
        this.member.photos.push(photo);
      }
    }
  }

  fileOverBase(e:any){
    this.hasBaseDropZoneOver=e;
  }
  setMainPhoto(photo:Photo){
    this.memberService.setMainPhoto(photo.id).subscribe(()=>{
      this.accountService.setCurrentUser(this.user);

      this.member.photos.forEach(
        p=>p.isMain=p.id===photo.id
      )
    })
  }
  deletePhoto(photoId: number) {
    this.memberService.deletePhoto(photoId).subscribe(() => {
      this.member.photos = this.member.photos.filter(p => p.id !== photoId);
    });
  }

}
