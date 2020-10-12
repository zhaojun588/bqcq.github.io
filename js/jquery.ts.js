// JavaScript Document

//判断浏览器类型
$.browser ={};
$.browser.mozilla = /firefox/.test(navigator.userAgent.toLowerCase());
$.browser.webkit = /webkit/.test(navigator.userAgent.toLowerCase());
$.browser.opera = /opera/.test(navigator.userAgent.toLowerCase());
$.browser.msie = /msie/.test(navigator.userAgent.toLowerCase());

/*----------------------------------------------------------------------------------------------------*/
     //for slider    各种切换（带箭头、带数字导航、带标题、带缩略图）    
/*----------------------------------------------------------------------------------------------------*/

/*========================================================
   运用：
   
   slider({
		sliderBox:"#slider",
		sliderList:"#slider ul li",
		showsize:1,
		arrow:
		{
			isBtn:true,
			leftBtn:".aleft",
			rightBtn:".aright"
		},
		isAutoPlay:true,   新增两个类：aleft和aright                                      
		showTime:3000,
		isSubNum:true,     单独开启数字导航（不带标题）新增两个id:#subNum(父级)，#subList(列表),当前状态类：subOn
		smallImg:true,     开启缩略图
		samllSize:3,       缩略图显示个数
		bind:"click",      
		effect:"fade"      三种切换模式可选 fade|left|top
		hasTitle:true      除了上面新增数字导航的东西还多了一个id：#subTitle   必须给img设置alt属性值
		});

   默认状态：左右箭头关闭，数字导航关闭，带标题关闭，自动播放关闭，显示个数为2；
   

========================================================*/

