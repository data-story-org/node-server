import { Injectable } from '@nestjs/common';
import { BootPayload, Server, SerializedDiagram } from '@data-story-org/core';
import { DataSaver } from './DataSaver';
import { BitcoinPriceNode } from './nodes';
import { Cron, CronExpression } from '@nestjs/schedule'

type RunResult = any;

@Injectable()
export class DataStoryService {
  private readonly storyServer: Server = new Server(
    {},
    {
      downloaderFunction: DataSaver,
    },
  );
  private diagramModel: SerializedDiagram;

  async boot(): Promise<BootPayload> {
    return await this.storyServer.boot([BitcoinPriceNode]);
  }

  @Cron(CronExpression.EVERY_5_SECONDS, {
    name: 'automatic diagram runing'
  })
  async run(model: SerializedDiagram): Promise<RunResult> {
    if (model) {
       this.diagramModel = model;
    }
    return await this.storyServer.run(model ?? this.diagramModel);
  }
}
