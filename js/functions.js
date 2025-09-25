const getLengthStrong = (str, max) => str.length <= max;

const findPalindrome = (str) => {
  const sourceStr = str.replaceAll(' ', '').toLowerCase();
  const invertedStr = sourceStr.split('').reverse().join().replaceAll(',', '');

  return sourceStr === invertedStr;
};

const getNumber = (str) => {
  const arrStr = str.toString().split('');
  const numArr = arrStr.filter((item) => item.match(/\d+/g));

  return numArr.length === 0 ? NaN : +(numArr.join(''));
};
