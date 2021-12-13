import { Posts } from './posts'
import { GetComment } from './getcomment'
export class PostComment {
  post: Posts
  comments: GetComment[] = []
}
