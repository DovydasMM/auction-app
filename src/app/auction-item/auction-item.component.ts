import { Component, Input, OnInit } from '@angular/core';
import { interval, Subject, Subscription } from 'rxjs';
import { Auction } from '../models/auction.model';
import { AuctionUser } from '../models/auctionUser.model';
import { AuctionService } from '../services/auction.service';

@Component({
  selector: 'app-auction-item',
  templateUrl: './auction-item.component.html',
  styleUrls: ['./auction-item.component.css'],
})
export class AuctionItemComponent implements OnInit {
  constructor(private auctionService: AuctionService) {}

  @Input() auctionItem: Auction;
  @Input() auctionUser: AuctionUser;

  timer: any = 25;
  subscription: Subscription;
  auctionStared = false;

  ngOnInit(): void {
    if (this.auctionItem.status == 'active') {
      this.timer = this.auctionService.getTimeDif(this.auctionItem);
      this.startTimer();
    }
  }

  startAuction() {
    this.auctionService.startAuction(this.auctionItem);
    this.startTimer();
  }

  startTimer() {
    this.subscription = interval(1000).subscribe((x) => {
      let currentTime = new Date().getTime();
      this.timer = ((this.auctionItem.endDate - currentTime) / 1000).toFixed(0);
      if (this.timer <= 0) {
        this.auctionService.endOfAuction(this.auctionItem);
        this.subscription.unsubscribe();
        return;
      }
    });
  }

  bidAuction() {
    this.auctionService.bidOnAuction(this.auctionUser, this.auctionItem);
  }
}
