export interface IPosts {
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
  commentsCounter: number
  isEdit:boolean
  commentsExpanded: boolean // only for UI
}
