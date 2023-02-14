import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Auction } from '../models/auction.model';

@Injectable({
  providedIn: 'root',
})
export class AuctionService {
  testAuction = new Auction(
    'Kibinas',
    'Very delicious',
    null,
    'inactive',
    0,
    null,
    null,
    null
  );

  testAuction2 = new Auction(
    'Keptuve',
    'Very good',
    null,
    'active',
    0,
    null,
    1676378571660,
    1676381000000
  );
  auctionArray: Auction[] = [this.testAuction, this.testAuction2];
  auctionChanged = new Subject<Auction[]>();
  constructor() {}

  createAuction(auctionName, auctionDesc) {
    let newAuction = new Auction(
      auctionName,
      auctionDesc,
      null,
      'inactive',
      0,
      null,
      null,
      null
    );
    this.auctionArray.push(newAuction);

    this.auctionChanged.next(this.auctionArray);
  }

  startAuction(auctionItem: Auction) {
    let startDate = new Date().getTime();
    let endDate = startDate + 10 * 1000;
    auctionItem.startDate = startDate;
    auctionItem.endDate = endDate;
    auctionItem.status = 'active';
    this.auctionChanged.next(this.auctionArray);
  }

  bidOnAuction(auctionItem: Auction) {
    if (auctionItem.endDate != 0) {
      auctionItem.endDate += 10 * 1000;
      this.auctionChanged.next(this.auctionArray);
    }
  }

  endOfAuction(auctionItem: Auction) {
    auctionItem.status = 'ended';
    this.auctionChanged.next(this.auctionArray);
  }

  getAuctionList() {
    console.log(new Date().getTime());
    return this.auctionArray;
  }

  getTimeDif(auctionItem: Auction) {
    let currentTime = new Date().getTime();
    return Number(((auctionItem.endDate - currentTime) / 1000).toFixed(0));
  }
}
