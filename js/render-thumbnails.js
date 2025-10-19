import { initBigPicture } from './big-picture.js';

const sectionPictures = document.querySelector('.pictures');
const elementPicture = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const fragment = document.createDocumentFragment();
let pictures = [];

const renderThumbnail = ({url, description, likes, comments, id}) => {
  const picture = elementPicture.cloneNode(true);
  const pictureImg = picture.querySelector('.picture__img');
  const pictureLikes = picture.querySelector('.picture__likes');
  const pictureComments = picture.querySelector('.picture__comments');

  picture.dataset.id = id;
  pictureImg.src = url;
  pictureImg.alt = description;
  pictureLikes.textContent = likes;
  pictureComments.textContent = comments.length;
  fragment.appendChild(picture);
  sectionPictures.appendChild(fragment);
};

const onPicturesContainerClick = (evt) => {
  const targetPictureElement = evt.target.closest('.picture');

  if (targetPictureElement) {
    const targetPictureId = targetPictureElement.dataset.id;
    const targetPictureData = pictures.find((picture) => picture.id === +targetPictureId);
    evt.preventDefault();

    initBigPicture(targetPictureData);
  }
};

const addClickHandlerToContainer = () => {
  sectionPictures.addEventListener('click', onPicturesContainerClick);
};

export const initThumbnail = (data) => {
  pictures = data.slice();

  addClickHandlerToContainer();

  pictures.forEach((element) => renderThumbnail(element));
};
