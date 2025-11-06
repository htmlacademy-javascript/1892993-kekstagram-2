
import { initThumbnail } from './render-thumbnails.js';
import { initUploadImage } from './upload-image.js';
import { getData, sendData } from './api.js';
import { showDataError, showErrorMessage, showSuccessMessage } from './util.js';
import { setOnFormSubmit, removeFormListeners, destroyForm } from './form.js';

try {
  const gata = await getData();
  initThumbnail(gata);
} catch {
  showDataError();
}

setOnFormSubmit(async (data) => {
  try {
    await sendData(data);
    destroyForm();
    showSuccessMessage();
  } catch {
    removeFormListeners();
    showErrorMessage();
  }
});


initUploadImage();

