//footer位置设置
$(function(){
    function footerPosition(){
      $("footer").removeClass("fixed-footer");
      var contentHeight = document.body.scrollHeight,//网页正文全文高度
          winHeight = window.innerHeight;//可视窗口高度，不包括浏览器顶部工具栏
      if(!(contentHeight > winHeight)){
          //当网页正文高度小于可视窗口高度时，为footer添加类fixed-footer
          $("footer").addClass("fixed-footer");
          $(".content").height(winHeight);
      } else {
          $("footer").removeClass("fixed-footer");
          }
      }
      footerPosition();
      $(window).resize(footerPosition);
});

