import { Component, ElementRef, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiAccessService } from '../shared/api.access.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {
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
    const username = form.value.username;
    const password = form.value.password
    this.apiAccessService.forgetPassword(username, password).subscribe(
      (data) => {
        console.log(data)
        this.success = true;
        //this.route.navigate(['/p'])
      }, errorResp => {
        this.error = errorResp.error.message;
        form.reset();

      })
  }
}
