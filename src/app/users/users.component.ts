import { Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiAccessService, AppUser } from '../shared/api.access.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor(private apiAccessService: ApiAccessService,
    private elementRef: ElementRef,
    private router: Router) { }

  users: AppUser[] = []
  ngOnInit(): void {

    this.apiAccessService.getAllUsers().subscribe((data) => {
      this.users = data;
      console.log(this.users);
    },
    error => {
      console.log(error);
      
    })
  }

  ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = 'whitesmoke';
  }

  showTweetsofUser(username : string){
    window.sessionStorage.setItem("username", username);
    this.router.navigateByUrl('/getUserTweets');
  }

}
