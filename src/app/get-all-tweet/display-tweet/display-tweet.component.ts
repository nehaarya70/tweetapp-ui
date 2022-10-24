import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ApiAccessService, Tweet } from 'src/app/shared/api.access.service';

@Component({
  selector: 'app-display-tweet',
  templateUrl: './display-tweet.component.html',
  styleUrls: ['./display-tweet.component.css']
})
export class DisplayTweetComponent implements OnInit {

  @Input() tweet!: Tweet;
  @Input() i!: number;
  @Input() istweetLiked!: boolean;
  showReply = false;
  replyMsg = '';

  constructor(private apiAccessService: ApiAccessService,
    private router: Router) { }

  ngOnInit(): void {
  }

  @Output() selected = new EventEmitter<{ id: string, username: string, message: string}>();

  @Output() value = new EventEmitter<{ id: string, user: string}>();

  @Output() valueUnlike = new EventEmitter<{ id: string, user: string}>();

  onTweetLike(id:string, username:string){
    console.log(id)
    // this.apiAccessService.likeTweet(id, username);
    this.value.emit({ id: id, user: username});
  }

  onTweetUnlike(id:string, username:string){
    console.log(id)
    // this.apiAccessService.unlikeTweet(id, username);
    this.valueUnlike.emit({ id: id, user: username});
  }


  showReplyBox() {
    this.showReply = true;
  }

  onClose(){
    this.showReply = false;
  }

  onSubmit(id: string, username: string) {
    console.log("sending data to parent");
    this.showReply = false;
    this.selected.emit({ id: id, username : username, message: this.replyMsg});
  }

  showTweet(id: any){
    window.sessionStorage.setItem("tweetId", id);
    this.router.navigateByUrl('/onetweet');
  }
}
