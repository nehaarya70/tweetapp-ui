import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { BehaviorSubject, throwError, Subject } from 'rxjs';
import { User } from '../auth/auth.model';
import { Router } from '@angular/router';
import { UrlReferenceService } from './url-reference.service';
const headers = new Headers;

export interface ResponseData {
    id: string;
    email: string;
    username: string;
}

export interface Tweet {
    id: string,
    createdDateTime: string,
    username: string,
    message: string,
    noOfLikes: string

}

export interface AppUser {
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    username: string,
    password: string,
    contactNumber: any;
}

export interface Replies {
    tweetId: string,
    user: string,
    replyByUser: string,
    reply: string,
}

export interface Likes {
    tweetId: string,
    user: string,
    likedByUser: string,
}



@Injectable({
    providedIn: 'root'
})

export class ApiAccessService implements OnInit {

    ngOnInit() {
    }
    user = new BehaviorSubject<User | null>(null);
    userData!: {
        username: string,
        id: string,
        _token: string,
        _tokenExpirationDate: string

    };

    constructor(private http: HttpClient, private route: Router,
        private urlReferenceService: UrlReferenceService) {

    }

    createPost(message: string) {
        this.userData = JSON.parse(localStorage.getItem('userData')!);
        return this.http.post<ResponseData>(this.urlReferenceService.serviceURL + 'addTweet',
            {
                username: this.userData.username,
                message: message,
            })
    }

    getMyTweet() {
        this.userData = JSON.parse(localStorage.getItem('userData')!);
        return this.http.get<Tweet[]>(this.urlReferenceService.serviceURL + this.userData.username);
    }

    getUserTweet(username: string) {
        this.userData = JSON.parse(localStorage.getItem('userData')!);
        return this.http.get<Tweet[]>(this.urlReferenceService.serviceURL + username);
    }

    updateMyTweet(id: string, newMessage: string) {
        this.userData = JSON.parse(localStorage.getItem('userData')!);
        console.log(id)
        return this.http.put<Tweet>(this.urlReferenceService.serviceURL + 'updateTweet/' + id,
            {
                username: this.userData.username,
                message: newMessage
            });
    }

    deleteTweet(id: string) {
        this.userData = JSON.parse(localStorage.getItem('userData')!);
        return this.http.delete<any>(this.urlReferenceService.serviceURL + this.userData.username + '/deleteTweet/' + id);

    }

    getAllTweets() {
        this.userData = JSON.parse(localStorage.getItem('userData')!);
        return this.http.get<Tweet[]>(this.urlReferenceService.serviceURL + 'allTweets');


    }

    forgetPassword(username: string, password: string) {
        this.userData = JSON.parse(localStorage.getItem('userData')!);
        return this.http.put<any>(this.urlReferenceService.serviceURL + 'forgetPassword', {
            username: username,
            newPassword: password
        })
    }

    likeTweet(id: string, user: string) {
        this.userData = JSON.parse(localStorage.getItem('userData')!);
        console.log(id)
        return this.http.put<any>(this.urlReferenceService.serviceURL + 'likeTweet',
            {
                likedByUser: this.userData.username,
                tweetId: id,
                user: user
            });
    }

    unlikeTweet(id: string, user: string) {
        this.userData = JSON.parse(localStorage.getItem('userData')!);
        console.log(id);
        return this.http.delete<any>(this.urlReferenceService.serviceURL + 'unlikeTweet/' + id + '/'+  user +'/'+ this.userData.username);
    }
    

    replyTweet(id: string, user: string, message: string) {
        this.userData = JSON.parse(localStorage.getItem('userData')!);
        console.log(id)
        return this.http.put<Tweet>(this.urlReferenceService.serviceURL + 'replyTweet',
            {
                replyByUser: this.userData.username,
                tweetId: id,
                user: user,
                reply: message
            });
    }

    getAllUsers() {
        this.userData = JSON.parse(localStorage.getItem('userData')!);
        return this.http.get<AppUser[]>(this.urlReferenceService.serviceURL + 'users/allUsers');
    }

    searchUser(username: string) {
        this.userData = JSON.parse(localStorage.getItem('userData')!);
        return this.http.get<AppUser[]>(this.urlReferenceService.serviceURL + 'user/searchAppUser/' + username);
    }

    getOneTweet(id: string) {
        this.userData = JSON.parse(localStorage.getItem('userData')!);
        return this.http.get<Tweet>(this.urlReferenceService.serviceURL + 'oneTweet/' + id);
    }

    getReliesOnTweet(id: string) {
        this.userData = JSON.parse(localStorage.getItem('userData')!);
        return this.http.get<Replies[]>(this.urlReferenceService.serviceURL + 'getRepliesById/' + id);
    }

    getTweetsLikedByUser() {
        this.userData = JSON.parse(localStorage.getItem('userData')!);
        return this.http.get<Likes[]>(this.urlReferenceService.serviceURL + 'getTweetsLikedByUser/' + this.userData.username);
    }

}
