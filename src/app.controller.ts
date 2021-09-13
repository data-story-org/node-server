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
import axios from 'axios';

export class RunDiagramDTO {
  model: SerializedDiagram;
}

class BitcoinPriceNode extends Node {
  constructor(options = {}) {
    super({
      // Defaults
      name: 'BitcoinPriceNode',
      summary: 'fetches latest BTC price',
      category: 'Workflow',
      defaultInPorts: ['Input'],
      defaultOutPorts: ['Output'],
      // Explicitly configured
      ...options,
    });
  }

  async run() {
    const url = 'https://api.coingecko.com/api/v3/simple/price';

    const response = await axios.get(url, {
      params: {
        ids: 'bitcoin',
        vs_currencies: 'usd',
      },
    });

    this.output([
      ...this.input(),
      new Feature({ bitcoin: response.data.bitcoin }),
    ]);
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
    const bootData = await this.storyServer.boot([BitcoinPriceNode]);

    return bootData;
  }

  @Post('run')
  async postRun(@Body() runDiagramDTO: RunDiagramDTO): Promise<string> {
    const runResult = await this.storyServer.run(runDiagramDTO.model);
    return stringify(runResult);
  }
}
