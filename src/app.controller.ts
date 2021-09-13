import { Controller, Get, Post, Body } from '@nestjs/common';
import {
  Feature,
  BootPayload,
  Server,
  SerializedDiagram,
} from '@data-story-org/core';
import { stringify } from 'flatted';

import { AppService } from './app.service';
import { BitcoinPriceNode } from './nodes';
import { DataSaver } from './data/DataSaver';

export class RunDiagramDTO {
  model: SerializedDiagram;
}

@Controller()
export class AppController {
  storyServer: Server = new Server();

  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    const f = new Feature('Greetings!');
    return f.original as string;
  }

  @Post('boot')
  async postBoot(): Promise<BootPayload> {
    const bootData = await this.storyServer.boot([BitcoinPriceNode]);

    return bootData;
  }

  @Post('run')
  async postRun(@Body() runDiagramDTO: RunDiagramDTO): Promise<string> {
    const runResult = await this.storyServer.run(runDiagramDTO.model);
    return stringify(runResult);
  }
}
