import { AuctionService } from './../services/auction.service';
import { Component, Inject, Input, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuctionUser } from '../models/auctionUser.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-auction-creator',
  templateUrl: './auction-creator.component.html',
  styleUrls: ['./auction-creator.component.css'],
})
export class AuctionCreatorComponent {
  @ViewChild('f', { static: false }) auctionForm: NgForm;

  constructor(
    private auctionService: AuctionService,
    private dialogRef: MatDialogRef<AuctionCreatorComponent>,
    @Inject(MAT_DIALOG_DATA) private auctionUser: AuctionUser
  ) {}

  onSubmit() {
    if (this.auctionForm.valid) {
      let auctionOwner;
      for (const key in this.auctionUser) auctionOwner = this.auctionUser[key];

      let auctionName = this.auctionForm.value.auctionName;
      let auctionDescription = this.auctionForm.value.auctionDesc;
      this.auctionService.createAuction(
        auctionName,
        auctionDescription,
        auctionOwner
      );
      this.auctionForm.reset();
      this.dialogRef.close();
    } else {
      console.log('form invalid');
      console.log(this.auctionForm);
    }
  }
}
