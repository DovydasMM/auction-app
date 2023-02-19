import { AuctionCreatorComponent } from './auction-creator/auction-creator.component';
import { PostsService } from './services/posts.service';
import { Component, OnInit } from '@angular/core';
import { Auction } from './models/auction.model';
import { AuctionUser } from './models/auctionUser.model';
import { AuctionService } from './services/auction.service';
import { UserService } from './services/user.service';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(
    private auctionService: AuctionService,
    private userService: UserService,
    private postService: PostsService,
    private dialog: MatDialog
  ) {}
  title = 'auction-app';

  auctionList: Auction[];
  activeList: Auction[];
  userList: AuctionUser[];
  currentUser: AuctionUser;
  currentMenu: string = 'activeAuctions';
  userIcon = faUser;

  ngOnInit(): void {
    this.auctionList = this.auctionService.getAuctionList();
    this.auctionService.auctionChanged.subscribe((changes) => {
      this.auctionList = changes;
    });
    this.userList = this.userService.getUsers();
    this.currentUser = this.userList[0];

    this.postService.fetchPost().subscribe((resData) => {
      this.auctionService.importAuctions(resData);
      this.userList = this.userService.getUsers();
      this.activeList = this.auctionService.getActiveAuctions();
    });
  }

  changeUser(user: AuctionUser) {
    this.currentUser = user;
    this.changeMenu('activeAuctions');
  }

  changeMenu(menu: string) {
    this.currentMenu = menu;
    this.activeList = this.auctionService.getActiveAuctions();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AuctionCreatorComponent, {
      data: { auctionUser: this.currentUser },
    });
  }
}
