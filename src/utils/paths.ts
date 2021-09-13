import getPath from 'platform-folders';
import path from 'path';

export const dataPath = getPath('appData');
export const dataStoryDataPath = path.join(dataPath, 'DataStory');
