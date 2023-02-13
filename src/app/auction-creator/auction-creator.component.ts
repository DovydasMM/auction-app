import { AuctionService } from './../services/auction.service';
import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-auction-creator',
  templateUrl: './auction-creator.component.html',
  styleUrls: ['./auction-creator.component.css'],
})
export class AuctionCreatorComponent {
  @ViewChild('f', { static: false }) auctionForm: NgForm;
  constructor(private auctionService: AuctionService) {}

  onSubmit() {
    let auctionName = this.auctionForm.value.auctionName;
    let auctionDescription = this.auctionForm.value.auctionDesc;
    this.auctionService.createAuction(auctionName, auctionDescription);
  }
}
