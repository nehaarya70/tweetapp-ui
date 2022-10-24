import { Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiAccessService, AppUser } from '../shared/api.access.service';

@Component({
  selector: 'app-search-user',
  templateUrl: './search-user.component.html',
  styleUrls: ['./search-user.component.css']
})
export class SearchUserComponent implements OnInit {

  constructor(private apiAccessService: ApiAccessService,
    private elementRef: ElementRef,
    private router: Router) { }

  searchUser = '';
  users: AppUser[] = []

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = 'whitesmoke';
  }

  onSubmit() {
    this.apiAccessService.searchUser(this.searchUser).subscribe((result) => {
      this.users = result;
    });
  }

  showTweetsofUser(username : string){
    window.sessionStorage.setItem("username", username);
    this.router.navigateByUrl('/getUserTweets');
  }
}
