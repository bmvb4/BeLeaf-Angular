import { IGetComment } from '../Interface/igetcomment'

export class GetComment implements IGetComment {
  isEdit: boolean // only UI
  commentText: String
  idUser: String
  idPost: any
  idComment: any
  userPhoto: any
}
