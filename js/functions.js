const getMinute = (time) => {
  const sTime = time.split(':');

  return +sTime[0] * 60 + +sTime[1];
};

const getTime = (startTime, endTime, meeting, meetingTime) => {
  const s = getMinute(startTime);
  const e = getMinute(endTime);
  const m = getMinute(meeting);

  return s <= m && (m + meetingTime) <= e;
};


console.log(getTime('8:00', '17:30', '08:00', 900));

/*
'8:00' - начало рабочего дня
'17:30' - конец рабочего дня
'14:00' - начало встречи
90 - продолжительность встречи в минутах
*/
// имяФункции('08:00', '17:30', '14:00', 90); // true
// имяФункции('8:0', '10:0', '8:0', 120);     // true
// имяФункции('08:00', '14:30', '14:00', 90); // false
// имяФункции('14:00', '17:30', '08:0', 90);  // false
// имяФункции('8:00', '17:30', '08:00', 900); // false
