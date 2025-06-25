import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { PostsService } from './posts.service';

/**
 * author: string;
 * title: string;
 * content: string;
 * likeCount: number;
 * commentCount: number;
 */

interface PostModel {
  id: number;
  author: string;
  title: string;
  content: string;
  likeCount: number;
  commentCount: number;
}

let posts: PostModel[] = [
  {
    id: 1,
    author: 'wisoft',
    title: 'WiSoft Lab',
    content: 'Hello',
    likeCount: 100000,
    commentCount: 999999,
  },
  {
    id: 2,
    author: 'wisoft 1',
    title: 'WiSoft Lab~~',
    content: 'Hello',
    likeCount: 100000,
    commentCount: 999999,
  },
  {
    id: 3,
    author: 'wisoft 2',
    title: 'WiSoft Lab ~~',
    content: 'Hello',
    likeCount: 100000,
    commentCount: 999999,
  },
];

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  /**
   // 1) GET /posts         모든 post를 가져온다.

   // 2) GET /posts/:id     id에 해당되는 post를 가져온다.

   // 3) POST /posts        post를 생성한다.

   // 4) PUT /posts/:id     id에 해당되는 post를 변경한다.

   // 5)_DELETE /posts/:id  id에 해당하는 post를 삭제한다.
   */
  @Get()
  getPosts() {
    return posts;
  }

  @Get(':id')
  getPost(
    @Param('id')
    id: string,
  ) {
    const post = posts.find((post) => post.id === +id);

    if (!post) {
      throw new NotFoundException();
    }

    return post;
  }

  @Post()
  postPost(
    @Body('author')
    author: string,
    @Body('title')
    title: string,
    @Body('content')
    content: string,
  ) {
    const post: PostModel = {
      id: posts[posts.length - 1].id + 1,
      author,
      title,
      content,
      likeCount: 0,
      commentCount: 0,
    };

    posts = [...posts, post];

    return post;
  }

  @Put(':id')
  putPost(
    @Param('id')
    id: string,
    @Body('author')
    author?: string,
    @Body('title')
    title?: string,
    @Body('content')
    content?: string,
  ) {
    const post = posts.find((post) => post.id === +id);

    if (!post) {
      throw new NotFoundException();
    }
    if (author) {
      post.author = author;
    }

    if (title) {
      post.title = title;
    }

    if (content) {
      post.content = content;
    }

    posts = posts.map((prevPost) => (prevPost.id === +id ? post : prevPost));

    return post;
  }

  @Delete(':id')
  deletePost(
    @Param('id')
    id: string,
  ) {
    const post = posts.find((post) => post.id === +id);

    if (!post) {
      throw new NotFoundException();
    }

    posts = posts.filter((post) => post.id !== +id);

    return id;
  }
}
