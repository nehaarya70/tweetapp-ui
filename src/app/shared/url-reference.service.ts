import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UrlReferenceService {

  // readonly prodModeUrl = "http://127.0.0.1:8080/";
  readonly prodModeUrl = "http://tweetapp-elb-1117862792.ap-south-1.elb.amazonaws.com/";

  readonly localDevelopment = true;

  readonly serviceURL = this.prodModeUrl + 'tweetApp/2.0/';
  
  constructor() { }
}
