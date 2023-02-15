import { Component, OnInit } from '@angular/core';
import { Auction } from './models/auction.model';
import { AuctionUser } from './models/auctionUser.model';
import { AuctionService } from './services/auction.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(
    private auctionService: AuctionService,
    private userService: UserService
  ) {}
  title = 'auction-app';

  auctionList: Auction[];
  activeList: Auction[];
  userList: AuctionUser[];
  currentUser: AuctionUser;
  currentMenu: string = 'activeAuctions';

  ngOnInit(): void {
    this.auctionList = this.auctionService.getAuctionList();
    this.auctionService.auctionChanged.subscribe((changes) => {
      this.auctionList = changes;
    });
    this.userList = this.userService.getUsers();
    this.currentUser = this.userList[0];
  }

  changeUser(user: AuctionUser) {
    this.currentUser = user;
    this.changeMenu('activeAuctions');
  }

  changeMenu(menu: string) {
    this.currentMenu = menu;
    this.activeList = this.auctionService.getActiveAuctions();
  }
}
