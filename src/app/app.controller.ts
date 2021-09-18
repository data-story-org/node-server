import { Controller, Get, Post, Body } from '@nestjs/common';
import { Feature, BootPayload } from '@data-story-org/core';
import { stringify } from 'flatted';

import { DataStoryService } from 'src/dataStory/dataStory.service';
import {RunDiagramDTO} from './dto'

@Controller()
export class AppController {
  constructor(private dataStoryService: DataStoryService) {}

  @Get()
  getHello(): string {
    const f = new Feature('Greetings!');
    return f.original as string;
  }

  @Post('boot')
  async postBoot(): Promise<BootPayload> {
    return await this.dataStoryService.boot();
  }

  @Post('run')
  async postRun(@Body() runDiagramDTO: RunDiagramDTO): Promise<string> {
    return stringify(await this.dataStoryService.run(runDiagramDTO.model));
  }
}
