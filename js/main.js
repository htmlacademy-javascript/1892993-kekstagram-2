const NUMBER_TEMPLATES = 25;
const MESSAGE_COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const NAME_COMMENTS = [
  'Артем',
  'Сергей',
  'Арсений',
  'Генадий',
  'Инакентий',
  'Юсуф',
  'Таштимир',
];

const DESCRIPTION = [
  'Отдыхаю',
  'Загораю',
  'Подаю',
  'Уничтожаю',
  'Разжигаю',
  'Поминаю',
  'Оплакиваю',
];

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

function createRandomIdFromRangeGenerator (min, max) {
  const previousValues = [];

  return function () {
    let currentValue = getRandomInt(min, max);
    if (previousValues.length >= (max - min + 1)) {
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInt(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
};

const templateCommentsId = createRandomIdFromRangeGenerator(1, 500);

const templateComments = () => ({
  id: templateCommentsId(),
  avatar: `img/avatar-${getRandomInt(1, 6)}.svg`,
  message: MESSAGE_COMMENTS[getRandomInt(0, MESSAGE_COMMENTS.length - 1)],
  name: NAME_COMMENTS[0, NAME_COMMENTS.length - 1],
});


const templateProfile = (index) => ({
  id: ++index,
  url: `photos/${index}.jpg`,
  description: DESCRIPTION[getRandomInt(0, DESCRIPTION.length - 1)],
  likes: getRandomInt(15, 200),
  comments: Array.from({length: getRandomInt(1, 2)}, templateComments)
});

const templateProfiles = Array.from({length: NUMBER_TEMPLATES}, (_, index) => templateProfile(index));
