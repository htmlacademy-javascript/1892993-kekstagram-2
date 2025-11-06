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
      formError.remove();
      destroyHandlersError();
      addFormListeners();
    }
  };

  const onErrorButtonClick = () => {
    formError.remove();
    destroyHandlersError();
    addFormListeners();
  };

  const onErrorButtonKeydown = (evt) => {
    if(isEscapeKey(evt)) {
      formError.remove();
      destroyHandlersError();
      addFormListeners();
    }
  };

  errorButton.addEventListener('click', onErrorButtonClick);
  document.addEventListener('keydown', onErrorButtonKeydown);
  document.body.addEventListener('click', onDocumentErrorClick);

  function destroyHandlersError () {
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

  const onDocumentErrorClick = (evt) => {
    if (!isSuccessInnerFocused(evt)) {
      formSuccess.remove();
      destroyHandlersError();
    }
  };

  const onErrorButtonClick = () => {
    formSuccess.remove();
    destroyHandlersError();
  };

  const onErrorButtonKeydown = (evt) => {
    if(isEscapeKey(evt)) {
      formSuccess.remove();
      destroyHandlersError();
    }
  };

  successButton.addEventListener('click', onErrorButtonClick);
  document.addEventListener('keydown', onErrorButtonKeydown);
  document.body.addEventListener('click', onDocumentErrorClick);

  function destroyHandlersError () {
    successButton.removeEventListener('click', onErrorButtonClick);
    document.removeEventListener('keydown', onErrorButtonKeydown);
    document.body.removeEventListener('click', onDocumentErrorClick);
  }

  body.appendChild(formSuccess);
};
