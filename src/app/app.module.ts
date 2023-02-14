import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AuctionCreatorComponent } from './auction-creator/auction-creator.component';
import { AuctionItemComponent } from './auction-item/auction-item.component';

@NgModule({
  declarations: [AppComponent, AuctionCreatorComponent, AuctionItemComponent],
  imports: [BrowserModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
