import { INewPost } from "../Interface/inew-post";

export class NewPost implements INewPost {
  photo: any;
  description: string;
  idUser: string;
  tags: string[];
}
