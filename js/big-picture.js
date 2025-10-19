import { isEscapeKey } from './util.js';
import { initBigPictureComments, destroyBigPictureComments } from './comments.js';

const body = document.querySelector('body');
const bigPictureContainer = document.querySelector('.big-picture');
const bigPictureImg = bigPictureContainer.querySelector('.big-picture__img img');
const bigPictureLikes = bigPictureContainer.querySelector('.likes-count');
const bigPictureDescription = bigPictureContainer.querySelector('.social__caption');
const buttonCancel = document.querySelector('.big-picture__cancel');

const onDocumentEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    destroyBigPicture();
  }
};

const onButtonCancelClick = () => {
  bigPictureContainer.classList.add('hidden');
  body.classList.remove('modal-open');

  destroyBigPicture();
};

const addEventsHandlers = () => {
  document.addEventListener('keydown', onDocumentEscKeydown);
  buttonCancel.addEventListener('click', onButtonCancelClick);
};

const removeEventsHandlers = () => {
  document.removeEventListener('keydown', onDocumentEscKeydown);
  buttonCancel.removeEventListener('click', onButtonCancelClick);
};

const renderBigPicture = ({url, likes, description}) => {
  bigPictureImg.src = url;
  bigPictureLikes.innerText = likes;
  bigPictureDescription.innerText = description;
};

function destroyBigPicture () {
  bigPictureContainer.classList.add('hidden');
  body.classList.remove('modal-open');

  destroyBigPictureComments();
  removeEventsHandlers();
}

export const initBigPicture = (data) => {
  bigPictureContainer.classList.remove('hidden');
  body.classList.add('modal-open');

  renderBigPicture(data);
  initBigPictureComments(data.comments);
  addEventsHandlers();
};
