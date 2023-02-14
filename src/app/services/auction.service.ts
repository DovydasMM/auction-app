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
  auctionArray: Auction[] = [this.testAuction];
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
    let endDate = startDate + 60 * 1000;
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

  getAuctionList() {
    return this.auctionArray;
  }
}
