import { loadingPicture } from './form.js';

const Scale = {
  SHIFT: 25,
  MAX_VALUE: 100,
  MIN_VALUE: 25,
};

const buttonScaleControlSmall = document.querySelector('.scale__control--smaller');
const buttonScaleControlBigger = document.querySelector('.scale__control--bigger');
const scaleValue = document.querySelector('.scale__control--value');

const onButtonScaleControlSmallClick = () => {
  const currentScaleValue = +(scaleValue.value.match(/\d+/g).join(''));

  if (currentScaleValue === Scale.MIN_VALUE) {
    return;
  }
  scaleValue.value = `${currentScaleValue - Scale.SHIFT}%`;
  loadingPicture.style.transform = `scale(${scaleValue.value})`;
};

const onButtonScaleControlBiggerClick = () => {
  const currentScaleValue = +(scaleValue.value.match(/\d+/g).join(''));

  if (currentScaleValue === Scale.MAX_VALUE) {
    return;
  }
  scaleValue.value = `${currentScaleValue + Scale.SHIFT}%`;
  loadingPicture.style.transform = `scale(${scaleValue.value})`;
};

export function destroyScaleControl () {
  loadingPicture.style.transform = `scale(${Scale.MAX_VALUE}%)`;
  scaleValue.value = `${Scale.MAX_VALUE}%`;

  buttonScaleControlBigger.removeEventListener('click', onButtonScaleControlBiggerClick);
  buttonScaleControlSmall.removeEventListener('click', onButtonScaleControlSmallClick);
}

export const ininScaleControl = () => {
  buttonScaleControlBigger.addEventListener('click', onButtonScaleControlBiggerClick);
  buttonScaleControlSmall.addEventListener('click', onButtonScaleControlSmallClick);
};

