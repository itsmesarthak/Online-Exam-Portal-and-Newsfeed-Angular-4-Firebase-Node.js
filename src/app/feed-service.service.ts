import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import { Feed } from './model/feed';
import { Player } from './model/player';

@Injectable()
export class FeedServiceService {
//  public translate = "localhost:8081/api/players";
   txt = encodeURI("What is Your Name");
  public t = "https://us-central1-allexamcorner.cloudfunctions.net/app/api/";
  private rssToJsonServiceBaseUrl: string = 'https://rss2json.com/api.json?rss_url=';
  
    constructor(
      private http: Http
    ) { }
  
   
    getPlayers(text): Observable<Feed[]> {
          return this.http.get(this.t + text)
                          .map(this.extractFeeds)
                          .catch(this.handleError);
    }

    getFeedContent(url: string): Observable<Feed> {
      return this.http.get(this.rssToJsonServiceBaseUrl + url)
              .map(this.extractFeeds)
              .catch(this.handleError);
    }
  
    private extractFeeds(res: Response): Feed {
      let feed = res.json();
      return feed || { };
    }
  
    private handleError (error: any) {
      // In a real world app, we might use a remote logging infrastructure
      // We'd also dig deeper into the error to get a better message
      let errMsg = (error.message) ? error.message :
        error.status ? '${error.status} - ${error.statusText}' : 'Server error';
      console.error(errMsg); // log to console instead
      return Observable.throw(errMsg);
    }

    getUser() {
      return this.http.get('https://thinkster.io/tutorials/angular-2-http')
      .map((res:Response) => res);
      //.map((res:Response) => res.json());
    }

}