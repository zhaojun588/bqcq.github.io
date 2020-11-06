$(document).ready(function(){
	$.fn.scroll_({arrows:false,mouseWheelSpeed: 30,verticalGutter:15});
	$('.wrap').snowfall({image:"images/flake.png", minSize:20, maxSize:50});

	$("#GamePhoto .gamePhotoShow").jcarousellite_gundong({btn:1,list:".imglist li","visible":1,"auto":6500,"speed":600});
	$("#ZhiYe").ZhiYe();
	$.fn.hovers();
})

//职业切换
$.fn.ZhiYe=function(){
	var obj			=	$(this),
		selectname	=	"change",
		//性别选择
		xbselect	=	function(){
			var $game_renwubox	=	obj.find(".game_renwubox");
			obj.find("._renwu_xb span").bind("mouseenter",function(){
				$(this).addClass("change").siblings().removeClass("change");	
				var thisindex	=	$(this).index();
				var $parent	=	$(this).parents(".game_renwubox");
				var _zhiyeobj	=	$parent.find("._zhiye:eq("+thisindex+")").stop(true,false).fadeIn(800)
					_zhiyeobj.siblings("._zhiye").stop(true,false).fadeOut(700)
			});
			
			$game_renwubox.each(function(index, element) {
				var selectindex	=	$(this).find("._renwu_xb .change").index();
				$(this).find("._zhiye:eq("+selectindex+")").show().siblings("._zhiye").hide();
            });
			
			
		},
		findobj		=	function(boxobj){
			if (boxobj.length>0){
			return 	{
						game_renwu	:	boxobj.find(".game_renwu"),
						zy_pic		:	boxobj.find(".game_renwubox"),
						zy_jieshao	:	boxobj.find(".zhiye_jieshao"),
						zy_name		:	boxobj.find(".zhiye_name"),
						zy_val		:	boxobj.find(".zhiye_val"),
						zy_h5 		:	boxobj.find("h5"),
						zy_p 		:	boxobj.find("p")
					
					}
			}
		},
		index		=	0;
	if (obj.length==0) return false;
		xbselect();
	var navobj	=	obj.find("#ZhiYeTab"),
		boxobj	=	obj.find(".zhiyebox")
	if (navobj.find("li."+selectname).length==0) 
	{	navobj.find("li:first").addClass("change");		
	}else{
		index	=	navobj.find("li."+selectname).index();
	}
	boxobj.hide();
	boxobj.eq(index).show()
	
	navobj.find("li").bind("click",function(){
		if ($(this).is(".change")) {return false;}
		//已加载的
		var index2		=	$(this).siblings(".change").index(),
			$showobj	=	boxobj.eq(index2),
			loaded	=	findobj($showobj)
			$(this).find("span").text("我已了解");
			$(this).siblings().find("span").text("点击了解");
		$(this).addClass("change").siblings().removeClass("change");
		//等待加载的
		
		var index		=	$(this).index(),
			 $hideobj	=	boxobj.eq(index),
			 loading	=	findobj($hideobj)
			  var outplay=[
				function(){
					var aniobj	=	{"left":"-30%","opacity":"0"},
						aniactive=	{duration:1000,easing:'easeInOutBack'}
					loaded.zy_pic.stop(true,false).animate(aniobj,aniactive)
						loading.zy_pic.css(aniobj)
						aniobj	=	{"left":"850px","opacity":"0"}
					loaded.zy_jieshao.stop(true,false).animate(aniobj,aniactive)
						loading.zy_jieshao.css(aniobj)
					setTimeout(function(){plays()},800)
				},
				function()
				{
					$showobj.fadeOut(200);
					setTimeout(function(){plays()},50)
				},
				function()
				{
					$hideobj.fadeIn();
					loading.zy_pic.stop(true,false).animate({"opacity":1,"left":0},500)
					loading.zy_jieshao.stop(true,false).animate({"opacity":1,"left":635},500)
				}
			 ]
				
			obj.queue("playlist01",outplay)	
			var plays=function(){obj.dequeue("playlist01")}
			plays()
		return false;	
		
	})
	
}


