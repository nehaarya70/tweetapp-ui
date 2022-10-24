import { Component, ElementRef, OnInit } from '@angular/core';
import { ApiAccessService, Tweet } from '../shared/api.access.service';

@Component({
  selector: 'app-one-tweet',
  templateUrl: './one-tweet.component.html',
  styleUrls: ['./one-tweet.component.css']
})
export class OneTweetComponent implements OnInit {

  constructor(private apiAccessService: ApiAccessService,
    private elementRef: ElementRef) { }
  tweetId: any;
  tweet: any;
  replies: any;

  ngOnInit(): void {
    this.tweetId = window.sessionStorage.getItem('tweetId');
    console.log(this.tweetId);

    this.apiAccessService.getOneTweet(this.tweetId).subscribe((data) => {
      console.log("Tweet=>", data);
      this.tweet = data;

      this.apiAccessService.getReliesOnTweet(this.tweetId).subscribe((data) => {
        console.log("Replies=>", data);
        this.replies = data;
      })
    })
  }

  ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = 'whitesmoke';
  }

}
