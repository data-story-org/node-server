import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import {
  Feature,
  BootPayload,
  Server,
  SerializedDiagram,
  Node,
} from '@data-story-org/core';
import { stringify } from 'flatted';

export class RunDiagramDTO {
  model: SerializedDiagram;
}

class CustomInspectNode extends Node {
  constructor(options = {}) {
    super({
      // Defaults
      name: 'CustomInspectNode',
      summary: 'Display features in a table',
      category: 'Workflow',
      defaultInPorts: ['Input'],
      defaultOutPorts: [],
      // Explicitly configured
      ...options,
    });
  }

  async run() {
    this.features = this.input();
  }
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
    const bootData = await this.storyServer.boot([CustomInspectNode]);

    return bootData;
  }

  @Post('run')
  async postRun(@Body() runDiagramDTO: RunDiagramDTO): Promise<string> {
    const runResult = await this.storyServer.run(runDiagramDTO.model);
    return stringify(runResult);
  }
}
