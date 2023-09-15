$(document).ready(function () {
  let W = $(window).width();
  //text info
  $('.textInfo').click(function(){
    $('.textInfo .info').fadeToggle();
  });
  //table height
  let contentH = $('#main .contentBG').height();
  $('.table-responsive .tableWp').height(contentH - 174);
  $('.step2 .table-responsive .tableWp').height(contentH - 242);
  $('.step3 .tableWrapper .table-responsive .tableWp').height(contentH - 254);
  $('.step4 .table-responsive .tableWp').height(200);
  $('.popup_bg.clone .table-responsive .tableWp, .popup_bg.replace .table-responsive .tableWp').height(contentH - 274);


  // th td width
  let th_num = $('table th').length;
  $('table td').width(100 / th_num + '%');
  $('table td.check').width(50);
  if ($('table').not('.detailContent')) {
    for (let i = 0; i < th_num; i++) {
      let width = $('table td').eq(i).width();
      if ($('.table-responsive .head_bg span').eq(i).hasClass('check')) {
        $('.table-responsive .head_bg span').eq(i).width(60);
      } else {
        $('.table-responsive .head_bg span').eq(i).width(width);
      }
    }
  }

  $('.detail td').width('auto');

  if (W < 420) {
    $('table td.name, table td.company').width(80);
  }

  //dataTable filter icon
  $('table.dataTable thead>tr>th:before').addClass('fa-solid fa-angle-up');
  $('table.dataTable thead>tr>th:after').addClass('fa-regular fa-angle-down');

  //checkbox ALL
  $('.table-responsive .head_bg span input[type="checkbox"]').change(function () {
    let num = $(this).parents('.table-responsive').find('td input[type="checkbox"]').length;

    if ($(this).parents('.table-responsive').find('td input[type="checkbox"]').filter(':checked').length == num) {
      $(this).parents('.table-responsive').find('td input[type="checkbox"]').prop('checked', false);
      $('.batch').removeClass('able');
    } else {
      $(this).parents('.table-responsive').find('td input[type="checkbox"]').prop('checked', true);
      $('.batch').addClass('able');
    }
  });

  //batch

  $('table td input[type="checkbox"]').change(function () {

    if ($(this).parents('table').find('input[type="checkbox"]').filter(':checked').length > 1) {
      $('.batch').addClass('able');
    } else {
      $('.batch').removeClass('able');
    }
  });

  $('.batch').click(function () {

    if ($('this').hasClass('able')) {
      Swal.fire({
        target: document.getElementById('main'),
        title: '<p class="title">批量刪除</p>',
        html: '<div>確認刪除所有素材嗎 ?</div>',
        showCancelButton: true,
        showCloseButton: true,
        confirmButtonText: '確認',
        cancelButtonText: '取消',
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire('已刪除', '', 'success')
        }
      });
    }
  });

});
