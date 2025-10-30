import { templateProfiles } from './data.js';
import { initThumbnail } from './render-thumbnails.js';
import { initUploadImage } from './upload-image.js';

initThumbnail(templateProfiles);
initUploadImage();

