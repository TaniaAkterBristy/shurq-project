import moment from 'moment';

const campaignTypeList = [
  {
    key: 'sp',
    value: 'Sponsored Products'
  }, {
    key: 'sb',
    value: 'Sponsored Brands'
  }, {
    key: 'sd',
    value: 'Sponsored Display'
  }
];

const forexList = [
  {
    key: 'usd',
    value: '($) USD'
  }, {
    key: 'eur',
    value: '(€) EUR'
  }, {
    key: 'gbp',
    value: '(£) GBP'
  }, {
    key: 'yen',
    value: '(¥) YEN'
  }, {
    key: 'inr',
    value: '(₹) INR'
  }]

const currencyCode = {
  ATVPDKIKX0DER: '$',
  A2EUQ1WTGCTBG2: 'C$',
  A1AM78C64UM0Y8: 'MX$',
  A2Q3Y263D00KWC: 'R$',
  A1F83G8C2ARO7P: '£',
  A1PA6795UKMFR9: '€',
  A13V1IB3VIYZZH: '€',
  APJ6JRA9NG5V4: '€',
  A1RKKUPIHCS9HS: '€',
  AMEN7PMS3EDWL: '€',
  A1805IZSGTT6HS: '€',
  A2NODRKZP88ZB9: 'SEK',
  A1C3SOZRARQ6R3: 'zł',
  ARBP9OOSHTCHU: 'EGP',
  A33AVAJ2PDY3EV: '₺',
  A17E79C6D8DWNP: 'S$',
  A2VIGQ35RCS4UG: 'د.إ',
  A21TJRUUN4KGV: '₹',
  A19VAU5U5O7RUS: 'S$',
  A39IBJ37TRP1C6: 'A$',
  A1VC38T7YXB528: '¥'
}

const GetStartAndEndDate = (key) => {
  let startDate = moment().toDate();
  let endDate = moment().toDate();

  switch (key) {
    case 'today':
      startDate = moment().toDate()
      break;
    case 'yesterday':
      startDate = moment().subtract(1, 'day').toDate()
      endDate = moment().subtract(1, 'day').toDate()
      break;
    case 'last7Days':
      startDate = moment().subtract(7, 'days').toDate()
      break;
    case 'last14Days':
      startDate = moment().subtract(14, 'days').toDate()
      break;
    case 'last30Days':
      startDate = moment().subtract(30, 'day').toDate()
      break;
    case 'last60Days':
      startDate = moment().subtract(60, 'days').toDate()
      break;
    case 'last90Days':
      startDate = moment().subtract(90, 'days').toDate()
      break;
    case 'thisWeek':
      startDate = moment().startOf('week').toDate()
      break;
    case 'thisMonth':
      startDate = moment().startOf('month').toDate()
      break;
    case 'thisQuarter':
      startDate = moment().startOf('month').toDate()
      break;
    case 'lastQuarter':
      startDate = moment().startOf('month').toDate()
      break;
    case 'yearToDate':
      startDate = moment().startOf('year').toDate()
      break;
    case 'lifeTime':
      startDate = moment().subtract(10, 'years').toDate()
      break;
    default:
      startDate = moment().subtract(1, 'day').toDate()
      endDate = moment().subtract(1, 'day').toDate()
      break
  }

  return {
    startDate,
    endDate
  }

}

const metricesLabel = {
  adSale: 'Sale',
  adSpend: 'Spend',
  adImpressions: 'Impression',
  adClicks: 'Clicks',
  adOrders: 'Orders',
  adCpc: 'CPC',
  adAcos:  'ACOS',
  adTotalAcos: 'Total ACOS',
  adRoas: 'ROAS',
  adCtr: 'CTR',
  adConversion: 'Conversion',
  adConversionRate: 'Convenrsion Rate',
  spOrders: 'Organic Orders',
  spUnits: 'Organic Units',
  spSales: 'Organic Sale',
  spRefundUnits: 'Refund Units',
  spRefunds: 'Refunds'
};

export {
  campaignTypeList,
  forexList,
  currencyCode,
  GetStartAndEndDate,
  metricesLabel
}