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
  auctionDuartion = 10;
  constructor(
    private userService: UserService,
    private postService: PostsService
  ) {}

  createAuction(auctionName, auctionDesc, auctionOwner) {
    let newAuction = new Auction(
      auctionName,
      auctionDesc,
      auctionOwner.userName,
      'inactive',
      0,
      'none',
      [],
      null,
      null
    );
    console.log(newAuction);
    this.auctionArray.push(newAuction);
    this.auctionChanged.next(this.auctionArray);
    this.userService.addUserAuction(auctionOwner, newAuction);
  }

  startAuction(auctionItem: Auction) {
    let startDate = new Date().getTime();
    let endDate = startDate + this.auctionDuartion * 1000;
    auctionItem.startDate = startDate;
    auctionItem.endDate = endDate;
    auctionItem.status = 'active';
    this.updateDatabase();
    this.auctionChanged.next(this.auctionArray);
  }

  bidOnAuction(currentUser: AuctionUser, auctionItem: Auction) {
    if (auctionItem.endDate != 0) {
      auctionItem.endDate += 10 * 1000;
      auctionItem.highestBid += 10;
      auctionItem.highestBidder = currentUser.userName;

      let newBid = {
        bidder: currentUser.userName,
        bidSum: auctionItem.highestBid,
      };
      console.log(auctionItem.bidHistory);
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
      this.updateDatabase();
      this.auctionChanged.next(this.auctionArray);
    }
  }

  endOfAuction(auctionItem: Auction) {
    auctionItem.status = 'ended';

    this.updateDatabase();
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

  getBidHistory(auctionItem: Auction) {
    let bidHistory = auctionItem.bidHistory;
    bidHistory.sort((a, b) => (a.bidSum > b.bidSum ? -1 : 1));
    return bidHistory;
  }

  updateDatabase() {
    this.postService.uploadPost(this.auctionArray).subscribe();
  }

  importAuctions(auctionData) {
    let newArray = [];
    auctionData.forEach((auctionItem) => {
      newArray.push(auctionItem);
    });
    this.auctionArray = newArray;
    this.userService.importAuctions(this.auctionArray);
    this.auctionChanged.next(this.auctionArray);
  }
}
