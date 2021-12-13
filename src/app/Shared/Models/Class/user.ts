import { IUser } from "../Interface/iuser";

export class User implements IUser {
  username:string;
  password?:string;
  firstName:string;
  lastName:string;
  email:string;
  description:string;
  photo:any;
  accessToken:string;
  refreshToken:string;
}
