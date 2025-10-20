const DRAWING_COMMENTS = 5;

const bigPictureCommentsContainer = document.querySelector ('.social__comments');
const commentsLoader = document.querySelector ('.comments-loader');
const commentCountContainer = document.querySelector('.social__comment-count');
const commentsCount = document.querySelector('.social__comment-total-count');
const commentsCurrentCount = document.querySelector('.social__comment-shown-count');
const socialCommentTemplate = document.querySelector('.social__comment');

let comments = [];
let countShownComments = 0;

const getCommentTemplate = ({avatar, name, message}) => {
  const socialComment = socialCommentTemplate.cloneNode(true);

  socialComment.querySelector('.social__picture').src = avatar;
  socialComment.querySelector('.social__picture').alt = name;
  socialComment.querySelector('.social__text').textContent = message;

  return socialComment;
};

const renderComments = () => {
  const commentFragment = document.createDocumentFragment();

  countShownComments += DRAWING_COMMENTS;
  if (countShownComments >= comments.length) {
    commentsLoader.classList.add('hidden');
    countShownComments = comments.length;
  } else {
    commentsLoader.classList.remove('hidden');
  }
  bigPictureCommentsContainer.innerHTML = '';
  const currentСomments = comments.slice(0, countShownComments);
  currentСomments.forEach((comment) => commentFragment.append(getCommentTemplate(comment)));

  bigPictureCommentsContainer.append(commentFragment);

  if (countShownComments > 0) {
    commentsCount.textContent = comments.length;
    commentsCurrentCount.textContent = countShownComments;
  } else {
    commentCountContainer.innerHTML = '';
  }
};

const onCommentsLoaderClick = () => {
  renderComments();
};

export const initBigPictureComments = (data) => {
  comments = data.slice();
  renderComments();
  commentsLoader.addEventListener('click', onCommentsLoaderClick);
};

export const destroyBigPictureComments = () => {
  commentsLoader.removeEventListener('click', onCommentsLoaderClick);
  countShownComments = 0;
  comments = [];
};
