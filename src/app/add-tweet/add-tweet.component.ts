import { Component, ElementRef, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiAccessService } from '../shared/api.access.service';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-add-tweet',
  templateUrl: './add-tweet.component.html',
  styleUrls: ['./add-tweet.component.css']
})
export class AddTweetComponent implements OnInit {

  error = null;
  success = false;
  constructor(private apiAccessService: ApiAccessService, private route: Router,
    private elementRef: ElementRef) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = 'whitesmoke';
  }

  async onSubmit(form: NgForm) {
    this.error = null
    const message = form.value.message;
    this.apiAccessService.createPost(message).subscribe(
      (data) => {
        this.success = true;
        console.log(data)


      }, errorResp => {
        this.error = errorResp.error.message;
        form.reset();

      })

  }
}
