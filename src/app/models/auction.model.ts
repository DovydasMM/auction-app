import { AuctionUser } from './auctionUser.model';

export class Auction {
  constructor(
    public auctionName: string,
    public auctionDescription: string,
    public auctionOwner: AuctionUser,
    public status: string,
    public highestBid: number,
    public highestBidder: any,
    public startDate: any,
    public endDate: any
  ) {}
}
