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
    console.log(currentUser);
  }

  getUserBids(currentUser: AuctionUser) {
    return currentUser.userBids;
  }
}
