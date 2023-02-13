import { Auction } from './auction.model';

export class AuctionUser {
  constructor(
    public userName: string,
    public userBids: Auction[],
    public userAuctions: Auction[]
  ) {}
}