//悬停效果
$.fn.hovers=function(){
	//返回顶部
	$(".btn_backtop").bind("click",function(){
		var _this	=	$(this)
		$(this).animate({"margin-left":"100%"},900)
		$("html,body").animate({scrollTop:0},800,function(){_this.animate({"margin-left":"0"},600)})
	});
	
		$(".imglist li").hover_animate(
				{
				  aniobj:
				  [
					  [
						  "img",					//应用对象
						  "",//初始CSS
						  "width:130%;height:130%;margin-left:-15%;margin-top:-6%;",		//mouseenter动画CSS
						  "width:100%;height:100%;margin-left:0;margin-top:0;",			//mouseleave动画css
						  "1600",					//mouseenter 时间
						  "800"						//mouseleave 时间
						  
					  ]
				  ]
				}
				
			)
			
			
		$(".zhiyeTab li").hover_animate(
				{
				  aniobj:
				  [
					  [
						  "self",					//应用对象
						  "",//初始CSS
						  "margin-top:-15px;",		//mouseenter动画CSS
						  "margin-top:0;",			//mouseleave动画css
						  "300",					//mouseenter 时间
						  "300"						//mouseleave 时间
						  
					  ]
				  ]
				}
				
			)
		$("#Floatingbar ul li").hover_animate(
				{
				  aniobj:
				  [
					  [
						  "self",					//应用对象
						  "",//初始CSS
						  "margin-left:-15px;",		//mouseenter动画CSS
						  "margin-left:0;",			//mouseleave动画css
						  "300",					//mouseenter 时间
						  "300"						//mouseleave 时间
						  
					  ]
				  ]
				}
				
			)
		$("#Download ul li").hover_animate(
				{
				  aniobj:
				  [
					  [
						  "self",					//应用对象
						  "",//初始CSS
						  "margin-top:-15px;",		//mouseenter动画CSS
						  "margin-top:0;",			//mouseleave动画css
						  "300",					//mouseenter 时间
						  "300"						//mouseleave 时间
						  ,300
					  ],
					  
					  [
						  ".hover",					//应用对象
						  "",//初始CSS
						  "top:0;height:100%;",		//mouseenter动画CSS
						  "height:0;top:50%;",			//mouseleave动画css
						  "300",					//mouseenter 时间
						  "300"						//mouseleave 时间
					  ]
				  ]
				}
				
			)

		$(".qqlist li").hover_animate(
				{
				  aniobj:
				  [
				  		[
						  "parsent_i",					//应用对象
						  "",//初始CSS
						  "opacity:0.2;",		//mouseenter动画CSS
						  "opacity:1;",			//mouseleave动画css
						  "300",					//mouseenter 时间
						  "300"						//mouseleave 时间
						  ,0
						  ,100
					  ],
					  [
						  "self",					//应用对象
						  "",//初始CSS
						  "margin-top:-10px;",		//mouseenter动画CSS
						  "margin-top:0;",			//mouseleave动画css
						  "300",					//mouseenter 时间
						  "300"						//mouseleave 时间
						 ,100
					  ],
					  [
						  "i",					//应用对象
						  "",//初始CSS
						  "opacity:1;",		//mouseenter动画CSS
						  "opacity:1;",			//mouseleave动画css
						  "300",					//mouseenter 时间
						  "300"						//mouseleave 时间
						 ,100
					  ]
				  ],
				  set_class:"hover_"
				}
				
			)

	
	
		$(".erweimaList li").hover_animate(
				{
				  aniobj:
				  [
					 
					  [
						  "parsent_div",					//应用对象
						  "",//初始CSS
						  "opacity:0.2;",		//mouseenter动画CSS
						  "opacity:1;",			//mouseleave动画css
						  "300",					//mouseenter 时间
						  "300"						//mouseleave 时间
						  ,0
						  ,100
					  ],
					   [
						  "self",					//应用对象
						  "",//初始CSS
						  "margin-top:-18px;",		//mouseenter动画CSS
						  "margin-top:0;",			//mouseleave动画css
						  "300",					//mouseenter 时间
						  "300"						//mouseleave 时间
						 ,100
					  ],
					  [
						  "div",					//应用对象
						  "",//初始CSS
						  "opacity:1;",		//mouseenter动画CSS
						  "opacity:1;",			//mouseleave动画css
						  "300",					//mouseenter 时间
						  "300"						//mouseleave 时间
						 ,100
					  ]
				  ]
				}
				
			)
	
		/*菜单悬停*/
		$("#menu ul li").hover_animate(
				{
				  aniobj:
				  [
					 
					   [
						  "strong",					//应用对象
						  "",//初始CSS
						  "bottom:-18px;",		//mouseenter动画CSS
						  "bottom:0;",			//mouseleave动画css
						  "300",					//mouseenter 时间
						  "300"						//mouseleave 时间
					  ],
					   [
						  "em",					//应用对象
						  "",//初始CSS
						  "top:-35px;",		//mouseenter动画CSS
						  "top:0;",			//mouseleave动画css
						  "300",					//mouseenter 时间
						  "300"						//mouseleave 时间
					  ],
					   [
						  "._line",					//应用对象
						  "display:block;top:-7px;border-width:7px;opacity:0;",//初始CSS
						  "top:0px;opacity:0.8;",		//mouseenter动画CSS
						  "top:0%;opacity:0;border-width:95px;",			//mouseleave动画css
						  "300",					//mouseenter 时间
						  "600"						//mouseleave 时间
					  ]
				  ],
				  set_class:"hover_"
				}
				
			)

		/*播放视频*/		 
		$("#btn_play").one("click",function(){
			var videourl=$(this).attr("data-file");
			var autoplay=$(this).attr("data-autoplay")	;
			var playobj=$(this).attr("data-playobj");
			if ($(playobj).length==0) return false;
			
			if (videourl)
			{
				
			var w=$(playobj).outerWidth();
			var h=$(playobj).outerHeight();
				
			var writehtml='<object class id="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,19,0/#version=7,0,19,0/default.htm" width="'+w+'" height="'+h+'">'
				+'<param name="movie" value="flash/Flvplayer.swf">'
				+'<param name="quality" value="high">'
				+'<param value="transparent" name="wmode">'
				+'<param name="allowFullScreen" value="true">'
				+'<param name="FlashVars" value="vcastr_file='+videourl+'&BufferTime=3&IsAutoPlay='+autoplay+'">'
				+'<embed src="flash/Flvplayer.swf" wmode="Opaque" allowfullscreen="true" flashvars="vcastr_file='+videourl+'&IsAutoPlay='+autoplay+'" quality="high" pluginspage="www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash" width="'+w+'" height="'+h+'"></embed>'
				+'</object>'
				
				$(this).stop(true,false).animate({opacity: 0}, 500,function(){$(playobj).html(writehtml)});
			}
		})	
	$(".videoBox").hover_animate(
				{
				  aniobj:
				  [
					  [
						  "img",					//应用对象
						  "",//初始CSS
						  "opacity:0.8;",		//mouseenter动画CSS
						  "opacity:1;",			//mouseleave动画css
						  "300",					//mouseenter 时间
						  "300"						//mouseleave 时间
					  ]
				  ]
				}
				
			)
	
}



