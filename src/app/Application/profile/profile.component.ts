import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountServicesService } from 'src/app/Shared/account-services.service'
import { Follow } from 'src/app/Shared/Models/Class/follow';
import { GetComment } from 'src/app/Shared/Models/Class/getcomment';
import { Like } from 'src/app/Shared/Models/Class/like';
import { PostComment } from 'src/app/Shared/Models/Class/post-comment';
import { Profiles } from 'src/app/Shared/Models/Class/profiles';
import { User } from 'src/app/Shared/Models/Class/user';
import { Comment } from '../../Shared/Models/Class/comment'
import { IComment } from 'src/app/Shared/Models/Interface/icomment';
import { IFollow } from 'src/app/Shared/Models/Interface/ifollow';
import { IGetComment } from 'src/app/Shared/Models/Interface/igetcomment';
import { ILike } from 'src/app/Shared/Models/Interface/ilike';
import { IPosts } from 'src/app/Shared/Models/Interface/iposts';
import { IProfiles } from 'src/app/Shared/Models/Interface/iprofiles';
const USER_KEY: any = 'auth-user'
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  postsGet: IPosts[] = []
  commentsGet: IComment[] = []
  PostCommets: PostComment[] = []
  posts: any
  comments: any
  isLike: any
  UserId:string;
  userProfile: Profiles;
  page = 0
  isEditProfile = false;
  myUserCache: any = localStorage.getItem(USER_KEY)
  myUser: any =
    this.myUserCache !== null ? JSON.parse(this.myUserCache) : new User()
  constructor(private actRoute: ActivatedRoute, private apiService: AccountServicesService, private location: Location) {
    this.UserId = this.actRoute.snapshot.params.id;
   }

  ngOnInit(): void {
    console.log(this.UserId)
    this.apiService.GetUserProfile(this.UserId).subscribe(
      (resp) => {
        this.userProfile = <IProfiles>resp.body

      },
      (error) => {
        console.error(error)
        this.location.back()
      },
    )
    this.apiService.GetUserPost(this.UserId, this.page).subscribe(
      (resp) => {
        this.posts = <IPosts>resp.body
        this.posts.forEach((p: IPosts) => {
          if (p.photo.length >= 1) {
            this.postsGet.push(p)
            this.GetComments(p)
          }
        })
        console.log(this.postsGet)
      },
      (error) => {
        console.error(error)
      },
    )
  }
  GetComments(post: IPosts) {
    this.apiService.GetComments(post.idPost, 0).subscribe(
      (resp) => {
        this.comments = <IGetComment>resp.body
        var combinePost = new PostComment()
        combinePost.comments = this.comments
        combinePost.post = post
        this.PostCommets.push(combinePost)
        console.log('combined: ')
        console.log(this.PostCommets)
      },
      (error) => {
        console.error(error)
      },
    )
  }


  EditComment(comment: GetComment) {
    comment.isEdit = comment.isEdit == true ? false : true
    console.log(comment.commentText)
  }
  DeleteComment(comment: GetComment, postComments: PostComment) {
    console.log(comment)
    this.apiService.DeleteComment(comment).subscribe(
      (resp) => {
        postComments.post.commentsCounter -= 1
        postComments.comments = postComments.comments.filter(
          (item) => item.idComment !== comment.idComment,
        )
      },
      (error) => {
        console.error(error)
      },
    )
  }
  MakeComment(PostComment: PostComment, commentText: string) {
    var comment = new Comment()
    comment.commentText = commentText
    comment.idPost = PostComment.post.idPost
    comment.idUser = this.myUser.username
    this.apiService.MakeComment(comment).subscribe(
      (resp) => {
        PostComment.post.commentsCounter += 1
        var pushComment = new GetComment()
        pushComment.idComment = resp.body
        pushComment.commentText = commentText
        pushComment.idPost = PostComment.post.idPost
        pushComment.idUser = this.myUser.username
        pushComment.userPhoto = this.myUser.photo
        console.log(pushComment)
        PostComment.comments.push(pushComment)
      },
      (error) => {
        console.error(error)
      },
    )
  }
  like(post: IPosts) {
    console.log(post)
    var likes = new Like()
    likes.idPost = post.idPost
    likes.idUser = this.myUser.username
    console.log(likes)
    if (post.isLiked) {
      this.apiService.UnlikePost(likes).subscribe(
        (resp) => {
          console.log(resp.body)
          console.log(<ILike>resp.body)
          post.isLiked = false
          post.likesCounter -= 1
        },
        (error) => {
          console.error(error)
        },
      )
    } else {
      this.apiService.LikePost(likes).subscribe(
        (resp) => {
          console.log(resp.body)
          console.log(<ILike>resp.body)
          post.isLiked = true
          post.likesCounter += 1
        },
        (error) => {
          console.error(error)
        },
      )
    }
    console.log('double click')
    console.log(post)
  }
  followUser(post: IPosts) {
    console.log('Follow')
    var follow = new Follow()
    follow.idFollowed = post.idUser

    follow.idFollower = this.myUser.username
    console.log(follow)
    if (post.isFollow) {
      this.apiService.UnfollowPost(follow).subscribe(
        (resp) => {
          console.log(resp.body)
          console.log(<IFollow>resp.body)
          post.isFollow = false
        },
        (error) => {
          console.error(error)
        },
      )
    } else {
      this.apiService.FollowPost(follow).subscribe(
        (resp) => {
          console.log(resp.body)
          console.log(<IFollow>resp.body)
          post.isFollow = true
        },
        (error) => {
          console.error(error)
        },
      )
    }
    console.log('double click')
    console.log(post)
  }
  onScrollDown(ev: any) {
    console.log('scrolled down!!', ev)

    this.page += 1
    this.apiService.GetLastPost(this.page).subscribe(
      (resp) => {
        console.log(this.page)
        console.log(<IPosts>resp.body)
        const isGet = <IPosts>resp.body
        if (isGet.idUser === null) {
          this.page -= 1
        } else {
          this.posts = <IPosts>resp.body
          this.posts.forEach((p: IPosts) => this.postsGet.push(p))
        }
      },
      (error) => {
        console.error(error)
      },
    )
  }

  expandAccordion(post: IPosts): void {
    console.log(post.commentsExpanded)
    if (post.commentsExpanded) {
      post.commentsExpanded = false
    } else {
      post.commentsExpanded = true
    }
  }

  formatDate(date: string): Date {
    const formattedDate = new Date(date)
    const hoursOffset = -(new Date().getTimezoneOffset() / 60)

    formattedDate.setHours(formattedDate.getHours() + hoursOffset)

    return formattedDate
  }

}
