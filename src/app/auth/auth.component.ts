import { Component, ElementRef, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  error = null;
  constructor(private authService: AuthService, private route: Router,
    private elementRef: ElementRef) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = 'whitesmoke';
  }

  async onSubmit(form: NgForm) {
    this.error = null
    const username = form.value.username;
    const password = form.value.password
    this.authService.login(username, password).subscribe(
      (data) => {
        console.log(data)
        this.route.navigate(['/posttweet'])
      }, errorResp => {
        this.error = errorResp.error.message;
        form.reset();

      })
  }
}