//滚动条
$.fn.scroll_=function(config){
	var scrollobj=$("[data-scroll]");
	if (scrollobj.length==0) {return;}
	scrollobj.each(function(index, element) {
			var self		=	$(this),
				parentobj	=	self.parent(),
				parent_h	=	0,
				parent_w	=	0;
			if (self.length==0){return;}
			
			var h		=	self.attr("data-scroll-height"),
				w		=	self.attr("data-scroll-width"),
				bfb		=		0,
				color=self.attr("data-scroll-color");
				
				if (h.indexOf("%")!=-1){
					h	=	parseInt(h);
					parent_h	=	parentobj.outerHeight();
					h			=	parent_h*(h/100);
				} else {
					h	=	parseInt(h);
				}
				
				
				if (w.indexOf("%")!=-1){
					w	=	parseInt(w);
					
					parent_w	=	parentobj.outerWidth();
					w			=	parent_w*(w/100)-30;
				} else {
					w	=	parseInt(w);
				}
				
				self.css({"width":"100%"}).wrap('<div class="container1" style="width:'+w+'px"></div>').wrap('<div class="div_scroll"></div>');
				self.parents('.div_scroll').css({height:h}).scroll_absolute(config)	;
				self.find("img").load(function(){self.parents('.div_scroll').scroll_absolute(config);})
			
			if (typeof(color)!="undefined")
			{setTimeout(function(){self.parents(".container1").find(".scroll_drag").css({"background":color})},500);}
	});
};

