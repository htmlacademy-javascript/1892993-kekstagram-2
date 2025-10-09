const sectionPictures = document.querySelector('.pictures');

const templateThumbnail = ({url, description, likes, comments}) => `<a href="#" class="picture">
      <img class="picture__img" src="${url}" width="182" height="182" alt="${description}">
      <p class="picture__info">
        <span class="picture__comments">${comments.length}</span>
        <span class="picture__likes">${likes}</span>
      </p>
    </a>`;

const renderThumbnail = (data) => {
  let fragment = document.createDocumentFragment();

  data.forEach((thumbnail) => {
    fragment += templateThumbnail(thumbnail);
  });
  sectionPictures.insertAdjacentHTML('afterbegin', fragment);
};

export const initThumbnail = (data) => {
  renderThumbnail(data);
};
