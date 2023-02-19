import { AuctionUser } from './../models/auctionUser.model';
import { Auction } from './../models/auction.model';
import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuctionService } from '../services/auction.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-auction-bid',
  templateUrl: './auction-bid.component.html',
  styleUrls: ['./auction-bid.component.css'],
})
export class AuctionBidComponent implements OnInit {
  constructor(
    private auctionService: AuctionService,
    private dialogRef: MatDialogRef<AuctionBidComponent>,
    @Inject(MAT_DIALOG_DATA) private auctionInfo: any
  ) {}

  bidForm: FormGroup;

  ngOnInit(): void {
    this.bidForm = new FormGroup({
      bidSum: new FormControl(null, [
        Validators.required,
        this.higherBid.bind(this),
        this.minSum.bind(this),
      ]),
    });
  }

  onSubmit() {
    console.log(this.bidForm);

    if (this.bidForm.valid) {
      let newBid = this.bidForm.controls['bidSum'].value;
      let auctionItem = this.auctionInfo.auctionItem;
      let auctionUser = this.auctionInfo.auctionUser;
      this.auctionService.bidOnAuction(auctionUser, auctionItem, newBid);
      this.dialogRef.close();
    }
  }

  higherBid(control: FormControl) {
    if (control.value <= this.auctionInfo.auctionItem.highestBid) {
      return { bidIsLower: true };
    }
    return null;
  }

  minSum(control: FormControl) {
    if (control.value - this.auctionInfo.auctionItem.highestBid < 10) {
      return { smallIncrease: true };
    }
    return null;
  }
}
