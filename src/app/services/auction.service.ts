import { PostsService } from './posts.service';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Auction } from '../models/auction.model';
import { AuctionUser } from '../models/auctionUser.model';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class AuctionService {
  auctionArray: Auction[] = [];
  auctionChanged = new Subject<Auction[]>();
  constructor(
    private userService: UserService,
    private postService: PostsService
  ) {}

  createAuction(auctionName, auctionDesc, auctionOwner) {
    let newAuction = new Auction(
      auctionName,
      auctionDesc,
      auctionOwner,
      'inactive',
      0,
      null,
      [],
      null,
      null
    );
    this.auctionArray.push(newAuction);
    this.auctionChanged.next(this.auctionArray);
    this.userService.addUserAuction(auctionOwner, newAuction);
  }

  startAuction(auctionItem: Auction) {
    let startDate = new Date().getTime();
    let endDate = startDate + 10 * 1000;
    auctionItem.startDate = startDate;
    auctionItem.endDate = endDate;
    auctionItem.status = 'active';
    this.auctionChanged.next(this.auctionArray);
    this.postService.uploadPost(this.auctionArray).subscribe((resData) => {
      console.log(resData);
    });
  }

  bidOnAuction(currentUser: AuctionUser, auctionItem: Auction) {
    if (auctionItem.endDate != 0) {
      auctionItem.endDate += 10 * 1000;
      auctionItem.highestBid += 10;
      auctionItem.highestBidder = currentUser;

      let newBid = { bidder: currentUser, bidSum: auctionItem.highestBid };

      //Checks if current bidder has already bid on this auction.
      //If he has, it updates his sum.
      //If Not, he is added to the bidder list
      let indexOf = auctionItem.bidHistory.find((index) => {
        return index.bidder == newBid.bidder;
      });
      if (!indexOf) auctionItem.bidHistory.push(newBid);
      else {
        indexOf.bidSum = newBid.bidSum;
      }

      if (!currentUser.userBids.includes(auctionItem)) {
        currentUser.userBids.push(auctionItem);
      }

      this.auctionChanged.next(this.auctionArray);
    }
  }

  endOfAuction(auctionItem: Auction) {
    auctionItem.status = 'ended';
    console.log(auctionItem);
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

  getBidHistory(auctionItem: Auction) {
    let bidHistory = auctionItem.bidHistory;
    bidHistory.sort((a, b) => (a.bidSum > b.bidSum ? -1 : 1));
    console.log(bidHistory);

    return bidHistory;
  }
}
