import { Node, Feature } from '@data-story-org/core';
import axios from 'axios';

export class BitcoinPriceNode extends Node {
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
