import * as path from 'path';

class Config {
  public env: string;
  public port: number;
  public basePath: string;
  public mediaPath: string;
  public slackWebhookUrl: string;
  public mongodb: string;
  public secretKey: string = 'jdcvhbshdfvbs';

  constructor() {
    this.env = process.env.NODE_ENV || 'development';
    this.port = +process.env.PORT || 8000;
    this.basePath = path.resolve(__dirname, '../../');
    this.mediaPath = path.resolve(this.basePath, 'media');
    this.mongodb = 'mongodb://localhost/ubuntu';
    this.slackWebhookUrl = 'https://hooks.slack.com/services/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';
  }
}

export default new Config();