import { Component, ElementRef, OnInit } from '@angular/core';
import { ApiAccessService, Likes, Tweet } from '../shared/api.access.service';

@Component({
  selector: 'app-get-all-user-tweet',
  templateUrl: './get-all-user-tweet.component.html',
  styleUrls: ['./get-all-user-tweet.component.css']
})
export class GetAllUserTweetComponent implements OnInit {


  constructor(private apiAccessService: ApiAccessService,
    private elementRef: ElementRef) { }
  tweet: Tweet[] = [];
  likes: Likes[] = [];
  username : any;

  ngOnInit(): void {
    this.username = window.sessionStorage.getItem('username');
    this.apiAccessService.getUserTweet(this.username).subscribe((data) => {
      this.tweet = data;
    })

    this.apiAccessService.getTweetsLikedByUser().subscribe((data) => {
      this.likes = data;
    })
  }

  ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = 'whitesmoke';
  }

  onTweetLike(to: { id: string, user: string }) {
    console.log(to)
    this.apiAccessService.likeTweet(to.id, to.user).subscribe((result) => {
      this.apiAccessService.getUserTweet(this.username).subscribe((data) => {
        this.tweet = data;
      })
      this.apiAccessService.getTweetsLikedByUser().subscribe((data) => {
        this.likes = data;
      })
    })
  }


  onTweetUnlike(to: { id: string, user: string }) {
    console.log(to)
    this.apiAccessService.unlikeTweet(to.id, to.user).subscribe((result) => {
      this.apiAccessService.getUserTweet(this.username).subscribe((data) => {
        this.tweet = data;
      })
      this.apiAccessService.getTweetsLikedByUser().subscribe((data) => {
        this.likes = data;
      })
    })
  }

  onSelect(to: { id: string, username: string, message: string }): any {
    this.apiAccessService.replyTweet(to.id, to.username, to.message).subscribe((result) => {
      this.apiAccessService.getUserTweet(this.username).subscribe((data) => {
        this.tweet = data;
      })
    });
  }

  istweetLiked(id : string): boolean{
    let i;
    for(i=0; i<this.likes.length; i++){
      if(id == this.likes[i].tweetId){
        return true;
      }
    }
    return false;
  }

}
