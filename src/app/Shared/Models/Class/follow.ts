import { IFollow } from "../Interface/ifollow";

export class Follow implements IFollow {
  idFollower: string;
  idFollowed: string;
}
