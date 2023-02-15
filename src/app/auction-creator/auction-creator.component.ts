import { AuctionService } from './../services/auction.service';
import { Component, Input, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuctionUser } from '../models/auctionUser.model';

@Component({
  selector: 'app-auction-creator',
  templateUrl: './auction-creator.component.html',
  styleUrls: ['./auction-creator.component.css'],
})
export class AuctionCreatorComponent {
  @ViewChild('f', { static: false }) auctionForm: NgForm;
  @Input() auctionUser: AuctionUser;
  constructor(private auctionService: AuctionService) {}

  onSubmit() {
    let auctionName = this.auctionForm.value.auctionName;
    let auctionDescription = this.auctionForm.value.auctionDesc;
    let auctionOwner = this.auctionUser;
    this.auctionService.createAuction(
      auctionName,
      auctionDescription,
      auctionOwner
    );
    this.auctionForm.reset();
  }
}
