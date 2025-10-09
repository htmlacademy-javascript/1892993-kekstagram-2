const sectionPictures = document.querySelector('.pictures');
const elementPicture = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const fragment = document.createDocumentFragment();
let thumbnails = [];

const renderThumbnail = ({url, description, likes, comments}) => {
  const picture = elementPicture.cloneNode(true);
  const pictureImg = picture.querySelector('.picture__img');
  const pictureLikes = picture.querySelector('.picture__likes');
  const pictureComments = picture.querySelector('.picture__comments');

  pictureImg.src = url;
  pictureImg.alt = description;
  pictureLikes.textContent = likes;
  pictureComments.textContent = comments.length;
  fragment.appendChild(picture);
  sectionPictures.appendChild(fragment);
};

export const initThumbnail = (data) => {
  thumbnails = data.slice();

  thumbnails.forEach((element) => renderThumbnail(element));
};
