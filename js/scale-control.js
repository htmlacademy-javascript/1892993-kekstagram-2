import { loadingPicture } from './form.js';

const buttonScaleControlSmall = document.querySelector('.scale__control--smaller');
const buttonScaleControlBigger = document.querySelector('.scale__control--bigger');
const scaleValue = document.querySelector('.scale__control--value');

const scale = {
  shift: 25,
  maxValue: 100,
  minValue: 25,
};

const onButtonScaleControlSmallClick = () => {
  const currentScaleValue = +(scaleValue.value.match(/\d+/g).join(''));

  if (currentScaleValue === scale.minValue) {
    return;
  }
  scaleValue.value = `${currentScaleValue - scale.shift}%`;
  loadingPicture.style.transform = `scale(${scaleValue.value})`;
};

const onButtonScaleControlBiggerClick = () => {
  const currentScaleValue = +(scaleValue.value.match(/\d+/g).join(''));

  if (currentScaleValue === scale.maxValue) {
    return;
  }
  scaleValue.value = `${currentScaleValue + scale.shift}%`;
  loadingPicture.style.transform = `scale(${scaleValue.value})`;
};

export function destroyScaleControl () {
  loadingPicture.style.transform = `scale(${scale.maxValue}%)`;
  scaleValue.value = `${scale.maxValue}%`;

  buttonScaleControlBigger.removeEventListener('click', onButtonScaleControlBiggerClick);
  buttonScaleControlSmall.removeEventListener('click', onButtonScaleControlSmallClick);
}

export const ininScaleControl = () => {
  buttonScaleControlBigger.addEventListener('click', onButtonScaleControlBiggerClick);
  buttonScaleControlSmall.addEventListener('click', onButtonScaleControlSmallClick);
};

