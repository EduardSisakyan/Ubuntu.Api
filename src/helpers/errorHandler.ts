import { Response, Request } from 'express';
import * as Slack from 'slack-node';
import chalk from 'chalk';

import config from '../config';

const slack = new Slack();
slack.setWebhook(config.slackWebhookUrl);

export const sendToSlack = (err, req: Request, res: Response) => {
  const url: string = req ? req.protocol + '://' + req.get('host') + req.originalUrl : '';

  // slack.webhook({
  //   channel : '#ideal-bot',
  //   username: 'idealBot',
  //   attachments: [
  //     {
  //       color: '#ff0000',
  //       title: `Error ${url}`,
  //       text: err.stack,
  //     }
  //   ]
  // }, (err, response) => {
  //   console.log(chalk.yellow(`Error message sent to slack \nSlack's response: ${response.response}`));
  // });
  res.sendStatus(500);
  console.log(err.stack);
};
