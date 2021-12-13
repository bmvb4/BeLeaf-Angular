import { IGetComment } from '../Interface/igetcomment'

export class GetComment implements IGetComment {
  commentText: String
  idUser: String
  idPost: any
  idComment: any
  userPhoto: any
}
