import { Component, Input, OnInit } from '@angular/core';
import { interval, Subject, Subscription } from 'rxjs';
import { Auction } from '../models/auction.model';
import { AuctionService } from '../services/auction.service';

@Component({
  selector: 'app-auction-item',
  templateUrl: './auction-item.component.html',
  styleUrls: ['./auction-item.component.css'],
})
export class AuctionItemComponent implements OnInit {
  constructor(private auctionService: AuctionService) {}

  @Input() auctionItem: Auction;
  timer: any = 60;
  subscription: Subscription;
  auctionStared = false;

  ngOnInit(): void {}

  startAuction() {
    this.auctionService.startAuction(this.auctionItem);
    this.subscription = interval(1000).subscribe((x) => {
      if (this.timer == 0) {
        this.subscription.unsubscribe();
        return;
      }
      let currentTime = new Date().getTime();
      this.timer = ((this.auctionItem.endDate - currentTime) / 1000).toFixed(0);
    });
  }

  bidAuction() {
    this.auctionService.bidOnAuction(this.auctionItem);
  }
}
