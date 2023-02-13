import { Injectable } from '@angular/core';
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
}
