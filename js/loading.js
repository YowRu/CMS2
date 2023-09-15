$(document).ready(function(){
//   let pathname = window.location.pathname;
//   let consult = pathname.split("/");
//   let number = consult.length

  let words=$('title').text();
    $("header").load("header.html");
    $('.pagination').load('pagination.html');
    $('#main .content>.title').text(words);
    
//datePicker
    let n = $('body').find('.datePicker').length
    for(let i=0;i<n;i++){
        $('body').find('.datepicker').eq(i).prop('id','date'+i);
    }
//

});