var slider=function(opt){
    //settings
    var settings=jQuery.extend({
        sliderBox:"#slider",//整个图片展示id
		sliderCon:"#slider ul",
        sliderList:"#slider ul li",//图片列表
		sliderele:"slider",
		scrollWay:false,
        now:0,//默认选中标签下标
		arrow:{
				isBtn:false,//是否需要左右按钮
				leftBtn:"#",//左边按钮
				rightBtn:"#"//右边按钮
			},
		showsize:2,//主图显示个数
		isAutoPlay:false,//是否自动播放
		showTime:3000,//自动播放切换时间
		isSubNum:false,//是否增加数字导航
		hasTitle:false,//是否带标题
		smallImg:false,//是都带缩略图
		smallSize:3,//缩略图显示个数
		organWidth:0,//风琴效果---水平（宽度）
		organHeight:0,//风琴效果---垂直（高度）
		bind:"click",//鼠标事件
		effect:"fade",//大图切换效果 left,top,fade,organ
		noto:false,
		callBack:false//回调
		
    },opt);
    var 
        $now=settings.now,
		aBtn=settings.arrow,
		$showsize=settings.showsize,
		$scrollWay=settings.scrollWay,
		isBtn=aBtn.isBtn,
		$leftBtn=$(aBtn.leftBtn),
		$rightBtn=$(aBtn.rightBtn),
		$sliderBox=$(settings.sliderBox),
		$sliderCon=$(settings.sliderCon),
        $sliderList=$(settings.sliderList),
		isAutoPlay=settings.isAutoPlay,
		isSubNum=settings.isSubNum,
		hasTitle=settings.hasTitle,
		smallImg=settings.smallImg,
		$smallSize=settings.smallSize,
		$organWidth=settings.organWidth,
		$organHeight=settings.organHeight,
		$bind=settings.bind,
		$effect=settings.effect,
		$showTime=settings.showTime,
        callBack=settings.callBack,
		sliderele=settings.sliderele,
		noto=settings.noto;
		
		if($scrollWay)
		{
			$sliderList.parent().append($sliderList.parent().html());
			var maxSize=$sliderList.parent().children().size();
		}
		else
		{
			var maxSize=$sliderList.size();//列表总条数
		}
		
    
	var $liH=$sliderList.eq(0).outerHeight(true);
	var $liW=$sliderList.eq(0).outerWidth(true);//单张图片的宽度+（包括margin padding border的值）
	var $liW2=$sliderList.eq(0).outerWidth()//单张图片的宽度（包括padding border,不包括margin的值）
	var $liMargin=$liW-$liW2;//求出 margin 左右的值
	if($effect!="top")
	{
		$sliderList.parent().parent().css("width",$liW*$showsize-$liMargin+'px');//图片展示区域尺寸
	}
	
	//$sliderList.parent().css("width",maxSize*$liW);//图片列表的总宽度
	imgEffect($now);
	
	function imgEffect(index)
	{
		switch($effect)
		{
			case "left":
			            $sliderList.parent().css({position:"absolute",top:"0",width:maxSize*$liW+'px',height:$liH+'px'});
						$sliderList.parent().children().css({"float":"left"});
						$sliderList.parent().stop(true).animate({"left":-$liW*index+'px'},{duration:1000,easing:"easeInOutCubic"});
						break;
			case "top":	
			           $sliderList.parent().css({width:$liW+'px',height:maxSize*$liH+'px'});
					   $sliderList.parent().stop(true).animate({"marginTop":-$liH*index+'px'},{duration:500,easing:"easeInOutCubic"});
					   break;	
			case "fade": 
					   $sliderList.parent().css({position:"relative",width:$liW+'px',height:$liH+'px'});
					   $sliderList.css({"position":"absolute",left:0,top:0,zIndex:1});
					   $sliderList.eq(index).show().stop(true).css({zIndex:99}).animate({opacity:1},{duration:800,easing:"swing"}).siblings("li").animate({opacity:0},{duration:800,easing:"swing"}).hide();
					   break;
			case "organ":
					   $sliderList.find(".divHand").bind($bind,function(){
						  $(this).parent().addClass("liOn").siblings().removeClass("liOn");
						 // $(this).siblings().show().stop(true).animate({height:$organHeight+'px'},{duration:500,easing:"easeOutQuad",queue:false});
						 // $(this).parent().siblings().find(".drapBox").stop(true).animate({height:0},{duration:500,easing:"easeOutQuad", queue:false,complete:function(){$(this).hide()}})
						  $(this).siblings().show().css({height:$organHeight+'px'});
						  $(this).parent().siblings().find(".drapBox").css({height:0,"display":"none"})
					   })
					   break;		   
		}
	}	
	
	
	if(hasTitle)
	{
		var subNumHtml='<div id="subTitle"></div>';
		$sliderBox.append(subNumHtml);
		var imgName=$sliderList.find("img").eq(0).attr("name"); 
		var imgLink=$sliderList.find("a").eq(0).attr("href"); 
		var titleListHtml='<span><a href="'+imgLink+'" target="_blank">'+imgName+'</a></span>';	
		$("#subTitle").append(titleListHtml);	
	}
	
	if(isSubNum)//判断如果有数字导航时执行
	{
		if(hasTitle)
		{
			var subNumHtml='<div id="subNum"><div id="subTitle"></div><div id="subList"></div></div>';
			$sliderBox.append(subNumHtml);
			var imgName=$sliderList.find("img").eq(0).attr("name"); 
			$("#subTitle").html(imgName);
		}
		else
		{
			var subNumHtml='<div id="subNum"><div id="subList"></div></div>';
			$sliderBox.append(subNumHtml);
		}
		
		for(var i=0;i<maxSize;i++)
			{
				var numListHtml='<span></span>'
				$("#subList").append(numListHtml);	
			}
			$("#subList").find("span").eq(0).addClass("sOn");
			
		$("#subList").find("span").bind($bind,
			function(){
				$(this).addClass("sOn").siblings().removeClass("sOn");
				var index=$("#subList span").index($(this))
				    $now=index;	
				    imgEffect($now);
					//$sliderList.parent().stop(true).animate({"left":-$liW*index+'px'},{duration:1000,easing:"easeInOutCubic"});
			});
	};
	
	
	if(smallImg)   //判断是否带缩略图
	{

		var smallImgHtml='<div id='+sliderele+'><ul></ul></div>'
		$sliderBox.append(smallImgHtml);
		
		$sliderList.each(function(){
			var bigSrc=$(this).find("img").attr("src");
			bigSrc=bigSrc.split(".");		
			var smallImgList='<li><a href="javascript:void(0)"><img src="'+bigSrc[0]+'b.png" /></a><span></span></li>';
			
		$("#"+sliderele).children("ul").append(smallImgList);
		
		});
		
		var smallUl=$("#"+sliderele).children("ul");
		var smallLi=$("#"+sliderele).children("ul").children("li");
		var smallLiW=$("#"+sliderele).children("ul").children("li").eq(0).outerWidth(true);
		var smallLiW2=$("#"+sliderele).children("ul").children("li").eq(0).outerWidth();
		var smallLiMargin=smallLiW-smallLiW2;
		var smallLiH=$("#"+sliderele).children("ul").children("li").eq(0).outerHeight(true);
		var smallLiH=$("#"+sliderele).children("ul").children("li").eq(0).addClass("lOn");
		if(noto)
		{
		}else{
        $("#smallImg").css({
			width:smallLiW*$smallSize-smallLiMargin+'px',
			height:smallLiH+"px",
			overflow:"hidden"
		});
		
		smallUl.css({
			width:maxSize*smallLiW+'px',
			height:smallLiH+"px",
			position:"absolute",
			left:0,
			top:0	
		});
		}
		smallLi.bind($bind,
			function(){
				var index=$(this).index();
				    smallLi.removeClass("lOn");
				    $(this).addClass("lOn");
					if(maxSize-$smallSize>index-1)
					{
						smallUl.stop(true).animate({"left":-smallLiW*index+'px'},{duration:1000,easing:"easeInOutCubic"});	
					}	
					else if(index>=maxSize-1)
					{
						smallUl.stop(true).animate({"left":-smallLiW*(maxSize-$smallSize)+'px'},{duration:1000,easing:"easeInOutCubic"});	
					}
					
					else if(index>maxSize)
					{
						smallUl.stop(true).animate({"left":0},{duration:1000,easing:"easeInOutCubic"});
					}

					if(hasTitle)
					{
						var imgName=$sliderList.find("img").eq(index).attr("name"); 
						var imgLink=$sliderList.find("a").eq(index).attr("href"); 
						var titleListHtml='<span><a href="'+imgLink+'" target="_blank">'+imgName+'</a></span>';	
						$("#subTitle").html(titleListHtml);
					}
					
						
					if($now!=index)
					{
						imgEffect(index);
					}
					if(noto)
					{
						
					}else{
					$sliderList.parent().stop(true).animate({"left":-$liW*index+'px'},{duration:1000,easing:"easeInOutCubic"});	
					}
					$now=index;	
					
			});
			
	}
	
	if(isBtn==true)//判断如果有左右箭头时执行
	{
		if(maxSize>$showsize)
		{
			var arrowHtml='<a class="aleft png" href="javascript:void(0)">向左</a><a class="aright png" href="javascript:void(0)">向右</a>';
			$sliderBox.append(arrowHtml);
			$leftBtn=$(aBtn.leftBtn);
			$rightBtn=$(aBtn.rightBtn);
			$rightBtn.click(clickRight);
			$leftBtn.click(clickLeft);
		}	
	}	
	
	
   //图片滚动的位置
	function imgPosition()
	{
		if(smallImg)
		{
			 smallLi.removeClass("lOn");
		     smallLi.eq($now).addClass("lOn");
			//if(maxSize-$smallSize>$now-1)
//			{
//				smallUl.stop(true).animate({"left":-smallLiW*$now+'px'},{duration:1000,easing:"easeInOutCubic"});	
//			}	
//
//			else if($now>=maxSize-1)
//			{
//				smallUl.stop(true).animate({"left":-smallLiW*(maxSize-$smallSize)+'px'},{duration:1000,easing:"easeInOutCubic"});	
//			}
//			
//			else if($now>maxSize)
//			{
//				smallUl.stop(true).animate({"left":0},{duration:1000,easing:"easeInOutCubic"});
//			}	
		}
		imgEffect($now);
		//$sliderList.parent().stop(true).animate({"left":-$liW*$now+'px'},{duration:1000,easing:"easeInOutCubic"});
	}
	
	//点击左箭头
	function clickLeft()
	{   
	    if($sliderList.parent().is(":animated")){return;}
		$rightBtn.removeClass("rLast");
	   if($now<=0)
		{	
			$now=maxSize-$showsize;
		}
		else
		{
			$now--;
		}

		imgPosition();
	}
	
	
	//点击右箭头
	function clickRight()
	{   
		if($sliderList.parent().is(":animated")){return;}
		$leftBtn.removeClass("lLast");

		if($now>=maxSize-$showsize)
		{
			
			$now=0;	

		}
		else
		{
			$now++;
		}
		
		if(hasTitle)
		{
			var imgName=$sliderList.find("img").eq($now).attr("name"); 
			var imgLink=$sliderList.find("a").eq($now).attr("href"); 
		    var titleListHtml='<span><a href="'+imgLink+'" target="_blank">'+imgName+'</a></span>';	
			$("#subTitle").html(titleListHtml);
		}
		
		if(isSubNum==true)
		{
			if(hasTitle==true)
			{
				var imgName=$sliderList.find("img").eq($now).attr("name"); 
				$("#subTitle").html(imgName);
			}	
			$("#subList").find("span").removeClass("sOn").eq($now).addClass("sOn");	
		}
		
		imgPosition();
			
	}
	
	//自动播放
	var timer=null;
	function autoPlay()
	{
		clearInterval(timer);
		timer=setInterval(clickRight,$showTime);		
	}
	if(isAutoPlay)
	{
		autoPlay();
		$sliderBox.hover(
		function(){clearInterval(timer);},
		function(){autoPlay();})
	}
};

