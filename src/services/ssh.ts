import * as Client from 'ssh2-sftp-client';

import SSH2Promise = require('ssh2-promise');
import { IServerConfigModel } from '../models';

export const checkConnection = async(config: IServerConfigModel): Promise<boolean> => {
  if (!config.port) config.port = 22;
  const sftp = new Client();
  try {
    await sftp.connect(config);
    sftp.end();
    return true;
  } catch (e) {
    return false;
  }
};

export const test = async() => {
  const config = {
    host: '104.251.214.168',
    username: 'root',
    password: '',
    port: 22,
  };

  // const ssh: any = new SSH2Promise(config);

  const bufferToString = (buffer: Buffer) => {
    if (buffer instanceof Buffer) {
      const json = JSON.stringify(buffer);
      const bufferOriginal = Buffer.from(JSON.parse(json).data);
      return bufferOriginal.toString('utf8');
    } else {
      console.log('ELEMENT NOT BUFFER');
      return buffer;
    }
  };

  // try {
  //   const data = await ssh.exec('ls /etc/nginx/sites-available');
  //   res.send(data);
  //   const sftp = await ssh.sftp();
  //   // const sftpData = await sftp.opendir('~/projects/ellevate/package.json');
  //   // const x = await sftp.createReadStream('/root/projects/ellevate/package.json');
  //   // console.log(x);
  //   // res.send();
  // } catch (error) {
  //   console.log('error', bufferToString(error));
  // }

  const sftp = new Client();
  await sftp.connect(config);
  const x = await sftp.list('/etc/nginx/sites-available');
  // res.send(x);
  // x.pipe(res);
  // fs.createReadStream(x).pipe(res);
};
