import * as mongoose from 'mongoose';
import * as fs from 'fs';
import chalk from 'chalk';

import config from '../config';

import { IPagingResModel } from '../models';

export const isObjectId = (values: string[]): boolean => {
  let isObjectIdFlag: boolean = true;
  values.forEach(item => {
    if (!mongoose.Types.ObjectId.isValid(item)) {
      isObjectIdFlag = false;
    }
  });

  return isObjectIdFlag;
};

export const getCount = (object) => {
  return object
    .skip(0)
    .limit(0)
    .count()
    .exec();
};

export const pagination = async<T = any>(filters, obj): Promise<IPagingResModel<T>> => {
  filters.limit = filters.limit || 20;
  filters.offset = filters.offset || 0;
  const data: T[] = await obj;
  const count: number = await getCount(obj);

  return {
    itemCount : count,
    pageCount : Math.ceil(count / filters.limit),
    data      : data,
  };
};

export const longDate = date => {
	if (date) {
		const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
		const localDate = new Date(date);
		return `${localDate.getDate()} ${monthNames[localDate.getMonth()]} ${localDate.getFullYear()}`;
	}
};

export const shortDate = date => {
	if (date) {
		const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
		const localDate = new Date(date);
		return `${localDate.getDate()} ${monthNames[localDate.getMonth()]}`;
	}
};

const addZero = i => {
	if (i < 10) {
		i = '0' + i;
	}
	return i;
};

export const hoursDate = date => {
	if (date) {
    const d = new Date(date);
    const h = addZero(d.getHours());
    const m = addZero(d.getMinutes());
    return h + ':' + m;
  }
};

export const removeFile = (path: string): void => {
  const mediaPath = config.basePath + '\\upload\\';
  if (fs.existsSync(mediaPath + path)) {
    try {
      fs.unlinkSync(mediaPath + path);
    } catch (e) {
      console.log(chalk.blue(path) + ' ' + chalk.red('Error: EBUSY: resource busy or locked, unlink'));
    }
  } else {
    console.log(`${chalk.blue(path)} not found`);
  }
};

export const dynamicSort = (property: string) => {
  let sortOrder = 1;
  if (property[0] === '-') {
    sortOrder = -1;
    property = property.substr(1);
  }
  return (a, b) => {
    const result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
    return result * sortOrder;
  };
};
