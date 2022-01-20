import moment from 'moment'

const formatToLocalDateTime = (datetime) => {
    const testDateUtc = moment.utc(datetime)
    const localDate = moment(testDateUtc).local()
    return localDate.format("YYYY-MM-DD HH:mm:ss")
  }

  export default formatToLocalDateTime