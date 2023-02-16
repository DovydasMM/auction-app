import { stringify, toJSON } from 'flatted';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuctionUser } from '../models/auctionUser.model';
import { Auction } from '../models/auction.model';
import { pipe, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  constructor(private http: HttpClient) {}

  uploadPost(auctionList) {
    return this.http.put(
      `https://auction-app-6f3cf-default-rtdb.europe-west1.firebasedatabase.app/auctionData.json`,
      auctionList
    );
  }

  fetchPost() {
    return this.http
      .get(
        'https://auction-app-6f3cf-default-rtdb.europe-west1.firebasedatabase.app/auctionData.json'
      )
      .pipe(
        map((resData) => {
          const auctionArray: Auction[] = [];
          for (const key in resData) {
            auctionArray.push(resData[key]);
          }
          return auctionArray;
        })
      );
  }
}
