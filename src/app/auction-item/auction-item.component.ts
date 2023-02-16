import { UserService } from './../services/user.service';
import { Component, DoCheck, Input, OnInit } from '@angular/core';
import { interval, Subject, Subscription } from 'rxjs';
import { Auction } from '../models/auction.model';
import { AuctionUser } from '../models/auctionUser.model';
import { AuctionService } from '../services/auction.service';
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-auction-item',
  templateUrl: './auction-item.component.html',
  styleUrls: ['./auction-item.component.css'],
})
export class AuctionItemComponent implements OnInit {
  constructor(
    private auctionService: AuctionService,
    private userService: UserService
  ) {}

  @Input() auctionItem: Auction;
  @Input() auctionUser: AuctionUser;

  timer;
  subscription: Subscription;
  auctionStared = false;
  arrowRight = faArrowRight;
  arrowLeft = faArrowLeft;
  showAuctionInfo = false;
  auctionHistory = [];

  ngOnInit(): void {
    //On auction changes restarts timers, so it syncs up.
    this.auctionService.auctionChanged.subscribe((auctionData) => {
      if (this.subscription && this.auctionItem.status == 'active') {
        this.subscription.unsubscribe();
        this.startTimer();
      } else if (!this.subscription && this.auctionItem.status == 'active') {
        this.startTimer();
      }
    });
    //If auction is active, starts the timer on init.
    if (this.auctionItem.status == 'active') {
      this.startTimer();
    }
  }

  startAuction() {
    this.auctionService.startAuction(this.auctionItem);
  }

  startTimer() {
    this.timer = this.auctionService.getTimeDif(this.auctionItem);

    this.subscription = interval(1000).subscribe((x) => {
      let currentTime = new Date().getTime();
      this.timer = ((this.auctionItem.endDate - currentTime) / 1000).toFixed(0);
      if (this.timer <= 0) {
        console.log(this.timer);
        this.auctionService.endOfAuction(this.auctionItem);
        this.subscription.unsubscribe();
      }
    });
  }

  bidAuction() {
    this.auctionService.bidOnAuction(this.auctionUser, this.auctionItem);
    this.auctionHistory = this.auctionService.getBidHistory(this.auctionItem);
  }

  showInfo() {
    this.auctionHistory = this.auctionService.getBidHistory(this.auctionItem);
    this.showAuctionInfo = !this.showAuctionInfo;
  }
}
