import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { Feature } from '@data-story-org/core'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
	const f = new Feature('Greetings!')
    return f.original
  }

  @Post('boot')
  postBoot() {
    return {
      stories: [],
      availableNodes: [],
    };
  }
}
