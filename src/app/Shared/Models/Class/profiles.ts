import { IProfiles } from "../Interface/iprofiles";

export class Profiles implements IProfiles {
    username: string;
    firstName: string;
    lastName: string;
    description: string;
    photo: any;
    follower: any;
    followed: any;
    postCount: any;
    isFollow: boolean;
}
