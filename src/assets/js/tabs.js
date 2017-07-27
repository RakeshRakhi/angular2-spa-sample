
var InitTabs = function (c) {
  debugger;
  var tabindex;
  $(function () {
    var tabloc = window.location.hash;
    $("ul.tabs li").each(function (i) {
      var tabrel = "#" + $(this).attr('w');
      if (tabloc == tabrel) {
        tabindex = i;
      }
      ;
    });
    $("ul.tabs li").click(function () {
      $(this).addClass("active").siblings().removeClass("active");
      var activeTab = $(this).find("a").attr("href");
      $(activeTab).fadeIn().siblings().hide();
      return false;
    }).eq(tabindex).click();
  });

  $(".tab_content").hide();

  if (c != undefined && c != null && c != "") {
    $(".tab_content:first").show();
    $(".tab_content").hide();
    $('ul.tabs li#' + c).tab('show');
    $('div#' + c).fadeIn();
  } else {
    $(".tab_content:first").show();
  }

  /* if in tab mode */
  $("ul.tabs li").click(function () {

    $(".tab_content").hide();
    var activeTab = $(this).attr("id");
    $("div#" + activeTab).fadeIn();

    $("ul.tabs li").removeClass("active");
    $(this).addClass("active");

    $(".tab_drawer_heading").removeClass("d_active");
    $(".tab_drawer_heading[id^='" + activeTab + "']").addClass("d_active");

  });
  /* if in drawer mode */
  $(".tab_drawer_heading").click(function () {

    $(".tab_content").hide();
    var activeTab = $(this).attr("id");
    $("div#" + activeTab).fadeIn();

    $("ul.tabs li").removeClass("active");
    $(this).addClass("active");

    $(".tab_drawer_heading").removeClass("d_active");
    $(".tab_drawer_heading[id^='" + activeTab + "']").addClass("d_active");
  });


  /* Extra class "tab_last" 
     to add border to right side
     of last tab */
  $('ul.tabs li').last().addClass("tab_last");




}

