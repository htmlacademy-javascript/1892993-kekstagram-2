import { getRandomInt, createRandomIdFromRangeGenerator } from './util.js';
import { MESSAGE_COMMENTS, NAME_COMMENTS, DESCRIPTION, NUMBER_TEMPLATES } from './const.js';

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
  comments: Array.from({length: getRandomInt(1, 10)}, templateComments)
});

export const templateProfiles = Array.from({length: NUMBER_TEMPLATES}, (_, index) => templateProfile(index));
