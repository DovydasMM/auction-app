import { Component, OnInit } from '@angular/core';
import { Auction } from './models/auction.model';
import { AuctionService } from './services/auction.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private auctionService: AuctionService) {}
  title = 'auction-app';

  auctionList: Auction[];

  ngOnInit(): void {
    this.auctionList = this.auctionService.getAuctionList();
    this.auctionService.auctionChanged.subscribe((changes) => {
      this.auctionList = changes;
      console.log(this.auctionList);
    });
  }
}
