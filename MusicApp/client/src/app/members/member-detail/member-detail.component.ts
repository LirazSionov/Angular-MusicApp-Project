import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { NgxGalleryAnimation,NgxGalleryImage, NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { TabDirective, TabsetComponent } from 'ngx-bootstrap/tabs';
import { Subscription } from 'rxjs';
import { Member } from 'src/app/models/member';
import { Message } from 'src/app/models/Message';
import { MemberService } from 'src/app/services/member.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit , OnDestroy{
  member!:Member;
  messages:Message[]=[];
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  @ViewChild('memberTabs', {static:true}) memberTabs:TabsetComponent;
  activeTab:TabDirective;
  subscribtion:Subscription;

  constructor(private memberService: MemberService, private route: ActivatedRoute,
    private messagesService:MessageService) { }

  ngOnDestroy(): void {
    this.subscribtion.unsubscribe();
  }

  ngOnInit(): void {
    this.route.data.subscribe(data=>{
      this.member=data['member'];
    });
    this.galleryImages=this.getImages();
    this.subscribtion = this.route.queryParams.subscribe((params:Params)=>{
      this.selectTab(params['tab'] || 0);
     // params.tab ? this.selectTab(params.tab) : this.selectTab(0);
    })

    this.galleryOptions = [
      {
        width: '500px',
        height: '500px',
        imagePercent:100,
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        preview:false
      },
    ];
  }

getImages():NgxGalleryImage[]{
  const imgUrls:NgxGalleryImage[]=[];
  for (const photo of this.member.photos) {
    imgUrls.push({
      small: photo.url,
        medium: photo.url,
        big: photo.url
    })
  }
  return imgUrls
}

  onTabActivated(data: TabDirective) {
    this.activeTab = data;
    if (this.activeTab.heading === "Contact us" && this.messages.length === 0) {
      this.loadMessages();
    }
  }

  loadMessages(){
    this.messagesService.getMessageThread(this.member.username).subscribe(m=>{
      this.messages=m;
    });
  }
  selectTab(tabId: number) {
    this.memberTabs.tabs[tabId].active = true;
  }

}
