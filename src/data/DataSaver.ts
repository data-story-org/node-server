import fs from 'fs';
import { DataDonwloadFunction } from '@data-story-org/core';
import { dataStoryDataPath } from 'src/utils';
import path from 'path';

export const DataSaver: DataDonwloadFunction = async ({
  data,
  fileName,
  fileExtension,
}) => {
  if (!fs.existsSync(dataStoryDataPath)) {
    fs.mkdirSync(dataStoryDataPath, { recursive: true });
  }
  const filePath = path.join(dataStoryDataPath, `${fileName}.${fileExtension}`);

  fs.writeFile(filePath, data, { flag: 'wx' }, (err) => {
    console.log(err);
  });
};
