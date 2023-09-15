//date 
$('.datepicker').datepicker();
$('.timepicker').timepicker();

let dp_i18n = {
  zh: {
    cancel: "取消",
    clear: "清除",
    done: "完成",
    previousMonth: "‹",
    nextMonth: "›",
    months: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
    monthsShort: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
    weekdays: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
    weekdaysShort: ["週日", "週一", "週二", "週三", "週四", "週五", "週六"],
    weekdaysAbbrev: ['日', '一', '二', '三', '四', '五', '六'],
  },
};
let dp_options = {
  autoClose: true,
  format: "yyyy/mm/dd",
  setDefaultDate: true,
  firstDay: 1,
  i18n: dp_i18n.zh
};

let today = new Date();
let nextYear = new Date(today);
nextYear.setFullYear(nextYear.getFullYear() + 1);
nextYear.setDate(nextYear.getDate() - 1);

$("#startdate").datepicker(
  $.extend({}, dp_options, {
    defaultDate: today,
    minDate: today,
    maxDate: ($('#enddate').val() !==''? $('#enddate').val() : ''),
    onClose: function (e) {
      let dpstartDate = M.Datepicker.getInstance($("#startdate"));
      let dpendDate = M.Datepicker.getInstance($("#enddate"));
      if (dpstartDate.date > dpendDate.date) {

        Swal.fire('日期不可倒轉', '', 'info');
        $("#startdate").val($('#enddate').val());
      }
    }
  })
);
$("#startplay").datepicker(
  $.extend({}, dp_options, {
    onClose: function (e) {
      let dpEndDate = M.Datepicker.getInstance($("#endplay"));
      if (dpEndDate.date < this.date) {
        $("#endplay").val($("#startplay").val());
      }
    }
  })
);



$("#enddate").datepicker(
  $.extend({}, dp_options, {
    defaultDate: today,
    minDate: today,
    i18n: dp_i18n.zh,
    onClose: function (e) {
      let dpstartDate = M.Datepicker.getInstance($("#startdate"));
      let dpendDate = M.Datepicker.getInstance($("#enddate"));
      console.log(dpendDate);
      if (dpendDate.date <  dpstartDate.date) {
        Swal.fire('日期不可倒轉', '', 'info');
        $("#enddate").val($('#startdate').val());
      }
    }
  })
);

$("#endplay").datepicker(
  $.extend({}, dp_options, {
    i18n: dp_i18n.zh,
    onClose: function (e) {
      let dpStartDate = M.Datepicker.getInstance($("#startplay"));
      if (dpStartDate.date > this.date) {
        $("#startplay").val($("#endplay").val());
      }
    }
  })
);

$("#chartDate, #checkDate, #checkDate1, #checkDate2, #applyDate, #mediadate, #mediadate_clone, #onlineDate, #offlineDate,#contract_start,#contract_end").datepicker(
  $.extend({}, dp_options, {
    i18n: dp_i18n.zh,
  })
);

//time
let time_i18n = {
  zh: {
    cancel: "取消",
    clear: "清除",
    done: "完成",
  }
};

let time_options = {
  autoClose: true,
  format: "HH:mm",
  defaultTime: 'now',
  twelveHour: true,
  vibrate: true,
  i18n: time_i18n.zh
};




$('#starttime').timepicker(
  $.extend({}, time_options, {
    i18n: dp_i18n.zh,
    onCloseEnd: function (e) {

      let dpStartTime = M.Timepicker.getInstance($("#starttime"));
      let dayNow = new Date();
      let hour = (dayNow.getHours() < 10 ? '0' : '') + dayNow.getHours();
      let minutes = (dayNow.getMinutes() < 10 ? '0' : '') + dayNow.getMinutes();
      let nowTime = String(`${hour}:${minutes}`);
      console.log(dpStartTime, dpStartTime.time < nowTime);

      if ($('#enddate').val() === $('#startdate').val() && dpStartTime.time < nowTime) {
        Swal.fire('時間不可回朔', '', 'info');
        $("#starttime").val(`${hour}:${minutes} ${dpStartTime.amOrPm}`);
      } else {
        $("#starttime").val(dpStartTime.time);
      }
    }
  })
);

$('#endtime').timepicker(
  $.extend({}, time_options, {
    onCloseEnd: function (e) {

      let dpendTime = M.Timepicker.getInstance($("#endtime"));
      let dayNow = new Date();
      let hour = dayNow.getHours();
      let minutes = dayNow.getMinutes();

      if ($('#enddate').val() === $('#startdate').val() && dpendTime.time < $('#starttime').val()) {
        let hourText = (dayNow.getHours() < 10 ? '0' : '') + dayNow.getHours();
        let minutesText = minutes + 5;
        console.log(minutesText);
        if(minutesText>60){
          minutesText= ((minutesText-60)< 10 ? '0' : '') + minutesText;
        }else{
          minutesText= (minutesText+5 < 10 ? '0' : '') + minutesText;
        }
        Swal.fire('時間不可回朔', '', 'info');
        $('#endtime').val(`${hourText}:${minutesText} ${dpendTime.amOrPm}`);
      } else {
        $('#endtime').val(dpendTime.time);
      }
    }
  })
);

$('#modal-bf85051a-3f7a-8399-8be9-4eae70c5b7cf, #modal-e85ea5f2-2099-1fe7-8ae0-5bcdef104c55').css({ 'top': '20%' });//playList