//滚动
		$.fn.jcarousellite_gundong=function(options ){
			var self=$(this);
			if (self.length===0){return;}
			
			var items		=	options.list,
				liobj		=	self.find(items),
				liobj_parent=	liobj.parent(),
				liobj_len	=	liobj.length,
				config;
			
			if (liobj_len	<=	options.visible) {
				self.css({"margin":"0 auto","width":liobj_parent.outerWidth()})
				return;	
			}	else{
				var  width	=	liobj.outerWidth(),
					 margin	=	parseInt(liobj.css("margin-left"))+parseInt(liobj.css("margin-right")),
					 liwidth=	width+margin;
					 
				self.css({"overflow":"visible","margin-left":"auto","margin-right":"auto","width":liwidth*options.visible})
			}
			
			
			if (liobj.is("div")){
				liobj.wrap("<li></li>");
				self.find("li").wrapAll("<ul class='templist'></ul>");		
				liobj	=	self.find(".templist li");
				self.find(".templist").wrapAll('<div class="jCarouselLite"></div>').parent().wrapAll('<div class="gundong"></div>');
			} else {
				liobj_parent.wrapAll('<div class="jCarouselLite"></div>').parent().wrapAll('<div class="gundong"></div>');
			}
			
			
			if (options.btn!==0){
				if (!options.circular){
				self.find(".gundong").append('<span class="clear"></span><a href="javascript:;"  class="move_right"><span></span></a><a href="javascript:;" class="move_left" ><span></span></a>');
				}else{
				self.find(".gundong").append('<span class="clear"></span><a href="javascript:;"  class="move_right"><span></span></a><a href="javascript:;" class="move_left disabled" ><span></span></a>');
				}
			}
			
			self.find(".gundong").each(function(index){
				var myself	=	$(this);
				config={
							btnPrev:myself.find(".move_left"),
							btnNext: myself.find(".move_right"),
							visible:1,
							auto: 2500 ,
							speed: 300
						};
				if (options.btn===0){$.extend(config, {btnPrev:null,btnNext:null});}
				$.extend(config, options);
				myself.find(".jCarouselLite:eq("+index+")").jCarouselLite(config);	
			})
		}
		
		
