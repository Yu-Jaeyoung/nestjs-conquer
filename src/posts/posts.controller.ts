import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  /**
   // 1) GET /posts         모든 post를 가져온다.

   // 2) GET /posts/:id     id에 해당되는 post를 가져온다.

   // 3) POST /posts        post를 생성한다.

   // 4) PUT /posts/:id     id에 해당되는 post를 변경한다.

   // 5) DELETE /posts/:id  id에 해당하는 post를 삭제한다.
   */
  @Get()
  getPosts() {
    return this.postsService.getAllPosts();
  }

  @Get(':id')
  getPost(
    @Param('id')
    id: string,
  ) {
    return this.postsService.getPostById(+id);
  }

  @Post()
  postPost(
    @Body('authorId')
    authorId: number,
    @Body('title')
    title: string,
    @Body('content')
    content: string,
  ) {
    return this.postsService.createPost(authorId, title, content);
  }

  @Put(':id')
  putPost(
    @Param('id')
    id: string,
    @Body('title')
    title?: string,
    @Body('content')
    content?: string,
  ) {
    return this.postsService.updatePost(+id, title, content);
  }

  @Delete(':id')
  deletePost(
    @Param('id')
    id: string,
  ) {
    return this.postsService.deletePost(+id);
  }
}