//tab切换标签插件
(function(){

    // 滚轮事件插件{{{
    (function() {
        var types = ['DOMMouseScroll', 'mousewheel'];

        if ($.event.fixHooks) {
            for ( var i=types.length; i; ) {
                $.event.fixHooks[ types[--i] ] = $.event.mouseHooks;
            }
        }

        $.event.special.mousewheel = {
            setup: function() {
                if ( this.addEventListener ) {
                    for ( var i=types.length; i; ) {
                        this.addEventListener( types[--i], handler, false );
                    }
                } else {
                    this.onmousewheel = handler;
                }
            },

            teardown: function() {
                if ( this.removeEventListener ) {
                    for ( var i=types.length; i; ) {
                        this.removeEventListener( types[--i], handler, false );
                    }
                } else {
                    this.onmousewheel = null;
                }
            }
        };

        $.fn.extend({
            mousewheel: function(fn) {
                return fn ? this.bind("mousewheel", fn) : this.trigger("mousewheel");
            },

            unmousewheel: function(fn) {
                return this.unbind("mousewheel", fn);
            }
        });

        function handler(event) {
            var orgEvent = event || window.event, args = [].slice.call( arguments, 1 ), delta = 0, returnValue = true, deltaX = 0, deltaY = 0;
            event = $.event.fix(orgEvent);
            event.type = "mousewheel";

            // Old school scrollwheel delta
            if ( orgEvent.wheelDelta ) { delta = orgEvent.wheelDelta/120; }
            if ( orgEvent.detail     ) { delta = -orgEvent.detail/3; }

            // New school multidimensional scroll (touchpads) deltas
            deltaY = delta;

            // Gecko
            if ( orgEvent.axis !== undefined && orgEvent.axis === orgEvent.HORIZONTAL_AXIS ) {
                deltaY = 0;
                deltaX = -1*delta;
            }

            // Webkit
            if ( orgEvent.wheelDeltaY !== undefined ) { deltaY = orgEvent.wheelDeltaY/120; }
            if ( orgEvent.wheelDeltaX !== undefined ) { deltaX = -1*orgEvent.wheelDeltaX/120; }

            // Add event and delta to the front of the arguments
            args.unshift(event, delta, deltaX, deltaY);

            return ($.event.dispatch || $.event.handle).apply(this, args);
        }

    })();
    //}}}



    var scrollBarIdx = 0;  // 用于惟一标识每个scrollbar
    var selectIdx = 0;    // 用于惟一标识每个select
    $.fn.extend({

        // html scrollbar 自定义控件 {{{
        scrollBarPlugin: function(options){
            var defaults = {
                scrollCon: 'data-scrollCon',
                scrollWrap: 'data-scrollWrap',
                scrollDrag: 'data-scrollDrag',
                scrollUp: 'data-scrollUp',
                scrollDown: 'data-scrollDown',
                scrollConCls: 'scrollBarCon',   // 滚动内容主体
                scrollWrapCls: 'scrollBarWrap', // 滚动块主体
                scrollDragCls: 'scrollBarDrag', // 滚动块拖动体
                scrollUpCls: 'scrollBarUp',     // 向上移动
                scrollDownCls: 'scrollBarDown', // 向下移动
                scrollStep: 30,  // 滚动步长
                scrollMaxHeight: 'data-scrollMaxHeight'  // 超过高度，即滚动
            };
            options = $.extend(defaults, options);
            $(this).each(function(){
                var $this = $(this);
                // 计算idx，防止重新解绑/绑定事件冲突，如：多个绑定document
                var thisIdx = parseInt($this.data('scrollBarIdx')) || 0;
                if (thisIdx < 1) {
                    ++scrollBarIdx;
                    thisIdx = scrollBarIdx;
                    $this.attr('scrollBarIdx', thisIdx);
                }
                var $bindLabel = '.scrollBarPlugin_' + thisIdx;

                var scrollConCls = $this.attr(options.scrollCon) || options.scrollConCls;
                var scrollWrapCls = $this.attr(options.scrollWrap) || options.scrollWrapCls;
                var scrollDragCls = $this.attr(options.scrollDrag) || options.scrollDragCls;
                var scrollUpCls   = $this.attr(options.scrollUp) || options.scrollUpCls;
                var scrollDownCls = $this.attr(options.scrollDown) || options.scrollDownCls;
                var $scrollCon = $this.find('.' + scrollConCls);
                var $scrollWrap = $this.find('.' + scrollWrapCls);
                var $scrollDrag = $this.find('.' + scrollDragCls);
                var $scrollUp   = $this.find('.' + scrollUpCls);
                var $scrollDown = $this.find('.' + scrollDownCls);
                var scrollMaxHeight = $this.attr(options.scrollMaxHeight);

                // 关键节点检测 开始
                var kItemArr = [
                    [scrollConCls, $scrollCon],
                    [scrollWrapCls, $scrollWrap],
                    [scrollDragCls, $scrollDrag]
                ];
                for (var k=0,klen=kItemArr.length; k<klen; k++) {
                    if (!kItemArr[k][1].length) throw '[.' + kItemArr[k][0] + '] no exist';
                }
                // 关键节点检测 结束

                var cHeight = $scrollCon.outerHeight(true);
                // 超过高度自动显示滚动条处理
                if (typeof scrollMaxHeight != 'undefined') {
                    scrollMaxHeight = parseInt(scrollMaxHeight) || 0;
                    if (scrollMaxHeight > 0 && (cHeight > scrollMaxHeight)) {
                        $scrollCon.parent().css({height:scrollMaxHeight+'px', overflow:'hidden'});
                        $scrollWrap.css({height:scrollMaxHeight+'px'});
                        $scrollWrap.find('.selectScrollTrack').css({height:scrollMaxHeight-5+'px'});
                    } else {
                        $scrollCon.parent().css({height:cHeight+'px'});
                        $scrollWrap.css({height:cHeight+'px'});
                        $scrollWrap.find('.selectScrollTrack').css({height:cHeight-5+'px'});
                    }
                }

                var cMaxHeight = cHeight - $this.height();
                if (cMaxHeight > 0) {
                    // 有滚动条
                    var dMaxHeight = $scrollDrag.parent().height() - $scrollDrag.height();
                    var dRate      = dMaxHeight / cMaxHeight;
                    var dragArr = {
                        hasDrag: false,
                        oldX: 0,
                        oldY: 0,
                        nTop: 0,
                        dragDown: function(evt, label){
                            dragArr.hasDrag = true;
                            dragArr.oldX = evt.type == 'touchstart' ? evt.originalEvent.targetTouches[0].pageX : evt.pageX;
                            dragArr.oldY = evt.type == 'touchstart' ? evt.originalEvent.targetTouches[0].pageY : evt.pageY;
                            dragArr.nTop = label && label == 'touchpane' ? (parseInt($scrollCon.css('top')) || 0) : (parseInt($(this).css('top')) || 0);
                        },
                        dragMove: function(evt, label){
                            var currPageY = evt.type == 'touchmove' ? evt.originalEvent.targetTouches[0].pageY : evt.pageY;
                            if (dragArr.hasDrag) {
                                if (label && label == 'touchpane') {
                                    // 拖动内容
                                    var diffY = dragArr.nTop + currPageY - dragArr.oldY;
                                    var newTop = diffY;
                                    if (diffY > 0) {
                                        newTop = 0;
                                    } else {
                                        if (Math.abs(diffY) > cMaxHeight) {
                                            newTop = '-' + cMaxHeight;
                                        }
                                    }
                                    $scrollDrag.css({top:Math.abs(newTop)*dRate+'px'});
                                    $scrollCon.css({top:newTop+'px'}).trigger('scroll');
                                } else {
                                    // 拖动条
                                    var diffY = dragArr.nTop + currPageY - dragArr.oldY;
                                    var newTop = diffY;
                                    if (diffY > 0) {
                                        // 向下拖，要向上滚
                                        if (diffY >= dMaxHeight) {
                                            newTop = dMaxHeight;
                                        }
                                    } else {
                                        // 向上拖，要向下滚
                                        newTop = 0;
                                    }
                                    $scrollDrag.css({top:newTop+'px'});
                                    $scrollCon.css({top:'-'+newTop/dRate+'px'}).trigger('scroll');
                                }
                            }
                        },
                        dragUp: function(evt){
                            dragArr.hasDrag = false;
                            $(this).unbind('mousemove'+$bindLabel+' touchmove'+$bindLabel);
                        }
                    };

                    $scrollCon.css({top:0}).trigger('scroll');
                    $this.unbind('mousewheel.scrollBarPlugin').bind('mousewheel.scrollBarPlugin', function(evt, delta){
                        var nTop = parseInt($scrollCon.css('top')) || 0;
                        var diffTop = nTop + delta * options.scrollStep;
                        var newTop  = diffTop;
                        if (delta < 0) {
                            // 向下滚
                            if (Math.abs(diffTop) >= cMaxHeight) {
                                newTop = 0 - cMaxHeight;
                            }
                        } else {
                            // 向上滚
                            if (diffTop >= 0) {
                                newTop = 0;
                            }
                        }
                        $scrollCon.css({top:newTop+'px'}).trigger('scroll');
                        $scrollDrag.css({top:(0-dRate*newTop)+'px'});

                        return false;
                    }).unbind('touchstart.scrollBarPlugin').bind('touchstart.scrollBarPlugin', function(evt){
                        // 鼠标按下
                        dragArr.dragDown.call(this, evt, 'touchpane');
                        $(document).unbind('mousemove'+$bindLabel+' touchmove'+$bindLabel).bind('mousemove'+$bindLabel+' touchmove'+$bindLabel, function(evt){
                            // 鼠标拖动
                            dragArr.dragMove.call(this, evt, 'touchpane');
                            return false;
                        });
                    });

                    // 向上滚动
                    if ($scrollUp.length) {
                        $scrollUp.bind('click.scrollBarPlugin', function(){
                            var nTop = parseInt($scrollCon.css('top')) || 0;
                            var diffTop = nTop + 10;
                            var newTop  = diffTop;
                            if (diffTop >= 0) {
                                newTop = 0;
                            }
                            $scrollCon.css({top:newTop+'px'}).trigger('scroll');
                            $scrollDrag.css({top:(0-dRate*newTop)+'px'});
                            return false;
                        });
                    }
                    // 向下滚动
                    if ($scrollDown.length) {
                        $scrollDown.bind('click.scrollBarPlugin', function(){
                            var nTop = parseInt($scrollCon.css('top')) || 0;
                            var diffTop = nTop - 10;
                            var newTop  = diffTop;
                            if (Math.abs(diffTop) >= cMaxHeight) {
                                newTop = 0 - cMaxHeight;
                            }
                            $scrollCon.css({top:newTop+'px'}).trigger('scroll');
                            $scrollDrag.css({top:(0-dRate*newTop)+'px'});
                            return false;
                        });
                    }

                    // 拖动滚动处理
                    $scrollDrag.css({top:0});
                    $scrollDrag.unbind('mousedown.scrollBarPlugin touchstart.scrollBarPlugin').bind('mousedown.scrollBarPlugin touchstart.scrollBarPlugin', function(evt){
                        // 鼠标按下
                        dragArr.dragDown.call(this, evt);
                        $(document).unbind('mousemove'+$bindLabel+' touchmove'+$bindLabel).bind('mousemove'+$bindLabel+' touchmove'+$bindLabel, function(evt){
                            // 鼠标拖动
                            dragArr.dragMove.call(this, evt);
                            return false;
                        });
                        return false;
                    });
                    // 鼠标放开
                    $(document).unbind('mouseup'+$bindLabel+' touchend'+$bindLabel).bind('mouseup'+$bindLabel+' touchend'+$bindLabel, function(evt){
                        dragArr.dragUp.call(this, evt);
                    });

                    $scrollWrap.show().unbind('click.scrollBarPlugin').bind('click.scrollBarPlugin', function(evt){
                        return false;
                    });
                } else {
                    // 没有滚动条
                    $scrollWrap.hide();
                    $scrollCon.css({top:0}).trigger('scroll');
                    $this.unbind('mousewheel.scrollBarPlugin');
                    $scrollDrag.unbind('mousedown.scrollBarPlugin').unbind('touchstart.scrollBarPlugin');
                    $scrollWrap.unbind('click.scrollBarPlugin');
                    $(document).unbind('mouseup'+$bindLabel).unbind('touchend'+$bindLabel);
                }
            });
        },
        //}}}

        // html select 自定义控件 {{{
        selectPlugin: function(options){
            var defaults = {
                dataId: 'data-id',                // 节点id所在属性名
                dataName: 'data-name',            // 节点节点所在属性名
                dataValue: 'data-value',          // 节点节点所在值
                valueName: 'data-value',               // 下拉项中值的属性名
                triggerType: 'data-triggerType',  // 列表下拉触发方式属性值 mouse:鼠标经过 click:鼠标点击
                showSelected: 'data-showSelected',// 是否显示选中的值
                valueCls: 'selectMain',           // 节点值所在节点类
                listWrapCls: 'selectWrap',        // 列表下拉包裹类
                listItemSelectedCls: 'selected',  // 列表下拉项选中类
                scrollWrapCls: 'selectScrollWrap',// 列表下拉滚动条wrap
                scrollDragCls: 'selectScrollDrag', // 列表下拉滚动条 拖动类
                focusCls: 'selectShow'             // 打开下拉时，添加的类
            };
            options = $.extend(defaults, options);
            $(this).each(function(){
                var $this = $(this);
                // 计算idx，防止重新解绑/绑定事件冲突，如：多个绑定document
                var thisIdx = parseInt($this.data('selectIdx')) || 0;
                if (thisIdx < 1) {
                    ++selectIdx;
                    thisIdx = selectIdx;
                    $this.attr('selectIdx', thisIdx);
                }
                var $bindLabel = '.selectPlugin_' + thisIdx;

                var openState = false;
                var $selectWrap = $this.find('.' + options.listWrapCls);
                var $selectWrapUl = $selectWrap.find('ul');
                var $valueItem  = $this.find('.' + options.valueCls);
                var $scrollWrap = $this.find('.' + options.scrollWrapCls);
                var $scrollDragItem = $this.find('.' + options.scrollDragCls);

                // 关键节点检测 开始
                var kItemArr = [
                    [options.listWrapCls, $selectWrap],
                    [options.listWrapCls+' ul', $selectWrapUl],
                    [options.valueCls, $valueItem],
                    [options.scrollWrapCls, $scrollWrap],
                    [options.scrollDragCls, $scrollDragItem]
                ];
                for (var k=0,klen=kItemArr.length; k<klen; k++) {
                    if (!kItemArr[k][1].length) throw '[.' + kItemArr[k][0] + '] no exist';
                }
                // 关键节点检测 结束

                var fn_close = function(){
                    $this.removeClass(options.focusCls);
                    //$valueItem.removeClass('selOn');
                    $selectWrap.hide();
                    openState = false;
                };

                var zIndex = parseInt($this.css('zIndex')) || 100;

                var fn_open = function(){
                    $this.addClass(options.focusCls).css('zIndex', zIndex);
                    //$valueItem.addClass('selOn');

                    var $liWrap = $selectWrap.find('li').length;
                    if ($liWrap > 1) {
                        $selectWrap.show();
                        openState = true;

                        // 下位滚动处理
                        $selectWrap.scrollBarPlugin({scrollConCls:'selectCon ul', scrollWrapCls:'selectScrollWrap', scrollDragCls:'selectScrollDrag'});
                    }
                };

                var fn_init = function(){
                    var name = $this.attr(options.dataName);
                    var value = $this.attr(options.dataValue);
                    if (typeof(name) != 'undefined') {
                        if (typeof(value) == 'undefined') {
                            $this.attr(options.dataValue, '');
                        }

                        var $item = $this.find('li a['+options.valueName+'='+value+']');
                        if ($item.length) {
                            $item.trigger('click');
                        } else {
                            $this.find('li a:eq(0)').trigger('click');
                        }
                    }

                };

                var triggerType = $this.attr(options.triggerType);
                switch (triggerType) {
                    case 'click':
                        $this.unbind('click.selectPlugin').bind('click.selectPlugin', function(){
                            // 已打开，则关闭
                            if (openState) {
                                fn_close();
                            } else {
                                fn_open();
                            }
                        });
                        break;
                    default:
                        var mouseHandle = null;
                        $this.unbind('mouseover.selectPlugin').bind('mouseover.selectPlugin', function(){
                            // 打开
                            if (mouseHandle) {clearTimeout(mouseHandle, 0);mouseHandle=null;}
                            fn_open();
                        }).unbind('mouseout.selectPlugin').bind('mouseout.selectPlugin', function(){
                            // 关闭
                            if (mouseHandle) {clearTimeout(mouseHandle, 0);mouseHandle=null;}
                            mouseHandle = setTimeout(fn_close, 100);
                        });
                }

                var showSelected = parseInt($this.attr(options.showSelected)) || 0;

                $this.undelegate('ul li a', 'click.selectPlugin').delegate('ul li a', 'click.selectPlugin', function(e){
                    var id    = $this.attr(options.dataId);
                    var name  = $this.attr(options.dataName);
                    var value = $(this).attr(options.valueName);
                    var txt   = $(this).text();
                    var $val  = $this.find('input[name="'+name+'"]');
                    var defval= $val.val();

                    value = typeof value == 'undefined' ? '' : value;
                    // 生成隐藏控件
                    if ($val.length) {
                        $val.val(value);
                    } else if (name) {
                        if (id) {
                            $val = $('<input type="hidden" value="'+value+'" id="'+id+'" name="'+name+'" />').appendTo($this);
                        } else {
                            $val = $('<input type="hidden" value="'+value+'" name="'+name+'" />').appendTo($this);
                        }
                    }

                    // 显示选择的值
                    $valueItem.attr(options.valueName, value).text(txt);
                    $this.find('li').removeClass(options.listItemSelectedCls).show();
                    if (showSelected) {
                        $(this).parent().addClass(options.listItemSelectedCls).show();
                    } else {
                        $(this).parent().addClass(options.listItemSelectedCls).hide();
                    }
                    $selectWrap.hide();

                    // 是否改变值
                    if (value != defval) {
                        if ($val.length) {
                            $val.trigger('change', value);
                        }
                        $this.trigger('change', value);
                    }

                    fn_close();
                    return false;
                }).unbind('replaceAllOption.selectPlugin').bind('replaceAllOption.selectPlugin', function(e, dataArr){
                    var def_value  = $(this).attr(options.dataValue);
                    var selectedVal = (typeof(def_value) == 'undefined') ? '' : def_value;
                    if (dataArr) {
                        var htmlTpl = [];
                        for (var i in dataArr) {
                            if (i == selectedVal) {
                                if (showSelected) {
                                    htmlTpl.push('<li class="selected"><a '+options.valueName+'="' + i + '" href="javascript:;">' + dataArr[i] + '</a></li>');
                                } else {
                                    htmlTpl.push('<li class="selected" style="display:none;"><a '+options.valueName+'="' + i + '" href="javascript:;">' + dataArr[i] + '</a></li>');
                                }
                                htmlTplVal = [i,dataArr[i]];
                            } else {
                                htmlTpl.push('<li><a '+options.valueName+'="' + i + '" href="javascript:;">' + dataArr[i] + '</a></li>');
                            }
                        }
                        $selectWrap.find('ul').html(htmlTpl.join(''));
                        var $firstItem = $selectWrap.find('.selected a');
                        if (!$firstItem.length) {
                            $firstItem = $selectWrap.find('li a:eq(0)');
                        }
                        $firstItem.trigger('click');

                        return false;
                    }
                }).unbind('replaceAllOption2.selectPlugin').bind('replaceAllOption2.selectPlugin', function(e, dataArr){
                    var def_value  = $(this).attr(options.dataValue);
                    var selectedVal = (typeof(def_value) == 'undefined') ? '' : def_value;
                    if (dataArr.length > 0) {
                        var htmlTpl = [];
                        for (var i=0,len=dataArr.length; i<len; i++) {
                            if (dataArr[i][0] == selectedVal) {
                                if (showSelected) {
                                    htmlTpl.push('<li class="selected"><a '+options.valueName+'="' + dataArr[i][0] + '" href="javascript:;">' + dataArr[i][1] + '</a></li>');
                                } else {
                                    htmlTpl.push('<li class="selected" style="display:none;"><a '+options.valueName+'="' + dataArr[i][0] + '" href="javascript:;">' + dataArr[i][1] + '</a></li>');
                                }
                                htmlTplVal = [i,dataArr[i][1]];
                            } else {
                                htmlTpl.push('<li><a '+options.valueName+'="' + i + '" href="javascript:;">' + dataArr[i][1] + '</a></li>');
                            }
                        }
                        $selectWrap.find('ul').html(htmlTpl.join(''));
                        var $firstItem = $selectWrap.find('.selected a');
                        if (!$firstItem.length) {
                            $firstItem = $selectWrap.find('li a:eq(0)');
                        }
                        $firstItem.trigger('click');

                        return false;
                    }
                }).unbind('selectOption.selectPlugin').bind('selectOption.selectPlugin', function(e, val){
                    $(this).find('li a[' + options.valueName + '="' + val + '"]').trigger('click');
                    return false;
                }).unbind('selectOptionIndex.selectPlugin').bind('selectOptionIndex.selectPlugin', function(e, idx){
                    $(this).find('li:eq('+idx+') a').trigger('click');
                    return false;
                });

                // 初始化默认值
                fn_init();

                // 绑定点击隐藏下拉事件
                $(document).unbind('click'+$bindLabel).bind('click'+$bindLabel, function(e){
                    if (e.target != $valueItem.get(0)) {
                        fn_close();
                    }
                });
            });
        },
        //}}}

		myTab:function(options, callback){
			var defaults={
				obj:"#tab",
				tabHand:"#tab h3",
				tabBox:"#tabBox ul",
				tabOn:"on",
				bind:"click",
				fades:"defaults",
				now:0,
				special:false
			}; 
			var options = $.extend(defaults, options);
            var callback = callback || function(){};
            $(this).each(function(){
				 var $this = $(this);
				 var $obj=$this,
				 	 $tabHand=$(options.tabHand),
					 $tabBox=$(options.tabBox),
					 $tabOn=options.tabOn,
					 $bind=options.bind,
					 $fades=options.fades,
					 $h=$tabBox.outerHeight(true),
					 $w=$tabBox.outerWidth(true),
					 $len=$tabBox.length,
					 $now=options.now,
					 $special=options.special;
					 
					 $tabHand.find("a").bind($bind,(function(){
						 if(!$(this).hasClass($tabOn))
						 {
							 var index=$(this).index();
							 $now=$tabHand.find("."+$tabOn).index();
							 $(this).addClass($tabOn).siblings().removeClass($tabOn);
							 
							 if($special)
							 {
								 var $aW=$(this).outerWidth(true);
								 var $oSpan=$tabHand.find("span");
								     $oSpan.width($aW);
								 $oSpan.stop(true).animate({"left":$aW*index});	
								
							 }
							 switch($fades)
							 {
								case "defaults" :$tabBox.hide();$tabBox.eq(index).show(); break;
								case "top":
								if($now<index)
								{
									$tabBox.eq(index).css({"top":"100%"});
									$tabBox.eq($now).stop(true).animate({"top":"-100%"});
									$tabBox.eq(index).stop(true).animate({"top":0})
								}
								else
								{
									$tabBox.eq(index).css({"top":"-100%"});
									$tabBox.eq($now).stop(true).animate({"top":"100%"});
									$tabBox.eq(index).stop(true).animate({"top":0})
								};break;
								
								case "left":
								if($now<index)
								{
									$tabBox.eq(index).css({"left":"100%"});
									$tabBox.eq($now).stop(true).animate({"left":"-100%"});
									$tabBox.eq(index).stop(true).animate({"left":0})
								}
								else
								{
									$tabBox.eq(index).css({"left":"-100%"});
									$tabBox.eq($now).stop(true).animate({"left":"100%"});
									$tabBox.eq(index).stop(true).animate({"left":0})
								};break;
								
							 } 	 
						 }
						 
						 
					}))

			})
		}
	})
})(jQuery);

