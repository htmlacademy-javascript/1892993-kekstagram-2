import { addFormListeners } from './form.js';

export const isEscapeKey = (evt) => evt.key === 'Escape';

const elementDataError = document.querySelector('#data-error')
  .content
  .querySelector('.data-error');
const elementFormError = document.querySelector('#error')
  .content
  .querySelector('.error');
const elementFormSuccess = document.querySelector('#success')
  .content
  .querySelector('.success');
const body = document.querySelector('body');

const ALERT_SHOW_TIME = 5000;
const TIMEOUT_DELAY = 500;

export const showDataError = () => {
  const dataError = elementDataError.cloneNode(true);

  body.appendChild(dataError);

  setTimeout(() => {
    dataError.remove();
  }, ALERT_SHOW_TIME);
};

const isErrorInnerFocused = (evt) =>{
  const errorInner = document.querySelector('.error__inner');
  return errorInner.contains(evt.target);
};

export const showErrorMessage = () => {
  const formError = elementFormError.cloneNode(true);
  const errorButton = formError.querySelector('.error__button');

  const onDocumentErrorClick = (evt) => {
    if (!isErrorInnerFocused(evt)) {
      destroyHandlersError();
      addFormListeners();
    }
  };

  const onErrorButtonClick = () => {
    destroyHandlersError();
    addFormListeners();
  };

  const onErrorButtonKeydown = (evt) => {
    if(isEscapeKey(evt)) {
      destroyHandlersError();
      addFormListeners();
    }
  };

  errorButton.addEventListener('click', onErrorButtonClick);
  document.addEventListener('keydown', onErrorButtonKeydown);
  document.body.addEventListener('click', onDocumentErrorClick);

  function destroyHandlersError () {
    formError.remove();
    errorButton.removeEventListener('click', onErrorButtonClick);
    document.removeEventListener('keydown', onErrorButtonKeydown);
    document.body.removeEventListener('click', onDocumentErrorClick);
  }

  body.appendChild(formError);
};

const isSuccessInnerFocused = (evt) => {
  const successInner = document.querySelector('.success__inner');
  return successInner.contains(evt.target);
};

export const showSuccessMessage = () => {
  const formSuccess = elementFormSuccess.cloneNode(true);
  const successButton = formSuccess.querySelector('.success__button');

  const onDocumentSuccessClick = (evt) => {
    if (!isSuccessInnerFocused(evt)) {
      destroyHandlersSucces();
    }
  };

  const onSuccessButtonClick = () => {
    destroyHandlersSucces();
  };

  const onSuccessButtonKeydown = (evt) => {
    if(isEscapeKey(evt)) {
      destroyHandlersSucces();
    }
  };

  successButton.addEventListener('click', onSuccessButtonClick);
  document.addEventListener('keydown', onSuccessButtonKeydown);
  document.body.addEventListener('click', onDocumentSuccessClick);

  function destroyHandlersSucces () {
    formSuccess.remove();
    successButton.removeEventListener('click', onSuccessButtonClick);
    document.removeEventListener('keydown', onSuccessButtonKeydown);
    document.body.removeEventListener('click', onDocumentSuccessClick);
  }

  body.appendChild(formSuccess);
};

export const debounce = (callback, timeoutDelay = TIMEOUT_DELAY) => {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};
