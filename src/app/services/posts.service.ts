import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  constructor(private http: HttpClient) {}

  uploadPost(auctionList) {
    let newList = JSON.stringify(auctionList);
    return this.http.post(
      `https://auction-app-6f3cf-default-rtdb.europe-west1.firebasedatabase.app/auctionData.json`,
      newList
    );
  }
}