/*==================运行=========================*/
$(function(){
	
	
	//检查是否为 IE 6-9
    if ((!$.support.leadingWhitespace)||navigator.userAgent.indexOf("MSIE 9.0")>0) {
			$("body").addClass("ie");
		}
	
	$("button").hover(
		function(){$(this).addClass("bOn")},
		function(){$(this).removeClass("bOn")})
	 
	
	
	//资料页
	var $infoNav=$(".infoNav"),
	    $iDiv=$(".iDiv"),
		$divArr=[],
		$divArr2=[],
		$navLen=$infoNav.find("li").length,
		navNow=0;
		
		//$navIndex=$infoNav.find("li").index();
	
	$(".upTab").myTab({tabHand:".upTab h4",tabBox:".upList .upDiv",bind:"mouseover",tabOn:"aOn"});
	
	var $isDl=$(".isDl"),
	    $isDd=$(".isDl dd");
	    $isDl.each(function(index){
        $isDl.eq(index).find("dd:last").addClass("dLast");
    });
	
	
	$iDiv.each(function(index){
		
		var divTop=$iDiv.eq(index).offset().top;
		$divArr.push(divTop);
		
		var divTop2=$iDiv.eq(index).offset().top+$iDiv.eq(index).outerHeight();
		$divArr2.push(divTop2);
	});
	
	
	$infoNav.find("a").click(function(){
		var liIndex=$(this).parent().index();
		$infoNav.find("a").removeClass("aOn");
		$(this).addClass("aOn");
		$("body,html").stop(true).animate({scrollTop:$divArr[liIndex]-122},{duration:500,easing:"swing"});
		
	});
	
	  
	
    

})
