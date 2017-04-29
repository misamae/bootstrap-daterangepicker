/**
 * Created by meisam on 28/04/2017.
 */

const assert = require('assert');
const moment = require('moment-jalaali');

function generateCalendars(selectedDate) {
    if(selectedDate === null) return {};

    locale = {
        firstDay: 6
    };

    let calendar = {};

    calendar.month = selectedDate.jDate(2);
    let jMonth = calendar.month.jMonth();
    let jYear = calendar.month.jYear();
    let hour = calendar.month.hour();
    let minute = calendar.month.minute();
    let second = calendar.month.second();
    let jDaysInMonth = moment.jDaysInMonth(jYear, jMonth);
    let jFirstDay = selectedDate.clone().jDate(1);
    let jLastDay = selectedDate.clone().jDate(jDaysInMonth);

    let jLastMonth = moment(jFirstDay).subtract(1, 'month').jMonth();
    let jLastYear = moment(jFirstDay).subtract(1, 'month').jYear();
    let jDaysInLastMonth = moment.jDaysInMonth(jLastYear, jLastMonth);
    let jDayOfWeek = jFirstDay.day();

    console.log(`jMonth: ${jMonth}, 
    jYear: ${jYear}, 
    jDaysInMonth: ${jDaysInMonth}, 
    jFirstDay: ${jFirstDay.format(`jYYYY-jMM-jDD`)}, 
    jLastDay: ${jLastDay.format(`jYYYY-jMM-jDD`)},
    jLastMonth: ${jLastMonth},
    jLastYear: ${jLastYear},
    jDayOfWeek: ${jDayOfWeek}`);

    //initialize a 6 rows x 7 columns array for the calendar
    // var calendar = [];
    calendar.jFirstDay = jFirstDay;
    calendar.jLastDay = jLastDay;

    for (let i = 0; i < 6; i++) {
        calendar[i] = [];
    }

    //populate the calendar with date objects
    let jStartDay = jDaysInLastMonth - jDayOfWeek + locale.firstDay + 1;
    if (jStartDay > jDaysInLastMonth)
        jStartDay -= 7;

    if (jDayOfWeek == locale.firstDay)
        jStartDay = daysInLastMonth - 6;

    // let jCurDate = moment([jLastYear, jLastMonth, jStartDay, 12, minute, second]);
    let jCurDate = moment(`${jLastYear}-${jLastMonth+1}-${jStartDay} ${hour}:${minute}:${second}`, 'jYYYY-jMM-jDD HH:mm:ss');
    console.log(`jCurDate: ${jCurDate.format('jYYYY-jMM-jDD')}, jStartDay: ${jStartDay}`);

    var jCol, jRow;
    for (var i = 0, jCol = 0, jRow = 0; i < 42; i++, jCol++, jCurDate = moment(jCurDate).add(24, 'hour')) {
        if (i > 0 && jCol % 7 === 0) {
            jCol = 0;
            jRow++;
        }
        calendar[jRow][jCol] = jCurDate.clone().hour(hour).minute(minute).second(second);
        jCurDate.hour(12);

        if (this.minDate && calendar[jRow][jCol].format('jYYYY-jMM-jDD') == this.minDate.format('jYYYY-jMM-jDD') && calendar[jRow][jCol].isBefore(this.minDate) && side == 'left') {
            calendar[jRow][jCol] = this.minDate.clone();
        }

        if (this.maxDate && calendar[jRow][jCol].format('jYYYY-jMM-jDD') == this.maxDate.format('jYYYY-jMM-jDD') && calendar[jRow][jCol].isAfter(this.maxDate) && side == 'right') {
            calendar[jRow][jCol] = this.maxDate.clone();
        }
    }

    return calendar;
}

console.log('generating calendars');

moment.loadPersian();

let selectedDate = moment('1396-02-08 00:00:00', 'jYYYY-jMM-jDD HH:mm:ss');
let firstCalendarExpectedDate = moment('1396-01-26 00:00:00', 'jYYYY-jMM-jDD HH:mm:ss');
let lastCalendarExpectedDate = moment('1396-03-05 00:00:00', 'jYYYY-jMM-jDD HH:mm:ss');

console.log(`selectedDate: ${selectedDate.format('jYYYY-jMM-jDD')}`);
console.log(`firstCalendarExpectedDate: ${firstCalendarExpectedDate.format('jYYYY-jMM-jDD')}`);
console.log(`lastCalendarExpectedDate: ${lastCalendarExpectedDate.format('jYYYY-jMM-jDD')}`);

let calendarEntries = generateCalendars(selectedDate);

assert(calendarEntries != null, 'message');
let firstCalendarDate = calendarEntries[0][0];
let lastCalendarDate = calendarEntries[5][6];

assert(firstCalendarDate.year === firstCalendarExpectedDate.year &&
    firstCalendarDate.month === firstCalendarExpectedDate.month &&
    firstCalendarDate.day === firstCalendarExpectedDate.day);
assert(lastCalendarDate.year === lastCalendarExpectedDate.year &&
    lastCalendarDate.month === lastCalendarExpectedDate.month &&
    lastCalendarDate.day === lastCalendarExpectedDate.day);

selectedDate = moment('1395-12-01 00:00:00', 'jYYYY-jMM-jDD HH:mm:ss');
firstCalendarExpectedDate = moment('1395-11-30 00:00:00', 'jYYYY-jMM-jDD HH:mm:ss');
lastCalendarExpectedDate = moment('1396-01-04 00:00:00', 'jYYYY-jMM-jDD HH:mm:ss');

console.log(`selectedDate: ${selectedDate.format('jYYYY-jMM-jDD')}`);
console.log(`firstCalendarExpectedDate: ${firstCalendarExpectedDate.format('jYYYY-jMM-jDD')}`);
console.log(`lastCalendarExpectedDate: ${lastCalendarExpectedDate.format('jYYYY-jMM-jDD')}`);

calendarEntries = generateCalendars(selectedDate);

assert(calendarEntries != null, 'message');
firstCalendarDate = calendarEntries[0][0];
lastCalendarDate = calendarEntries[5][6];

assert(firstCalendarDate.year === firstCalendarExpectedDate.year &&
    firstCalendarDate.month === firstCalendarExpectedDate.month &&
    firstCalendarDate.day === firstCalendarExpectedDate.day);
assert(lastCalendarDate.year === lastCalendarExpectedDate.year &&
    lastCalendarDate.month === lastCalendarExpectedDate.month &&
    lastCalendarDate.day === lastCalendarExpectedDate.day);

console.log(`second row: ${calendarEntries[1][1].format('jYYYY-jMM-jDD')}`);


