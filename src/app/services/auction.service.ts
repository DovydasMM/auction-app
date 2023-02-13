import { Injectable } from '@angular/core';
import { Auction } from '../models/auction.model';

@Injectable({
  providedIn: 'root',
})
export class AuctionService {
  auctionArray: Auction[] = [];

  constructor() {}

  createAuction(auctionName, auctionDesc) {
    let newAuction = new Auction(
      auctionName,
      auctionDesc,
      'inactive',
      0,
      null,
      null,
      null
    );
    this.auctionArray.push(newAuction);
    console.log(this.auctionArray);
  }
}