$.fn.hover_animate=function(obj){
	var time_delay=null,runlist=[],runlist_end	=[],create_var=[],set_var=[],self=$(this);
		if (self.length===0 || obj.aniobj.length===0) {return;}
		if (obj.set_class==="" || typeof (obj.set_class)==="undefined") {$.extend(obj,{set_class:"hover"});}
		if (typeof(obj.delaytime)!=="number" || typeof(obj.delaytime)==="undefined"){$.extend(obj,{delaytime:100});}
		var fn={
			csschange:function(val){
				val	=	$.trim(val);
				if (val===""){return '';}
				if (val.indexOf("{")<0 || val.indexOf("}")<0 )
				{
					val=$.trim(val);
					var last_fh=val.lastIndexOf(';');
					if (last_fh+1===val.length)
					{
						val=val.substring(0,last_fh);
						val='{\''+val.replace(/\:/g,"':'").replace(/\;/g,"','")+'\'}';
					}
					else
					{val='{\''+val.replace(/\:/g,"':'").replace(/\;/g,"','")+'\'}';}
				}
				return $.trim(val);
			}	
		};
		$.each(obj.aniobj,function(index,val){
			if (val.length<6){return;}
			var setobj			=	val[0],
				setobj_			=	setobj.replace(/\.|\ |\>/g,""),
				animate_css		=	fn.csschange(val[1]),
				animate_css_	=	'',
				animate_start	=	fn.csschange(val[2]),
				animate_end		=	fn.csschange(val[3]),
				animate_easing	=	val[4],
				animate_easing2	=	val[5],
				animate_delay	=	val[6],
				animate_delay2	=	val[7],
				run				=	'',
				run_end			=	'';
				
				if (typeof(animate_delay)==="undefined"){animate_delay	=	0;}
				if (typeof(animate_delay2)==="undefined"){animate_delay2	=	0;}
				if (animate_css!==""){animate_css_='.css('+animate_css+')';}
				else{animate_css_="";}
				
				if (setobj==="") {return;}
				
				if (setobj.indexOf("parsent_")===0){
					create_var.push('var __'+setobj_.replace("parsent_","")+';');
					
				}
				else
				{
					create_var.push('var _'+setobj_+';');
				}
				
				if (setobj==="self")
				{set_var.push('_'+setobj_+'=[self]');}
				else
				{
					if (setobj.indexOf("parsent_")===0){
						set_var.push('__'+setobj_.replace("parsent_","")+'=[parsent].find("'+setobj.replace("parsent_","")+'")');
						
					} else {
						set_var.push('_'+setobj_+'=[self].find("'+setobj+'")');
					}
					
				}
				
				var varline	=	"_"+setobj_;
				if (setobj.indexOf("parsent_")===0){
					varline	=	"__"+setobj_.replace("parsent_","")
				};
				
				if (animate_start!=="")
				{run=varline+animate_css_+'.stop(true,false).delay('+animate_delay+').animate('+animate_start+','+animate_easing+');';}		
				else
				{run=varline+animate_css;}
			
				if (animate_css_!=="" || animate_start!==""){runlist.push(run);	}
				if (animate_end!=="")
				{	
					run_end=varline+'.stop(true,false).delay('+animate_delay2+').animate('+animate_end+','+animate_easing2+');';
					runlist_end.push(run_end);
				}
	
			
		});
		
		var selfobj=null,parsent=null;
		self.off(".s");
		eval(create_var);
		$.each(create_var,function(index,val){eval(val);})
			self.on("mouseenter.s",function(){
			selfobj	=	$(this);
			parsent	=	$(this).parent();
			$.each(set_var,function(index,val){eval(val.replace("[self]","selfobj").replace("[parsent]","parsent"));})
			clearTimeout(time_delay);
			time_delay=setTimeout(function(){
					if(!selfobj.is(":animated"))
					{
						selfobj.addClass(obj.set_class);
						$.each(runlist,function(index,val){eval(val);});
					}
			},obj.delaytime)
		})
		.on("mouseleave.s",function(){
			clearTimeout(time_delay);
			if (selfobj.is("."+obj.set_class))
			{		
				$.each(runlist_end,function(index,val){eval(val);})	
				selfobj.removeClass(obj.set_class);
			}
		});
	
}
		
	jQuery.easing['jswing']=jQuery.easing['swing'];jQuery.extend(jQuery.easing,{def:'easeOutQuad',swing:function(x,t,b,c,d){return jQuery.easing[jQuery.easing.def](x,t,b,c,d);},easeInQuad:function(x,t,b,c,d){return c*(t/=d)*t+b;},easeOutQuad:function(x,t,b,c,d){return-c*(t/=d)*(t-2)+b;},easeInOutQuad:function(x,t,b,c,d){if((t/=d/2)<1)return c/2*t*t+b;return-c/2*((--t)*(t-2)-1)+b;},easeInCubic:function(x,t,b,c,d){return c*(t/=d)*t*t+b;},easeOutCubic:function(x,t,b,c,d){return c*((t=t/d-1)*t*t+1)+b;},easeInOutCubic:function(x,t,b,c,d){if((t/=d/2)<1)return c/2*t*t*t+b;return c/2*((t-=2)*t*t+2)+b;},easeInQuart:function(x,t,b,c,d){return c*(t/=d)*t*t*t+b;},easeOutQuart:function(x,t,b,c,d){return-c*((t=t/d-1)*t*t*t-1)+b;},easeInOutQuart:function(x,t,b,c,d){if((t/=d/2)<1)return c/2*t*t*t*t+b;return-c/2*((t-=2)*t*t*t-2)+b;},easeInQuint:function(x,t,b,c,d){return c*(t/=d)*t*t*t*t+b;},easeOutQuint:function(x,t,b,c,d){return c*((t=t/d-1)*t*t*t*t+1)+b;},easeInOutQuint:function(x,t,b,c,d){if((t/=d/2)<1)return c/2*t*t*t*t*t+b;return c/2*((t-=2)*t*t*t*t+2)+b;},easeInSine:function(x,t,b,c,d){return-c*Math.cos(t/d*(Math.PI/2))+c+b;},easeOutSine:function(x,t,b,c,d){return c*Math.sin(t/d*(Math.PI/2))+b;},easeInOutSine:function(x,t,b,c,d){return-c/2*(Math.cos(Math.PI*t/d)-1)+b;},easeInExpo:function(x,t,b,c,d){return(t==0)?b:c*Math.pow(2,10*(t/d-1))+b;},easeOutExpo:function(x,t,b,c,d){return(t==d)?b+c:c*(-Math.pow(2,-10*t/d)+1)+b;},easeInOutExpo:function(x,t,b,c,d){if(t==0)return b;if(t==d)return b+c;if((t/=d/2)<1)return c/2*Math.pow(2,10*(t-1))+b;return c/2*(-Math.pow(2,-10*--t)+2)+b;},easeInCirc:function(x,t,b,c,d){return-c*(Math.sqrt(1-(t/=d)*t)-1)+b;},easeOutCirc:function(x,t,b,c,d){return c*Math.sqrt(1-(t=t/d-1)*t)+b;},easeInOutCirc:function(x,t,b,c,d){if((t/=d/2)<1)return-c/2*(Math.sqrt(1-t*t)-1)+b;return c/2*(Math.sqrt(1-(t-=2)*t)+1)+b;},easeInElastic:function(x,t,b,c,d){var s=1.70158;var p=0;var a=c;if(t==0)return b;if((t/=d)==1)return b+c;if(!p)p=d*.3;if(a<Math.abs(c)){a=c;var s=p/4;}
else var s=p/(2*Math.PI)*Math.asin(c/a);return-(a*Math.pow(2,10*(t-=1))*Math.sin((t*d-s)*(2*Math.PI)/p))+b;},easeOutElastic:function(x,t,b,c,d){var s=1.70158;var p=0;var a=c;if(t==0)return b;if((t/=d)==1)return b+c;if(!p)p=d*.3;if(a<Math.abs(c)){a=c;var s=p/4;}
else var s=p/(2*Math.PI)*Math.asin(c/a);return a*Math.pow(2,-10*t)*Math.sin((t*d-s)*(2*Math.PI)/p)+c+b;},easeInOutElastic:function(x,t,b,c,d){var s=1.70158;var p=0;var a=c;if(t==0)return b;if((t/=d/2)==2)return b+c;if(!p)p=d*(.3*1.5);if(a<Math.abs(c)){a=c;var s=p/4;}
else var s=p/(2*Math.PI)*Math.asin(c/a);if(t<1)return-.5*(a*Math.pow(2,10*(t-=1))*Math.sin((t*d-s)*(2*Math.PI)/p))+b;return a*Math.pow(2,-10*(t-=1))*Math.sin((t*d-s)*(2*Math.PI)/p)*.5+c+b;},easeInBack:function(x,t,b,c,d,s){if(s==undefined)s=1.70158;return c*(t/=d)*t*((s+1)*t-s)+b;},easeOutBack:function(x,t,b,c,d,s){if(s==undefined)s=1.70158;return c*((t=t/d-1)*t*((s+1)*t+s)+1)+b;},easeInOutBack:function(x,t,b,c,d,s){if(s==undefined)s=1.70158;if((t/=d/2)<1)return c/2*(t*t*(((s*=(1.525))+1)*t-s))+b;return c/2*((t-=2)*t*(((s*=(1.525))+1)*t+s)+2)+b;},easeInBounce:function(x,t,b,c,d){return c-jQuery.easing.easeOutBounce(x,d-t,0,c,d)+b;},easeOutBounce:function(x,t,b,c,d){if((t/=d)<(1/2.75)){return c*(7.5625*t*t)+b;}else if(t<(2/2.75)){return c*(7.5625*(t-=(1.5/2.75))*t+.75)+b;}else if(t<(2.5/2.75)){return c*(7.5625*(t-=(2.25/2.75))*t+.9375)+b;}else{return c*(7.5625*(t-=(2.625/2.75))*t+.984375)+b;}},easeInOutBounce:function(x,t,b,c,d){if(t<d/2)return jQuery.easing.easeInBounce(x,t*2,0,c,d)*.5+b;return jQuery.easing.easeOutBounce(x,t*2-d,0,c,d)*.5+c*.5+b;}});



