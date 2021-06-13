import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Feature } from '@data-story-org/core'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
	console.log(new Feature())
    return "hiya"
  }
}
