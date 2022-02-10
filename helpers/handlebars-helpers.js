const dayjs = require('dayjs')
const relativeTime = require('dayjs/plugin/relativeTime')

dayjs.extend(relativeTime)

module.exports = {
  ifCond: function (a, b, options) {
    return a === b ? options.fn(this) : options.inverse(this)
  },
  currentYear: () => dayjs().year(),
  relativeTimeFromNow: a => dayjs(a).fromNow(),
  dayjs: a => dayjs(a).format('YYYY/MM/DD HH:mm')
}  