$('.datepicker').daterangepicker({
  drops: 'down',
  opens: 'left',
  minDate:new Date(),
  timePicker: false,
  startDate: moment(),
  endDate: moment(),
  locale: {
    format: 'YY/MM/DD '
  }
});