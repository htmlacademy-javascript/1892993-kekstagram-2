const sectionPictures = document.querySelector('.pictures');
const elementPicture = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const fragment = document.createDocumentFragment();
let thumbnails = [];

const renderThumbnail = (element) => {
  const picture = elementPicture.cloneNode(true);
  const pictureImg = picture.querySelector('.picture__img');
  const pictureLikes = picture.querySelector('.picture__likes');
  const pictureComments = picture.querySelector('.picture__comments');

  pictureImg.src = element.url;
  pictureImg.alt = element.description;
  pictureLikes.textContent = element.likes;
  pictureComments.textContent = element.comments.length;
  fragment.appendChild(picture);
  sectionPictures.appendChild(fragment);
};

export const initThumbnail = (data) => {
  thumbnails = data.slice();

  thumbnails.forEach((element) => renderThumbnail(element));
};
