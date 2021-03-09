const moment    = require('moment');

exports.formatedDate = (date) => {

    moment.locale('fr');

    return moment(date).calendar(null, {
        sameDay : '[Aujourd’hui à] LT',
        nextWeek : 'dddd [à] LT',
        lastDay : '[Hier à] LT',
        lastWeek : 'dddd [à] LT',
        sameElse : 'L'
    })
};