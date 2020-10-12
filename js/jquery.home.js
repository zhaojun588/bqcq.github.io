

//特殊展示效果 

var aTab1=function(opt){
    //settings
    var settings=jQuery.extend({
        tabHandleList:"#tabHnadle > li",//标签头
        tabBodyList:"#tabBody > ul",//标签内容体序列
		tabBody:"li",//目标标签  （默认为li）
        bind:"click",//标签绑定事件
        index:0,//默认选中标签下标(可不传)
		gTime:100,//默认效果执行时间（可不传）
		mobile:300,//运动目标
		direction:"left",//运动类型（可选：left,top;默认为left）
		dires:"",//运动类型（poto特别制作）
		special:"false"
    },opt);
    var bind=settings.bind,
        index=settings.index,
		tabBody=settings.tabBody,
		gTime=settings.gTime,
		dires=settings.dires,
		mobile=settings.mobile,
		direction=settings.direction,
        $tabHar=$(settings.tabHandleList),
        $tabCon=$(settings.tabBodyList),
		special=settings.special,
        callBack=settings.callBack;
	var $conLi=$tabCon.children(tabBody),lang=$tabCon.children(tabBody).size(),state=true,List=[];
	for(var i=0; i<lang; i++)
	{
		var l=$conLi.eq(i).position().left;
		var t=$conLi.eq(i).position().top;
		List[i]={left:l,top:t};
			
	}
	for(var i=0; i<lang; i++)
	{
	$conLi.eq(i).css({position:"absolute",left:List[i].left+"px",top:List[i].top+"px"});
	}
	$tabCon.eq(index).siblings(this).hide();
	$tabHar.on(bind,function(){
		var id=$(this).index();
		if(id==index||!state) return;
		state=false;
		if(special)
		{
			var $aW=$(this).outerWidth();	
			$(this).siblings("span").stop(true).animate({"left":$aW*id});
		}
		$(this).addClass("on").siblings(this).removeClass("on");
		var n=$tabCon.eq(index).children(tabBody).size()-1;
		var pH=$tabCon.eq(index).height()+mobile;
		clearInterval(time);
		var time=window.setInterval(function(){
		var sTime=direction=="top"?(gTime*n+1)*4/5:gTime*3;
		var amt=direction=="top"?{top:pH+"px",opacity:0}:{left:mobile+"px",opacity:0};
		$tabCon.eq(index).children(tabBody).eq(n).animate(amt,sTime,function(){
			if($(this).index()==0)
			{
			$tabCon.eq(index).hide();	
			
			show(id);
			}
		})
		
		if(n>0)
		{
		n--;
		}else{
			
			clearInterval(time);
		}
		},100)	
	})
	function show(a){
		$tabCon.eq(a).show();
		    var liH=$tabCon.eq(a).children(tabBody).outerHeight(true);
			var sty=direction=="top"?{top:-mobile+"px",opacity:0}:{left:-mobile+"px",opacity:0};
			$tabCon.eq(a).children(tabBody).css(sty);
			var n=(direction=="top" || dires=="poto")?$tabCon.eq(a).children(tabBody).size()-1:0;
			clearInterval(time);
			var time=window.setInterval(function(){
				 //console.log(List[n]);
			var tj=n>0;
			var tj=(direction=="top" || dires=="poto")?n>0:n<$tabCon.eq(a).children(tabBody).length;
			
			var sTime=direction=="top"?(gTime*n+1)*4/5:gTime*3;
			
			var amt=direction=="top"?{top:liH*n+"px",opacity:1}:{left:List[n].left+"px",opacity:1};	
			$tabCon.eq(a).children(tabBody).eq(n).animate(amt,sTime)
			if(tj)
			{
			n=(direction=="top" || dires=="poto")?n-1:n+1;
			}else{
			clearInterval(time);
			index=a;
			state=true;
			}
			},100)	
		}
}



$(function(){
	
	
	/*==================首页=========================*/
	//首页幻灯
	 if($("#slider").length)
	 {
		 slider({
			sliderBox:"#slider",
			sliderList:"#slider ul li",
			showsize:1,
			effect:"fade",
			bind:"mouseover",
			isAutoPlay:true,
			isSubNum:true
		});
	 }
	
	//首页TAB切换
	//$(".newsTab").myTab({tabHand:".newsTab h3",tabBox:".newsList ul",fades:"top",bind:"mouseover",special:"true"});
	
	aTab1({tabHandleList:".newsTab h3 a",tabBodyList:".newsList > ul",tabBody:"li",bind:"click",mobile:270,direction:"left",special:"true"});

	//$("#ifmTab1").myTab({tabHand:"#ifmTab1 h3",tabBox:"#ifmTab1 .ifmDiv",fades:"top",bind:"mouseover",special:"true"});
	//$("#ifmTab2").myTab({tabHand:"#ifmTab2 h3",tabBox:"#ifmTab2 .ifmDiv",fades:"top",bind:"mouseover",special:"true"});
		
	//首页图片经过横线效果
	
	$(".trans").hover(
		function(){$(this).find("span").stop(true).animate({"width":"100%"})},
		function(){$(this).find("span").stop(true).animate({"width":0})}
	);
	
	
	//首页武将
	var $roleaLi=$(".roleaBtn ul li"),
	    $roleaDiv=$(".rolea");
		$roleaDiv.eq(0).css({"zIndex":9})
		$roleaDiv.find("img.ig").eq(0).css({"display":"block"})
	$roleaLi.hover(
		function(){
			if(!$(this).hasClass("lOn"))
			{
				$(this).find("span").stop(true).animate({"top":"-100px"})
			}},
			
			
		function(){
			if(!$(this).hasClass("lOn"))
			{
				$(this).find("span").stop(true).animate({"top":0})
			}});
			

		$roleaLi.click(function(){
			if(!$(this).hasClass("lOn"))
			{
				var index=$(this).index(),
			    $liNow=$roleaLi.parent().find(".lOn").index();
			    $roleaLi.eq($liNow).find("span").stop(true).animate({"top":0});
				$roleaLi.removeClass("lOn").eq(index).addClass("lOn");
				$roleaDiv.css("zIndex",1);
				$roleaDiv.eq(index).css("zIndex",9);
				$roleaDiv.eq($liNow).css("zIndex",8);
				//$roleaDiv.eq(index).css({"left":"100%","zIndex":2}).animate({"left":0},{duration:800,easing:"swing"});
				$roleaDiv.eq(index).stop(true).find("img.ig").fadeIn();
				$roleaDiv.eq($liNow).stop(true).find("img.ig").fadeOut();	
				$roleaDiv.eq(index).find(".roleaText").css({"right":"0"}).stop(true).animate({"right":"165px"},{duration:500,easing:"swing"})
			}	
		});	
		
		//首页特色系统
		 $(".fList li a").hover(
		 	function(){$(this).find("img").stop(true).animate({"top":"-81px"})},
			function(){$(this).find("img").stop(true).animate({"top":0})});
		
		 
		//首页投票
		
		if($("#vote").length)
		 {
			 slider({
				sliderBox:"#vote",
				sliderList:"#vote ul li",
				showsize:1,
				effect:"left",
				isAutoPlay:true,
				arrow:{
				isBtn:true,//是否需要左右按钮
				leftBtn:".aleft",//左边按钮
				rightBtn:".aright"//右边按钮
			}
			});
		 }	
	
		

})