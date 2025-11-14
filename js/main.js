
import { initUploadImage } from './upload-image.js';
import { getData, sendData } from './api.js';
import { showDataError, showErrorMessage, showSuccessMessage } from './util.js';
import { setOnFormSubmit, removeFormListeners, destroyForm } from './form.js';
import { initFilter } from './filter.js';


try {
  const gata = await getData();
  initFilter(gata);
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
