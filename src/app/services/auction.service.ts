import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Auction } from '../models/auction.model';
import { AuctionUser } from '../models/auctionUser.model';
import { UserService } from './user.service';

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
    'inactive',
    0,
    null,
    null,
    null
  );
  // auctionArray: Auction[] = [this.testAuction, this.testAuction2];
  auctionArray: Auction[] = [];
  auctionChanged = new Subject<Auction[]>();
  constructor(private userService: UserService) {}

  createAuction(auctionName, auctionDesc, auctionOwner) {
    let newAuction = new Auction(
      auctionName,
      auctionDesc,
      auctionOwner,
      'inactive',
      0,
      null,
      null,
      null
    );
    this.auctionArray.push(newAuction);
    this.auctionChanged.next(this.auctionArray);
    this.userService.addUserAuction(auctionOwner, newAuction);
  }

  startAuction(auctionItem: Auction) {
    let startDate = new Date().getTime();
    let endDate = startDate + 25 * 1000;
    auctionItem.startDate = startDate;
    auctionItem.endDate = endDate;
    auctionItem.status = 'active';
    this.auctionChanged.next(this.auctionArray);
  }

  bidOnAuction(currentUser: AuctionUser, auctionItem: Auction) {
    if (auctionItem.endDate != 0) {
      auctionItem.endDate += 10 * 1000;
      auctionItem.highestBid += 10;
      auctionItem.highestBidder = currentUser;
      if (!currentUser.userBids.includes(auctionItem)) {
        currentUser.userBids.push(auctionItem);
      }

      this.auctionChanged.next(this.auctionArray);
    }
  }

  endOfAuction(auctionItem: Auction) {
    auctionItem.status = 'ended';
    this.auctionChanged.next(this.auctionArray);
  }

  getAuctionList() {
    return this.auctionArray;
  }

  getActiveAuctions() {
    let activeAuctions = [];

    ///Don't know why filter doesn't work
    this.auctionArray.forEach((auction) => {
      if (auction.status === 'active') {
        activeAuctions.push(auction);
      }
    });
    return activeAuctions;
  }

  getTimeDif(auctionItem: Auction) {
    let currentTime = new Date().getTime();
    return Number(((auctionItem.endDate - currentTime) / 1000).toFixed(0));
  }

  getUserBids(currentUser: AuctionUser) {}
}
