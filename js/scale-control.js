import { loadingPicture } from './form.js';

const buttonScaleControlSmall = document.querySelector('.scale__control--smaller');
const buttonScaleControlBigger = document.querySelector('.scale__control--bigger');
const scaleValue = document.querySelector('.scale__control--value');

const Scale = {
  shift: 25,
  maxValue: 100,
  minValue: 25,
};

const onButtonScaleControlSmallClick = () => {
  const currentScaleValue = +(scaleValue.value.match(/\d+/g).join(''));

  if (currentScaleValue === Scale.minValue) {
    return;
  }
  scaleValue.value = `${currentScaleValue - Scale.shift}%`;
  loadingPicture.style.transform = `scale(${scaleValue.value})`;
};

const onButtonScaleControlBiggerClick = () => {
  const currentScaleValue = +(scaleValue.value.match(/\d+/g).join(''));

  if (currentScaleValue === Scale.maxValue) {
    return;
  }
  scaleValue.value = `${currentScaleValue + Scale.shift}%`;
  loadingPicture.style.transform = `scale(${scaleValue.value})`;
};

export function destroyScaleControl () {
  loadingPicture.style.transform = `scale(${Scale.maxValue}%)`;
  scaleValue.value = `${Scale.maxValue}%`;

  buttonScaleControlBigger.removeEventListener('click', onButtonScaleControlBiggerClick);
  buttonScaleControlSmall.removeEventListener('click', onButtonScaleControlSmallClick);
}

export const ininScaleControl = () => {
  buttonScaleControlBigger.addEventListener('click', onButtonScaleControlBiggerClick);
  buttonScaleControlSmall.addEventListener('click', onButtonScaleControlSmallClick);
};

