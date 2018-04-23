var moment = require('moment');

var date = moment();


date.add(100,'hour')


console.log(date.format('h:mm'));
