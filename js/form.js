import { isEscapeKey } from './util.js';
import { uploadImageElement } from './upload-image.js';
import { ininScaleControl, destroyScaleControl } from './scale-control.js';
import { initEffects, destroyEffects } from './effect-image.js';

const imgOploadOverlay = document.querySelector('.img-upload__overlay');
const cancelButton = document.querySelector('#upload-cancel');
export const loadingPicture = document.querySelector('.img-upload__preview img');
const uploadForm = document.querySelector('.img-upload__form');
const hashtagField = document.querySelector('.text__hashtags');
const commentField = document.querySelector('.text__description');
const submitButton = document.querySelector('.img-upload__submit');

const TAG_COUNT_MAX = 5;
const TAG_PATTERN = /^#[a-zа-яё0-9]{1,19}$/i;

const ErrorMessage = {
  BAD_HASHTAGS_LENGTH: 'Ограничение поля - до 5 комментариев. Исправьте количество тегов.',
  BAD_PATTERN: 'Тег начинается с #. Внутри только латинские буквы, кириллица и числа.',
  BAD_UNIQUE_TAGS: 'Ваши теги повторяются. Проверьте уникальность каждого.',
};

let isHashtagFieldOrCommentFieldFocus = false;

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error',
  errorTextParent: 'img-upload__field-wrapper',
});

const isValidTag = (tag) => TAG_PATTERN.test(tag);

const hasUniqueTags = (tags) => {
  const lowerCaseTags = tags.map((tag) => tag.toLowerCase());
  return lowerCaseTags.length === new Set(lowerCaseTags).size;
};

const isValidTagsLength = (tags) => tags.length <= TAG_COUNT_MAX;

const removeEmptyTags = (tags) => tags.trim().split(' ').filter((tag) => tag.trim().length);

const validateTagsPattern = (value) => removeEmptyTags(value).every(isValidTag);
const validateTagsLength = (value) => isValidTagsLength(removeEmptyTags(value));
const validateUniqueTags = (value) => hasUniqueTags(removeEmptyTags(value));

const onCancelButtonClick = (evt) => {
  evt.preventDefault();

  destroyForm();
};

export const onDocumentEscKeydown = (evt) => {
  if (isEscapeKey(evt) && !isHashtagFieldOrCommentFieldFocus) {
    destroyForm();
  }
};

const onHashtagFieldBlur = () => {
  isHashtagFieldOrCommentFieldFocus = false;
  hashtagField.removeEventListener('blur', onHashtagFieldBlur);
};

const onCommentFieldBlur = () => {
  isHashtagFieldOrCommentFieldFocus = false;
  commentField.removeEventListener('blur', onCommentFieldBlur);
};

const onHashtagFieldFocus = () => {
  isHashtagFieldOrCommentFieldFocus = true;
  hashtagField.addEventListener('blur', onHashtagFieldBlur);
};

const onCommentFieldFocus = () => {
  isHashtagFieldOrCommentFieldFocus = true;
  commentField.addEventListener('blur', onCommentFieldBlur);
};

const openForm = (file) => {
  if (file) {
    loadingPicture.src = URL.createObjectURL(file);
  }
  imgOploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
};

const closeForm = () => {
  imgOploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
};

export const removeFormListeners = () => {
  cancelButton.removeEventListener('click', onCancelButtonClick);
  document.removeEventListener('keydown', onDocumentEscKeydown);
  submitButton.disabled = true;
};

export const addFormListeners = () => {
  cancelButton.addEventListener('click', onCancelButtonClick);
  document.addEventListener('keydown', onDocumentEscKeydown);
  submitButton.disabled = false;
};

export function destroyForm () {
  closeForm();
  destroyScaleControl();
  destroyEffects();
  pristine.reset();
  uploadForm.reset();

  uploadImageElement.value = '';

  cancelButton.removeEventListener('click', onCancelButtonClick);
  document.removeEventListener('keydown', onDocumentEscKeydown);
  hashtagField.removeEventListener('focus', onHashtagFieldFocus);
  commentField.removeEventListener('focus', onCommentFieldFocus);

  isHashtagFieldOrCommentFieldFocus = false;
}

pristine.addValidator(hashtagField, validateTagsPattern, ErrorMessage.BAD_PATTERN);
pristine.addValidator(hashtagField, validateUniqueTags, ErrorMessage.BAD_UNIQUE_TAGS);
pristine.addValidator(hashtagField, validateTagsLength, ErrorMessage.BAD_HASHTAGS_LENGTH);

export const initForm = (file) => {
  openForm(file);
  ininScaleControl();
  initEffects();

  submitButton.disabled = false;

  cancelButton.addEventListener('click', onCancelButtonClick);
  document.addEventListener('keydown', onDocumentEscKeydown);
  hashtagField.addEventListener('focus', onHashtagFieldFocus);
  commentField.addEventListener('focus', onCommentFieldFocus);
};

export const setOnFormSubmit = (cb) => {
  uploadForm.addEventListener ('submit', async (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();

    if (isValid) {
      submitButton.disabled = true;

      await cb(new FormData(uploadForm));
    }
  });
};
