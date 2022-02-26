import { IToken } from "../Interface/itoken";

export class Token implements IToken {
  accessToken: string;
  refreshToken: string;
}
