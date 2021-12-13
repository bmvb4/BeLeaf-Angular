import { IPosts } from '../Interface/iposts'

export class Posts implements IPosts {
  commentsExpanded: boolean
  idPost: any
  photo: any
  description: string
  createDate: any
  deleteDate: any
  idUser: string
  userPhoto: any
  likesCounter: number
  isLiked: boolean
  isFollow: boolean
  commentsCounter: number //only UI
}
