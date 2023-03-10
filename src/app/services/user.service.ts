import { Injectable } from '@angular/core';
import { Auction } from '../models/auction.model';
import { AuctionUser } from '../models/auctionUser.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  userOne = new AuctionUser('User #1', [], []);
  userTwo = new AuctionUser('User #2', [], []);
  userThree = new AuctionUser('User #3', [], []);

  userArray = [this.userOne, this.userTwo, this.userThree];

  constructor() {}

  getUsers() {
    return this.userArray;
  }

  addUserAuction(currentUser: AuctionUser, newAuction: Auction) {
    currentUser.userAuctions.push(newAuction);
  }

  getUserBids(currentUser: AuctionUser) {
    return currentUser.userBids;
  }

  importAuctions(auctionArray: Auction[]) {
    //Fills userAuction array
    auctionArray.forEach((auction) => {
      let userIndex = this.userArray.findIndex(
        (user) => user.userName == auction.auctionOwner
      );
      this.userArray[userIndex].userAuctions.push(auction);
    });

    //Fills userBid array
    auctionArray.forEach((auction) => {
      let bidHistory = auction.bidHistory;
      bidHistory.forEach((bid) => {
        let bidderIndex = this.userArray.findIndex(
          (user) => user.userName == bid.bidder
        );
        this.userArray[bidderIndex].userBids.push(auction);
      });
    });
  }
}
