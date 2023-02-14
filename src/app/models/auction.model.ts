export class Auction {
  constructor(
    public auctionName: string,
    public auctionDescription: string,
    public auctionOwner: string,
    public status: string,
    public highestBid: number,
    public highestBidder: any,
    public startDate: any,
    public endDate: any
  ) {}
}
