//!function(){

  "use strict";

  const weeks = ["日","一","二","三","四","五","六"]

  const year_label = "年";

  const month_label = "月";

  const calendarHtml = "<div class='calendar' ><div class='time'><div class='time-title'>选择时间</div><ul><li><p>时</p><ol class='overflow'></ol></li>"+
                  "<li><p>分</p><ol class='overflow'></ol></li><li><p>秒</p><ol class='overflow'></ol></li><div class='clear'></div></ul>"+
                  "</div><div class='title'><div class='year'></div><div class='month'></div></div>" +
                  "<div class='content'><div class='days'><ul></ul></div></div><div class='clear'></div> <div class='options'><ul></ul></div></div>";
  const leftArrow = "<i class='icon iconfont icon-fanhui1'></i>";
  const rightArrow = "<i class='icon iconfont icon-jinru'></i>";

  var leftYearDom,rightYearDom,leftMonthDom,rightMonthDom,$left,$top,$height,y,mm,d,h,m,s;

  function onTime(event,params){
    y = undefined;
    mm= undefined;
    d = undefined;
    h = undefined;
    m = undefined;
    s = undefined;
    var _confirm = params.confirm;
    var _clear = params.clear;
    var $this = $(event);
    $left = $this.offset().left;
    $top = $this.offset().top;
    $height = $this.height();
    setCalendar($this,_confirm,_clear);
    selectTime();
    confirm($this,_confirm);
    clear($this,_clear);
  }
  
  function onDate(event,params){
  	 y = undefined;
	 mm = undefined;
	 d = undefined;
	 h = undefined;
	 m = undefined;
	 s = undefined;
	 var _confirm = params ? params.confirm : undefined;
	 var _clear = params ? params.clear : undefined;
	 var $this = $(event);
	 $left = $this.offset().left;
	 $top = $this.offset().top;
	 $height = $this.height();
	 setCalendar($this, _confirm, _clear);
	 confirm($this, _confirm);
     clear($this,_clear);
  }

  /**
   * 获取年
   * @returns {number}
   */
  function getYear(){
    return new Date().getFullYear();
  }

  /**
   * 获取月
   * @returns {*}
   */
  function getMonth(){
    var month = new Date().getMonth()+1;
    return month < 10 ? "0"+month : month;
  }

  /**
   * 获取日
   */
  function getDays($year,$month){
    var $days = new Date($year, $month, 0);
    return $days.getDate();
  }

  /**
   * 获取周
   */
  function getWeek($year,$month) {
    var $date = new Date($year,$month,0);
    $date = new Date($date.setDate(1));
    return $date.getDay();
  }

  /**
   * 设置页面
   */
  function setCalendar($this,callback,c) {
    $(".calendar").remove();
    var $position = $this.attr("position");
    var left = $left;
    var elm = $(calendarHtml).prependTo("body");
    setWeek();
    setYear($this,callback);
    setMonth($this,callback);
    setDays($this,callback);
    var $calHeight = $(".calendar").height();
    var top = $position == 'top' ? ($top-$calHeight-$height) : ($top+$height+5);
    elm.css({top:top+"px",left:left+"px"});
    
   
  }

  /**
   * 选择时间
   */
  function selectTime($this,callback){
    $("<li class='select-time'>选择时间</li>").bind("click",{callback:callback},function(e){
      var $that = $(e.target);
      var val = $that.text();
      if(val == "选择时间"){
        $that.text("返回时间");
        setTime();
        $(".time").show();
      }else{
        $that.text("选择时间");
        $(".time").hide();
      }
    }).appendTo($(".options ul"));
  }

  /**
   * 设置时
   */
  function setTime(){
    var hour = $(".time ul li").eq(0).find("ol");
    var minute = $(".time ul li").eq(1).find("ol");
    var second = $(".time ul li").eq(2).find("ol");
    if(hour.find("li").length > 0){return;}
    var date = new Date();
    h = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
    m = date.getMinutes() < 10 ? "0" +date.getMinutes() : date.getMinutes();
    s = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
    for(var i=0,len=24;i<len;i++){
      i = i<10? "0"+i : i;
      var objH = $("<li>"+i+"</li>").bind("click",function(e){
        var $that = $(e.target);
        hour.find("li").removeAttr("class");
        $that.addClass("selected");
        h = $that.text();
        var top = $that.height()*new Number(h)-$that.height()*1;
        hour.animate({"scrollTop":top},500);
      }).appendTo(hour);
      if(h == i){
        objH.addClass("selected");
        var top = objH.height()*new Number(h)-objH.height()*1;
        hour.animate({"scrollTop":top},500)
      }
    }
    for(var i=0,len=60;i<len;i++){
      i = i<10 ? "0"+i : i;
      var objM = $("<li>"+i+"</li>").bind("click",function(e){
        var $that = $(e.target);
        minute.find("li").removeAttr("class");
        $that.addClass("selected");
        m = $that.text();
        var top = $that.height()*new Number(m)-$that.height()*1;
        minute.animate({"scrollTop":top},500)
      }).appendTo(minute);
      if(i == m){
        objM.addClass("selected");
        var top = objM.height()*new Number(m)-objM.height()*1;
        minute.animate({"scrollTop":top},500)
      }
      var objS = $("<li>"+i+"</li>").bind("click",function(e){
        var $that = $(e.target);
        second.find("li").removeAttr("class");
        $that.addClass("selected");
        s = $that.text();
        var top = $that.height()*new Number(s)-$that.height()*1;
        second.animate({"scrollTop":top},500)
      }).appendTo(second);
      if(i == s){
        objS.addClass("selected");
        var top = objS.height()*new Number(s)-objS.height()*1;
        second.animate({"scrollTop":top},500)
      }
    }
  }

  /**
   * 清空
   */
  function clear($this,clear){
    $("<li>清空</li>").bind("click",()=>{
      $this.val("");
      if(typeof clear === "function"){
        clear();
      }
    }).appendTo($(".options ul"));
  }

  /**
   * 确认
   */
  function confirm($this,callback){
    $("<li>确认</li>").bind("click",{callback:callback},(e)=>{
      var callback = e.data['callback'];
      if(!y){
        var now = new Date();
        y = now.getFullYear();
        mm = now.getMonth()+1;
        d = now.getDate();
      }
      var $date = new Date(y,mm-1,d).format("yyyy-MM-dd")
      if(y && h){
        $date = new Date(y,mm-1,d,h,m,s).format("yyyy-MM-dd hh:mm:ss");
      }
      $this.val($date);
      if(typeof callback === "function"){callback($date)}
      $(".calendar").remove();
    }).appendTo($(".options ul"));
  }

  /**
   * 设置周title
   */
  function setWeek(){
    $(".calendar .content").find(".week").remove();
    $("<div class='week'><ul></ul></div>").appendTo($(".calendar .content"))
    var li = "";
    for(var i=0,len=weeks.length;i<len;i++){
      var week = weeks[i];
      li += "<li>"+week+"</li>";
    }
    $(li).appendTo($(".week ul"));
  }

  /**
   * 设置年
   */
  function setYear($this,callback){
    var $year = $(".year");
    var $val = $this.val() ? new Date($this.val()).format("yyyy"): getYear();
    var span = "<span>"+$val+year_label+"</span>"
    leftYearDom = $(leftArrow).bind('click',()=>{subtractYear($this)}).appendTo($year);
    $(span).bind('click',{callback:callback},(e)=>{onLoadYear($this,$(e.target),e.data['callback']);}).appendTo($year);
    rightYearDom = $(rightArrow).bind('click',()=>{addYear($this)}).appendTo($year);
  }

  /**
   * 加载年
   */
  function onLoadYear($this,$year,callback){
    unbind();
    var year = $year.text().replace("年","");
    $(".calendar .content").find(".week,.days,.years,.months").remove();
    $("<div class='years'><ul></ul></div>").appendTo($(".calendar .content"));
    $(".years").fadeIn("slow");
    var li = "";
    for(var i=year-7,len=new Number(year)+7;i<=len;i++){
      if(i == year){
        li += "<li class='this-year'>"+i+"年</li>"
      }else{
        li += "<li>"+i+"年</li>";
      }
    }
    $(li).bind("click",{callback:callback},(e)=>{
      var $y = $(e.target).text();
      $year.text($y);
      setWeek();
      setDays($this,e.data['callback']);
      bind($this);
      $(".years").hide();
    }).appendTo($(".years ul"));
  }

  /**
   * 元素解绑
   */
  function unbind() {
    leftYearDom.unbind("click");
    rightYearDom.unbind("click");
    leftMonthDom.unbind("click");
    rightMonthDom.unbind("click");
  }

  /**
   * 元素绑定
   */
  function bind($this){
    leftYearDom.bind('click',()=>{subtractYear($this)});
    rightYearDom.bind('click',()=>{addYear($this)});
    leftMonthDom.bind('click',()=>{subtractMonth($this)});
    rightMonthDom.bind('click',()=>{addMonth($this)})
  }

  /**
   * 加载月份
   */
  function onLoadMonth($this,$month,callback){
    unbind();
    $(".calendar .content").find(".calendar .week,.days,.years,.months").remove();
    $("<div class='months'><ul></ul></div>").appendTo($(".calendar .content"));
    $(".months").fadeIn("slow");
    var li = "";
    var month = $month.text().replace("月","");
    for(var i=1,len=12;i<=12;i++){
      i = i < 10 ? "0"+i : i;
      if(i == month){
        li += "<li class='this-month'>"+i+"月</li>"
      }else{
        li += "<li>"+i+"月</li>";
      }
    }
    $(li).bind("click",{callback:callback},(e)=>{
      var m = $(e.target).text();
      $month.text(m);
      setWeek();
      setDays($this,e.data['callback']);
      bind($this);
      $(".months").hide();
    }).appendTo($(".months ul"));

  }

  /**
   * 设置月
   * @param $this
   */
  function setMonth($this,callback) {
    var $month = $(".month");
    var m = new Date($this.val()).getMonth()+1
    var $val = $this.val() ? m < 10 ? "0" + m : m : getMonth();
    var span = "<span>"+$val+month_label+"</span>";
    leftMonthDom = $(leftArrow).bind('click',()=>{subtractMonth($this)}).appendTo($month);
    $(span).bind('click',{callback:callback},(e)=>{onLoadMonth($this,$(e.target),e.data['callback'])}).appendTo($month);
    rightMonthDom = $(rightArrow).bind('click',()=>{addMonth($this)}).appendTo($month);
  }

  /**
   * 设置天
   * @param $this
   */
  function setDays($this,callback){
    $(".calendar .content").find(".days").remove();
    $("<div class='days'><ul></ul></div>").appendTo($(".calendar .content"));
    var dayEle = $(".days ul");
    dayEle.find("li").remove()
    var year = $(".year").text().replace(year_label,"");
    var month = $(".month").text().replace(month_label,"");
    var week = getWeek(year, month);
    var days = getDays(year, month);
    var lastDays = getDays(year, month-1);
    var array = [];
    var calendarEnd = $this.attr("calendar-end");
    var calendarStart = $this.attr("calendar-start");
    for(var j=lastDays; j>lastDays-week; j--){
      array.push(j);
    }
    for(var k=array.length;k > 0; k--){
      var day = array[k-1];
      day = day < 10 ? "0" + day : day;
      if(calendarEnd){
      	 var calendarStartElem = $this.parents("body").find("input[calendar-start='true']");
	     var startTime = calendarStartElem.val();
		 startTime = startTime.length == 10 ? startTime : new Date(startTime).format("yyyy-MM-dd");
      	 var dateTime = year +"-"+(month-1)+"-"+ day;
	     if(compareDate(startTime,dateTime)){
	     	$("<li><div class='unable'>"+day+"</div></li>").appendTo(dayEle);
	     }else{
	     	$("<li><div class='last-day'>"+day+"</div></li>").bind('click',{callback:callback},(e)=>{
		        var $that = $(e.target);
		        var $val = $that.text();
		        $(".days li div").removeClass("selected");
		        var eml = $that.find("div").length == 0 ? $that : $that.find("div");
		        eml.addClass("selected");
		        setVal(year,month-1,$val,$this,e.data['callback']);
      		}).appendTo(dayEle);
	     }
      }else if(calendarStart){
      	 var calendarEndElem = $this.parents("body").find("input[calendar-end='true']");
      	 var endTime = calendarEndElem.val();
//    	 endTime = endTime.length == 10 && endTime ? endTime : new Date(endTime).format("yyyy-MM-dd");
      	 var dateTime = year +"-"+(month-1)+"-"+ day;
      	 console.log(endTime);
      	 if(endTime && !compareDate(endTime,dateTime)){
      	 	$("<li><div class='unable'>"+day+"</div></li>").appendTo(dayEle);
      	 }else{
      	 	$("<li><div class='last-day'>"+day+"</div></li>").bind('click',{callback:callback},(e)=>{
		        var $that = $(e.target);
		        var $val = $that.text();
		        $(".days li div").removeClass("selected");
		        var eml = $that.find("div").length == 0 ? $that : $that.find("div");
		        eml.addClass("selected");
		        setVal(year,month-1,$val,$this,e.data['callback']);
      		}).appendTo(dayEle);
      	 }
      }else{
      	$("<li><div class='last-day'>"+day+"</div></li>").bind('click',{callback:callback},(e)=>{
	        var $that = $(e.target);
	        var $val = $that.text();
	        $(".days li div").removeClass("selected");
	        var eml = $that.find("div").length == 0 ? $that : $that.find("div");
	        eml.addClass("selected");
	        setVal(year,month-1,$val,$this,e.data['callback']);
      	}).appendTo(dayEle);
      }
    }
    for(var i=1,len=days+1; i<len; i++){
      var day = i < 10 ? "0" + i : i;
      if(calendarEnd){
       	var calendarStartElem = $this.parents("body").find("input[calendar-start='true']");
	    var startTime = calendarStartElem.val();
		startTime = startTime.length == 10 ? startTime : new Date(startTime).format("yyyy-MM-dd");
      	var dateTime = year +"-"+month+"-"+ day;
      	if(compareDate(startTime,dateTime)){
      		$("<li><div class='unable'>"+day+"</div></li>").appendTo(dayEle);;
      	}else{
      		$("<li><div class='day'>"+day+"</div></li>").bind("click",{callback:callback},(e)=>{
	          var $that = $(e.target);
	          var $val = $that.text();
	          $(".days li div").removeClass("selected");
	          var eml = $that.find("div").length == 0 ? $that : $that.find("div");
	          eml.addClass("selected");
	          setVal(year,month,$val,$this,e.data['callback']);
         	}).appendTo(dayEle);
      	}
      }else if(calendarStart){
      	var calendarEndElem = $this.parents("body").find("input[calendar-end='true']");
      	var endTime = calendarEndElem.val();
      	var dateTime = year +"-"+month+"-"+ day;
      	if(endTime && !compareDate(endTime,dateTime)){
      		$("<li><div class='unable'>"+day+"</div></li>").appendTo(dayEle);;	
      	}else{
      		$("<li><div class='day'>"+day+"</div></li>").bind("click",{callback:callback},(e)=>{
	          var $that = $(e.target);
	          var $val = $that.text();
	          $(".days li div").removeClass("selected");
	          var eml = $that.find("div").length == 0 ? $that : $that.find("div");
	          eml.addClass("selected");
	          setVal(year,month,$val,$this,e.data['callback']);
         	}).appendTo(dayEle);
      	}
      }else{
      	 $("<li><div class='day'>"+day+"</div></li>").bind("click",{callback:callback},(e)=>{
	          var $that = $(e.target);
	          var $val = $that.text();
	          $(".days li div").removeClass("selected");
	          var eml = $that.find("div").length == 0 ? $that : $that.find("div");
	          eml.addClass("selected");
	          setVal(year,month,$val,$this,e.data['callback']);
         }).appendTo(dayEle);
      }
    }
  }
  
  /**
   * 日期比较
   * @param {Object} s1
   * @param {Object} s2
   */
  function compareDate(date1,date2){
  	var oDate1 = new Date(date1);
    var oDate2 = new Date(date2);
    if(oDate1.getTime() > oDate2.getTime()){
        return true;
    }
    return false;
  }

  /**
   * 设置值
   * @param $this
   */
  function setVal(year,month,day,$this,callback){
    y = year;
    mm = month;
    d = day;
    var $date = new Date(year,month-1,day).format("yyyy-MM-dd");
    $this.val($date);
    if(typeof callback === "function"){callback($date)}
  }

  /**
   * 加年
   */
  function addYear($this){
     var year = $(".year").text().replace(year_label,"");
     $(".year span").text(parseInt(year)+1+year_label);
     setDays($this);
  }

  /**
   * 减年
   */
  function subtractYear($this){
    var year = $(".year").text().replace(year_label,"");
    $(".year span").text(parseInt(year)-1+year_label);
    setDays($this);
  }

  /**
   * 加月
   * @param $this
   */
  function addMonth($this){
    var month = $(".month").text().replace(month_label,"");
    var m = parseInt(month)+1;
    if(m > 12){addYear($this);m=1}
    m =  m < 10 ? "0" + m : m;
    $(".month span").text(m+month_label);
    if(m<12){setDays($this)}
  }

  /**
   * 减月
   * @param $this
   */
  function subtractMonth($this){
    var month = $(".month").text().replace(month_label,"");
    var m = parseInt(month)-1;
    if(m <= 0){subtractYear($this);m=12}
    m =  m < 10 ? "0" + m : m;
    $(".month span").text(m+month_label);
    if(m>0){setDays($this)}
  }

  document.addEventListener("click",(e)=>{
    var $this = $(e.target);
    if($this.closest(".date").length == 0 && $this.closest(".calendar").length == 0){
      $(".calendar").remove();
    }
  })

  Date.prototype.format = function(fmt) {
    var o = {
      "M+" : this.getMonth()+1,                 //月份
      "d+" : this.getDate(),                    //日
      "h+" : this.getHours(),                   //小时
      "m+" : this.getMinutes(),                 //分
      "s+" : this.getSeconds(),                 //秒
      "q+" : Math.floor((this.getMonth()+3)/3), //季度
      "S"  : this.getMilliseconds()             //毫秒
    };
    if(/(y+)/.test(fmt)) {
      fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
    }
    for(var k in o) {
      if(new RegExp("("+ k +")").test(fmt)){
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
      }
    }
    return fmt;
  }
//}(window);
