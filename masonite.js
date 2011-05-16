// $.fn.imagesLoaded jQuery plugin
// original by Paul Irish, forked for jquery.masonry by David DeSandro
// http://metafizzy.co/blog/imagesloaded-plugin
// https://gist.github.com/797120

// $('#content-with-images').imagesLoaded( myFunction )
// execute a callback when all images inside a parent have loaded.
// needed because .load() doesn't work on cached images

// Useful for Masonry or Isotope, triggering dynamic layout
// after images have loaded:
//		$('#content').imagesLoaded( function(){
//		$('#content').masonry();
//		});

// mit license. paul irish. 2010.
// webkit fix from Oren Solomianik. thx!

// callback function is passed the last image to load
//	 as an argument, and the collection as `this`


$.fn.imagesLoaded = function(callback){
	var elems = this.find('img'),
		len = elems.length,
		_this = this;

	if ( !elems.length ) {
	callback.call( this );
	}

	elems.bind('load',function(){
	if (--len <= 0){
		callback.call( _this );
	}
	}).each(function(){
	// cached images don't fire load sometimes, so we reset src.
	if (this.complete || this.complete === undefined){
		var src = this.src;
		// webkit hack from http://groups.google.com/group/jquery-dev/browse_thread/thread/eee6ab7b2da50e1f
		// data uri bypasses webkit log warning (thx doug jones)
		this.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
		this.src = src;
	}
	});

	return this;
};

/*!
// Infinite Scroll jQuery plugin
// copyright Paul Irish, licensed GPL & MIT
// version 2.0b1.110420

// home and docs: http://www.infinite-scroll.com
*/
(function($){$.fn.infinitescroll=function infscr(options,callback){function areSelectorsValid(opts){var debug=$.fn.infinitescroll._debug;for(var key in opts){if(key.indexOf&&key.indexOf("Selector")>-1&&$(opts[key]).length===0){debug("Your "+key+" found no elements.");return false}return true}}function determinePath(path){if($.isFunction(opts.pathParse)){debug("pathParse");return[path]}else{if(path.match(/^(.*?)\b2\b(.*?$)/)){path=path.match(/^(.*?)\b2\b(.*?$)/).slice(1)}else{if(path.match(/^(.*?)2(.*?$)/)){if(path.match(/^(.*?page=)2(\/.*|$)/)){path=path.match(/^(.*?page=)2(\/.*|$)/).slice(1);return path}path=path.match(/^(.*?)2(.*?$)/).slice(1)}else{if(path.match(/^(.*?page=)1(\/.*|$)/)){path=path.match(/^(.*?page=)1(\/.*|$)/).slice(1);return path}else{debug("Sorry, we couldn't parse your Next (Previous Posts) URL. Verify your the css selector points to the correct A tag. If you still get this error: yell, scream, and kindly ask for help at infinite-scroll.com.");props.isInvalidPage=true}}}}debug("determinePath",path);return path}function hiddenHeight(element){var height=0;$(element).children().each(function(){height=height+$(this).outerHeight(false)});return height}function generateInstanceID(element){var number=$(element).length+$(element).html().length+$(element).attr("class").length+$(element).attr("id").length;opts.infid=number}if(typeof options=="string"){var command=options,argument=callback,validCommand=(command=="pause"||command=="destroy"||command=="retrieve"||command=="binding"),debug=$.fn.infinitescroll._debug;argument=argument||null;command=(validCommand)?$.fn.infinitescroll[command](argument):debug("Invalid command");return false}var opts=$.infinitescroll.opts=$.extend({},$.infinitescroll.defaults,options),props=$.infinitescroll,innerContainerHeight,box,frag,desturl,pause,error,errorStatus,method,result;callback=$.fn.infinitescroll._callback=callback||function(){},debug=$.fn.infinitescroll._debug,error=$.fn.infinitescroll._error,pause=$.fn.infinitescroll.pause,destroy=$.fn.infinitescroll.destroy,binding=$.fn.infinitescroll.binding;if(!areSelectorsValid(opts)){return false}opts.container=opts.container||document.documentElement;opts.contentSelector=opts.contentSelector||this;opts.infid=(opts.infid==0)?generateInstanceID(opts.contentSelector):opts.infid;opts.loadMsgSelector=opts.loadMsgSelector||opts.contentSelector;var relurl=/(.*?\/\/).*?(\/.*)/,path=$(opts.nextSelector).attr("href");if(!path){debug("Navigation selector not found");return}opts.path=determinePath(path);props.loadingMsg=$('<div id="infscr-loading" style="text-align: center;"><img alt="Loading..." src="'+opts.loadingImg+'" /><div>'+opts.loadingText+"</div></div>");(new Image()).src=opts.loadingImg;opts.binder=(opts.container.nodeName=="HTML")?$(window):$(opts.container);innerContainerHeight=(opts.container.nodeName=="HTML")?$(document).height():innerContainerHeight=hiddenHeight(opts.container);debug("Scrolling in: ",(opts.container.nodeName=="HTML")?"window":opts.container);opts.pixelsFromNavToBottom=innerContainerHeight+(opts.container==document.documentElement?0:$(opts.container).offset().top)-$(opts.navSelector).offset().top;binding("bind");opts.binder.trigger("smartscroll.infscr."+opts.infid);return this};$.infinitescroll={defaults:{debug:false,binder:$(window),preload:false,nextSelector:"div.navigation a:first",loadingImg:"http://www.infinite-scroll.com/loading.gif",loadingText:"<em>Loading the next set of posts...</em>",donetext:"<em>Congratulations, you've reached the end of the internet.</em>",navSelector:"div.navigation",contentSelector:null,loadMsgSelector:null,loadingMsgRevealSpeed:"fast",extraScrollPx:150,itemSelector:"div.post",animate:false,pathParse:undefined,dataType:"html",appendCallback:true,bufferPx:40,orientation:"height",errorCallback:function(){},currPage:1,infid:0,isDuringAjax:false,isInvalidPage:false,isDestroyed:false,isDone:false,isPaused:false,container:undefined,pixelsFromNavToBottom:undefined,path:undefined},loadingImg:undefined,loadingMsg:undefined,currDOMChunk:null};$.fn.infinitescroll._debug=function infscr_debug(){if($.infinitescroll.opts.debug){return window.console&&console.log.call(console,arguments)}};$.fn.infinitescroll._shorthand=function infscr_shorthand(){};$.fn.infinitescroll._nearbottom=function infscr_nearbottom(){var opts=$.infinitescroll.opts,debug=$.fn.infinitescroll._debug,hiddenHeight=$.fn.infinitescroll._hiddenheight;if(opts.container.nodeName=="HTML"){var pixelsFromWindowBottomToBottom=0+$(document).height()-($(opts.container).scrollTop()||$(opts.container.ownerDocument.body).scrollTop())-$(window).height()}else{var pixelsFromWindowBottomToBottom=0+hiddenHeight(opts.container)-$(opts.container).scrollTop()-$(opts.container).height()}debug("math:",pixelsFromWindowBottomToBottom,opts.pixelsFromNavToBottom);return(pixelsFromWindowBottomToBottom-opts.bufferPx<opts.pixelsFromNavToBottom)};$.fn.infinitescroll._setup=function infscr_setup(){var props=$.infinitescroll,opts=$.infinitescroll.opts,isNearBottom=$.fn.infinitescroll._nearbottom,kickOffAjax=$.fn.infinitescroll.retrieve;if(opts.isDuringAjax||opts.isInvalidPage||opts.isDone||opts.isDestroyed||opts.isPaused){return}if(!isNearBottom(opts,props)){return}kickOffAjax()};$.fn.infinitescroll.retrieve=function infscr_retrieve(){var props=$.infinitescroll,opts=props.opts,debug=$.fn.infinitescroll._debug,loadCallback=$.fn.infinitescroll._loadcallback,error=$.fn.infinitescroll._error,path=opts.path,box,frag,desturl,method,condition;opts.isDuringAjax=true;props.loadingMsg.appendTo(opts.loadMsgSelector).show(opts.loadingMsgRevealSpeed,function(){$(opts.navSelector).hide();opts.currPage++;debug("heading into ajax",path);box=$(opts.contentSelector).is("table")?$("<tbody/>"):$("<div/>");desturl=($.isFunction(opts.pathParse))?opts.pathParse(path.join("2"),opts.currPage):desturl=path.join(opts.currPage);method=(opts.dataType=="html"||opts.dataType=="json")?opts.dataType:"html+callback";if(opts.appendCallback&&opts.dataType=="html"){method+="+callback"}switch(method){case"html+callback":debug("Using HTML via .load() method");box.load(desturl+" "+opts.itemSelector,null,function(jqXHR,textStatus){loadCallback(box,jqXHR.responseText)});break;case"html":case"json":debug("Using "+(method.toUpperCase())+" via $.ajax() method");$.ajax({url:desturl,dataType:opts.dataType,complete:function _infscrAjax(jqXHR,textStatus){condition=(typeof(jqXHR.isResolved)!=="undefined")?(jqXHR.isResolved()):(textStatus==="success"||textStatus==="notmodified");(condition)?loadCallback(box,jqXHR.responseText):error([404])}});break}})};$.fn.infinitescroll._loadcallback=function infscr_loadcallback(box,data){var props=$.infinitescroll,opts=$.infinitescroll.opts,error=$.fn.infinitescroll._error,showDoneMsg=$.fn.infinitescroll._donemsg,callback=$.fn.infinitescroll._callback,result,frag;result=(opts.isDone)?"done":(!opts.appendCallback)?"no-append":"append";switch(result){case"done":showDoneMsg();return false;break;case"no-append":if(opts.dataType=="html"){data="<div>"+data+"</div>";data=$(data).find(opts.itemSelector)}break;case"append":var children=box.children();if(children.length==0||children.hasClass("error404")){return error([404])}frag=document.createDocumentFragment();while(box[0].firstChild){frag.appendChild(box[0].firstChild)}$(opts.contentSelector)[0].appendChild(frag);data=children.get();break}props.loadingMsg.fadeOut("normal");if(opts.animate){var scrollTo=$(window).scrollTop()+$("#infscr-loading").height()+opts.extraScrollPx+"px";$("html,body").animate({scrollTop:scrollTo},800,function(){opts.isDuringAjax=false})}if(!opts.animate){opts.isDuringAjax=false}callback.call($(opts.contentSelector)[0],data)};$.fn.infinitescroll._donemsg=function infscr_donemsg(){var props=$.infinitescroll,opts=$.infinitescroll.opts;props.loadingMsg.find("img").hide().parent().find("div").html(opts.donetext).animate({opacity:1},2000,function(){$(this).parent().fadeOut("normal")});opts.errorCallback()};$.fn.infinitescroll.pause=function infscr_pause(pause){var debug=$.fn.infinitescroll._debug,opts=$.infinitescroll.opts;if(pause!=="pause"&&pause!=="resume"&&pause!=="toggle"&&pause!==null){debug("Invalid argument. Toggling pause value instead")}pause=(pause&&(pause=="pause"||pause=="resume"))?pause:"toggle";switch(pause){case"pause":opts.isPaused=true;break;case"resume":opts.isPaused=false;break;case"toggle":opts.isPaused=!opts.isPaused;break}debug("Paused",opts.isPaused);return false};$.fn.infinitescroll._error=function infscr_error(xhr){var opts=$.infinitescroll.opts,binder=(opts.container.nodeName=="HTML")?$(window):$(opts.container),debug=$.fn.infinitescroll._debug,showDoneMsg=$.fn.infinitescroll._donemsg,error=(!opts.isDone&&xhr==404)?"end":(opts.isDestroyed&&xhr==302)?"destroy":"unknown";switch(error){case"end":debug("Page not found. Self-destructing...");showDoneMsg();opts.isDone=true;opts.currPage=1;opts.isPaused=false;binder.unbind("smartscroll.infscr."+opts.infid);break;case"destroy":debug("Destroyed. Going to next instance...");opts.isDone=true;opts.currPage=1;opts.isPaused=false;binder.unbind("smartscroll.infscr."+opts.infid);break;case"unknown":debug("Unknown Error. WHAT DID YOU DO?!...");showDoneMsg();opts.isDone=true;opts.currPage=1;binder.unbind("smartscroll.infscr."+opts.infid);break}};$.fn.infinitescroll.destroy=function infscr_destroy(){var opts=$.infinitescroll.opts,error=$.fn.infinitescroll._error;opts.isDestroyed=true;return error([302])};$.fn.infinitescroll.binding=function infscr_binding(binding){var opts=$.infinitescroll.opts,setup=$.fn.infinitescroll._setup,error=$.fn.infinitescroll._error,debug=$.fn.infinitescroll._debug;switch(binding){case"bind":opts.binder.bind("smartscroll.infscr."+opts.infid,setup);break;case"unbind":opts.binder.unbind("smartscroll.infscr."+opts.infid);break}debug("Binding",binding);return false};var event=$.event,scrollTimeout;event.special.smartscroll={setup:function(){$(this).bind("scroll",event.special.smartscroll.handler)},teardown:function(){$(this).unbind("scroll",event.special.smartscroll.handler)},handler:function(event,execAsap){var context=this,args=arguments;event.type="smartscroll";if(scrollTimeout){clearTimeout(scrollTimeout)}scrollTimeout=setTimeout(function(){jQuery.event.handle.apply(context,args)},execAsap==="execAsap"?0:100)}};$.fn.smartscroll=function(fn){return fn?this.bind("smartscroll",fn):this.trigger("smartscroll",["execAsap"])}})(jQuery);

// ColorBox v1.3.17.1 - a full featured, light-weight, customizable lightbox based on jQuery 1.3+
// Copyright (c) 2011 Jack Moore - jack@colorpowered.com
// Licensed under the MIT license: http://www.opensource.org/licenses/mit-license.php
(function(a,b,c){function bc(b){if(!T){O=b,_(a.extend(J,a.data(O,e))),x=a(O),P=0,J.rel!=="nofollow"&&(x=a("."+X).filter(function(){var b=a.data(this,e).rel||this.rel;return b===J.rel}),P=x.index(O),P===-1&&(x=x.add(O),P=x.length-1));if(!R){R=S=!0,q.show();if(J.returnFocus)try{O.blur(),a(O).one(k,function(){try{this.focus()}catch(a){}})}catch(c){}p.css({opacity:+J.opacity,cursor:J.overlayClose?"pointer":"auto"}).show(),J.w=Z(J.initialWidth,"x"),J.h=Z(J.initialHeight,"y"),W.position(0),n&&y.bind("resize."+o+" scroll."+o,function(){p.css({width:y.width(),height:y.height(),top:y.scrollTop(),left:y.scrollLeft()})}).trigger("resize."+o),ba(g,J.onOpen),I.add(C).hide(),H.html(J.close).show()}W.load(!0)}}function bb(){var a,b=f+"Slideshow_",c="click."+f,d,e,g;J.slideshow&&x[1]?(d=function(){E.text(J.slideshowStop).unbind(c).bind(i,function(){if(P<x.length-1||J.loop)a=setTimeout(W.next,J.slideshowSpeed)}).bind(h,function(){clearTimeout(a)}).one(c+" "+j,e),q.removeClass(b+"off").addClass(b+"on"),a=setTimeout(W.next,J.slideshowSpeed)},e=function(){clearTimeout(a),E.text(J.slideshowStart).unbind([i,h,j,c].join(" ")).one(c,d),q.removeClass(b+"on").addClass(b+"off")},J.slideshowAuto?d():e()):q.removeClass(b+"off "+b+"on")}function ba(b,c){c&&c.call(O),a.event.trigger(b)}function _(b){for(var c in b)a.isFunction(b[c])&&c.substring(0,2)!=="on"&&(b[c]=b[c].call(O));b.rel=b.rel||O.rel||"nofollow",b.href=b.href||a(O).attr("href"),b.title=b.title||O.title,typeof b.href=="string"&&(b.href=a.trim(b.href))}function $(a){return J.photo||/\.(gif|png|jpg|jpeg|bmp)(?:\?([^#]*))?(?:#(\.*))?$/i.test(a)}function Z(a,b){b=b==="x"?y.width():y.height();return typeof a=="string"?Math.round(/%/.test(a)?b/100*parseInt(a,10):parseInt(a,10)):a}function Y(c,d){var e=b.createElement("div");c&&(e.id=f+c),e.style.cssText=d||"";return a(e)}var d={transition:"elastic",speed:300,width:!1,initialWidth:"600",innerWidth:!1,maxWidth:!1,height:!1,initialHeight:"450",innerHeight:!1,maxHeight:!1,scalePhotos:!0,scrolling:!0,inline:!1,html:!1,iframe:!1,fastIframe:!0,photo:!1,href:!1,title:!1,rel:!1,opacity:.9,preloading:!0,current:"image {current} of {total}",previous:"previous",next:"next",close:"close",open:!1,returnFocus:!0,loop:!0,slideshow:!1,slideshowAuto:!0,slideshowSpeed:2500,slideshowStart:"start slideshow",slideshowStop:"stop slideshow",onOpen:!1,onLoad:!1,onComplete:!1,onCleanup:!1,onClosed:!1,overlayClose:!0,escKey:!0,arrowKey:!0,top:!1,bottom:!1,left:!1,right:!1,fixed:!1,data:!1},e="colorbox",f="cbox",g=f+"_open",h=f+"_load",i=f+"_complete",j=f+"_cleanup",k=f+"_closed",l=f+"_purge",m=a.browser.msie&&!a.support.opacity,n=m&&a.browser.version<7,o=f+"_IE6",p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F,G,H,I,J={},K,L,M,N,O,P,Q,R,S,T,U,V,W,X=f+"Element";W=a.fn[e]=a[e]=function(b,c){var f=this,g;if(!f[0]&&f.selector)return f;b=b||{},c&&(b.onComplete=c);if(!f[0]||f.selector===undefined)f=a("<a/>"),b.open=!0;f.each(function(){a.data(this,e,a.extend({},a.data(this,e)||d,b)),a(this).addClass(X)}),g=b.open,a.isFunction(g)&&(g=g.call(f)),g&&bc(f[0]);return f},W.init=function(){y=a(c),q=Y().attr({id:e,"class":m?f+(n?"IE6":"IE"):""}),p=Y("Overlay",n?"position:absolute":"").hide(),r=Y("Wrapper"),s=Y("Content").append(z=Y("LoadedContent","width:0; height:0; overflow:hidden"),B=Y("LoadingOverlay").add(Y("LoadingGraphic")),C=Y("Title"),D=Y("Current"),F=Y("Next"),G=Y("Previous"),E=Y("Slideshow").bind(g,bb),H=Y("Close")),r.append(Y().append(Y("TopLeft"),t=Y("TopCenter"),Y("TopRight")),Y(!1,"clear:left").append(u=Y("MiddleLeft"),s,v=Y("MiddleRight")),Y(!1,"clear:left").append(Y("BottomLeft"),w=Y("BottomCenter"),Y("BottomRight"))).children().children().css({"float":"left"}),A=Y(!1,"position:absolute; width:9999px; visibility:hidden; display:none"),a("body").prepend(p,q.append(r,A)),s.children().hover(function(){a(this).addClass("hover")},function(){a(this).removeClass("hover")}).addClass("hover"),K=t.height()+w.height()+s.outerHeight(!0)-s.height(),L=u.width()+v.width()+s.outerWidth(!0)-s.width(),M=z.outerHeight(!0),N=z.outerWidth(!0),q.css({"padding-bottom":K,"padding-right":L}).hide(),F.click(function(){W.next()}),G.click(function(){W.prev()}),H.click(function(){W.close()}),I=F.add(G).add(D).add(E),s.children().removeClass("hover"),p.click(function(){J.overlayClose&&W.close()}),a(b).bind("keydown."+f,function(a){var b=a.keyCode;R&&J.escKey&&b===27&&(a.preventDefault(),W.close()),R&&J.arrowKey&&x[1]&&(b===37?(a.preventDefault(),G.click()):b===39&&(a.preventDefault(),F.click()))})},W.remove=function(){q.add(p).remove(),a("."+X).removeData(e).removeClass(X)},W.position=function(a,c){function g(a){t[0].style.width=w[0].style.width=s[0].style.width=a.style.width,B[0].style.height=B[1].style.height=s[0].style.height=u[0].style.height=v[0].style.height=a.style.height}var d,e=0,f=0;q.hide(),J.fixed&&!n?q.css({position:"fixed"}):(e=y.scrollTop(),f=y.scrollLeft(),q.css({position:"absolute"})),J.right!==!1?f+=Math.max(y.width()-J.w-N-L-Z(J.right,"x"),0):J.left!==!1?f+=Z(J.left,"x"):f+=Math.max(y.width()-J.w-N-L,0)/2,J.bottom!==!1?e+=Math.max(b.documentElement.clientHeight-J.h-M-K-Z(J.bottom,"y"),0):J.top!==!1?e+=Z(J.top,"y"):e+=Math.max(b.documentElement.clientHeight-J.h-M-K,0)/2,q.show(),d=q.width()===J.w+N&&q.height()===J.h+M?0:a,r[0].style.width=r[0].style.height="9999px",q.dequeue().animate({width:J.w+N,height:J.h+M,top:e,left:f},{duration:d,complete:function(){g(this),S=!1,r[0].style.width=J.w+N+L+"px",r[0].style.height=J.h+M+K+"px",c&&c()},step:function(){g(this)}})},W.resize=function(a){if(R){a=a||{},a.width&&(J.w=Z(a.width,"x")-N-L),a.innerWidth&&(J.w=Z(a.innerWidth,"x")),z.css({width:J.w}),a.height&&(J.h=Z(a.height,"y")-M-K),a.innerHeight&&(J.h=Z(a.innerHeight,"y"));if(!a.innerHeight&&!a.height){var b=z.wrapInner("<div style='overflow:auto'></div>").children();J.h=b.height(),b.replaceWith(b.children())}z.css({height:J.h}),W.position(J.transition==="none"?0:J.speed)}},W.prep=function(b){function h(b){W.position(b,function(){function o(){m&&q[0].style.removeAttribute("filter")}var b,d,g,h,j=x.length,k,n;!R||(n=function(){clearTimeout(V),B.hide(),ba(i,J.onComplete)},m&&Q&&z.fadeIn(100),C.html(J.title).add(z).show(),j>1?(typeof J.current=="string"&&D.html(J.current.replace(/\{current\}/,P+1).replace(/\{total\}/,j)).show(),F[J.loop||P<j-1?"show":"hide"]().html(J.next),G[J.loop||P?"show":"hide"]().html(J.previous),b=P?x[P-1]:x[j-1],g=P<j-1?x[P+1]:x[0],J.slideshow&&E.show(),J.preloading&&(h=a.data(g,e).href||g.href,d=a.data(b,e).href||b.href,h=a.isFunction(h)?h.call(g):h,d=a.isFunction(d)?d.call(b):d,$(h)&&(a("<img/>")[0].src=h),$(d)&&(a("<img/>")[0].src=d))):I.hide(),J.iframe?(k=a("<iframe/>").addClass(f+"Iframe")[0],J.fastIframe?n():a(k).one("load",n),k.name=f+ +(new Date),k.src=J.href,J.scrolling||(k.scrolling="no"),m&&(k.frameBorder=0,k.allowTransparency="true"),a(k).appendTo(z).one(l,function(){k.src="//about:blank"})):n(),J.transition==="fade"?q.fadeTo(c,1,o):o(),y.bind("resize."+f,function(){W.position(0)}))})}function g(){J.h=J.h||z.height(),J.h=J.mh&&J.mh<J.h?J.mh:J.h;return J.h}function d(){J.w=J.w||z.width(),J.w=J.mw&&J.mw<J.w?J.mw:J.w;return J.w}if(!!R){var c=J.transition==="none"?0:J.speed;y.unbind("resize."+f),z.remove(),z=Y("LoadedContent").html(b),z.hide().appendTo(A.show()).css({width:d(),overflow:J.scrolling?"auto":"hidden"}).css({height:g()}).prependTo(s),A.hide(),a(Q).css({"float":"none"}),n&&a("select").not(q.find("select")).filter(function(){return this.style.visibility!=="hidden"}).css({visibility:"hidden"}).one(j,function(){this.style.visibility="inherit"}),J.transition==="fade"?q.fadeTo(c,0,function(){h(0)}):h(c)}},W.load=function(b){var c,d,g=W.prep;S=!0,Q=!1,O=x[P],b||_(a.extend(J,a.data(O,e))),ba(l),ba(h,J.onLoad),J.h=J.height?Z(J.height,"y")-M-K:J.innerHeight&&Z(J.innerHeight,"y"),J.w=J.width?Z(J.width,"x")-N-L:J.innerWidth&&Z(J.innerWidth,"x"),J.mw=J.w,J.mh=J.h,J.maxWidth&&(J.mw=Z(J.maxWidth,"x")-N-L,J.mw=J.w&&J.w<J.mw?J.w:J.mw),J.maxHeight&&(J.mh=Z(J.maxHeight,"y")-M-K,J.mh=J.h&&J.h<J.mh?J.h:J.mh),c=J.href,V=setTimeout(function(){B.show()},100),J.inline?(Y().hide().insertBefore(a(c)[0]).one(l,function(){a(this).replaceWith(z.children())}),g(a(c))):J.iframe?g(" "):J.html?g(J.html):$(c)?(a(Q=new Image).addClass(f+"Photo").error(function(){J.title=!1,g(Y("Error").text("This image could not be loaded"))}).load(function(){var a;Q.onload=null,J.scalePhotos&&(d=function(){Q.height-=Q.height*a,Q.width-=Q.width*a},J.mw&&Q.width>J.mw&&(a=(Q.width-J.mw)/Q.width,d()),J.mh&&Q.height>J.mh&&(a=(Q.height-J.mh)/Q.height,d())),J.h&&(Q.style.marginTop=Math.max(J.h-Q.height,0)/2+"px"),x[1]&&(P<x.length-1||J.loop)&&(Q.style.cursor="pointer",Q.onclick=function(){W.next()}),m&&(Q.style.msInterpolationMode="bicubic"),setTimeout(function(){g(Q)},1)}),setTimeout(function(){Q.src=c},1)):c&&A.load(c,J.data,function(b,c,d){g(c==="error"?Y("Error").text("Request unsuccessful: "+d.statusText):a(this).contents())})},W.next=function(){!S&&x[1]&&(P<x.length-1||J.loop)&&(P=P<x.length-1?P+1:0,W.load())},W.prev=function(){!S&&x[1]&&(P||J.loop)&&(P=P?P-1:x.length-1,W.load())},W.close=function(){R&&!T&&(T=!0,R=!1,ba(j,J.onCleanup),y.unbind("."+f+" ."+o),p.fadeTo(200,0),q.stop().fadeTo(300,0,function(){q.add(p).css({opacity:1,cursor:"auto"}).hide(),ba(l),z.remove(),setTimeout(function(){T=!1,ba(k,J.onClosed)},1)}))},W.element=function(){return a(O)},W.settings=d,U=function(a){a.button!==0&&typeof a.button!="undefined"||a.ctrlKey||a.shiftKey||a.altKey||(a.preventDefault(),bc(this))},a.fn.delegate?a(b).delegate("."+X,"click",U):a("."+X).live("click",U),a(W.init)})(jQuery,document,this)

/**
 * --------------------------------------------------------------------
 * jQuery-Plugin "pngFix"
 * Version: 1.1, 11.09.2007
 * by Andreas Eberhard, andreas.eberhard@gmail.com
 *						http://jquery.andreaseberhard.de/
 *
 * Copyright (c) 2007 Andreas Eberhard
 * Licensed under GPL (http://www.opensource.org/licenses/gpl-license.php)
 */
eval(function(p,a,c,k,e,r){e=function(c){return(c<62?'':e(parseInt(c/62)))+((c=c%62)>35?String.fromCharCode(c+29):c.toString(36))};if('0'.replace(0,e)==0){while(c--)r[e(c)]=k[c];k=[function(e){return r[e]||e}];e=function(){return'([237-9n-zA-Z]|1\\w)'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('(s(m){3.fn.pngFix=s(c){c=3.extend({P:\'blank.gif\'},c);8 e=(o.Q=="t R S"&&T(o.u)==4&&o.u.A("U 5.5")!=-1);8 f=(o.Q=="t R S"&&T(o.u)==4&&o.u.A("U 6.0")!=-1);p(3.browser.msie&&(e||f)){3(2).B("img[n$=.C]").D(s(){3(2).7(\'q\',3(2).q());3(2).7(\'r\',3(2).r());8 a=\'\';8 b=\'\';8 g=(3(2).7(\'E\'))?\'E="\'+3(2).7(\'E\')+\'" \':\'\';8 h=(3(2).7(\'F\'))?\'F="\'+3(2).7(\'F\')+\'" \':\'\';8 i=(3(2).7(\'G\'))?\'G="\'+3(2).7(\'G\')+\'" \':\'\';8 j=(3(2).7(\'H\'))?\'H="\'+3(2).7(\'H\')+\'" \':\'\';8 k=(3(2).7(\'V\'))?\'float:\'+3(2).7(\'V\')+\';\':\'\';8 d=(3(2).parent().7(\'href\'))?\'cursor:hand;\':\'\';p(2.9.v){a+=\'v:\'+2.9.v+\';\';2.9.v=\'\'}p(2.9.w){a+=\'w:\'+2.9.w+\';\';2.9.w=\'\'}p(2.9.x){a+=\'x:\'+2.9.x+\';\';2.9.x=\'\'}8 l=(2.9.cssText);b+=\'<y \'+g+h+i+j;b+=\'9="W:X;white-space:pre-line;Y:Z-10;I:transparent;\'+k+d;b+=\'q:\'+3(2).q()+\'z;r:\'+3(2).r()+\'z;\';b+=\'J:K:L.t.M(n=\\\'\'+3(2).7(\'n\')+\'\\\', N=\\\'O\\\');\';b+=l+\'"></y>\';p(a!=\'\'){b=\'<y 9="W:X;Y:Z-10;\'+a+d+\'q:\'+3(2).q()+\'z;r:\'+3(2).r()+\'z;">\'+b+\'</y>\'}3(2).hide();3(2).after(b)});3(2).B("*").D(s(){8 a=3(2).11(\'I-12\');p(a.A(".C")!=-1){8 b=a.13(\'url("\')[1].13(\'")\')[0];3(2).11(\'I-12\',\'none\');3(2).14(0).15.J="K:L.t.M(n=\'"+b+"\',N=\'O\')"}});3(2).B("input[n$=.C]").D(s(){8 a=3(2).7(\'n\');3(2).14(0).15.J=\'K:L.t.M(n=\\\'\'+a+\'\\\', N=\\\'O\\\');\';3(2).7(\'n\',c.P)})}return 3}})(3);',[],68,'||this|jQuery||||attr|var|style||||||||||||||src|navigator|if|width|height|function|Microsoft|appVersion|border|padding|margin|span|px|indexOf|find|png|each|id|class|title|alt|background|filter|progid|DXImageTransform|AlphaImageLoader|sizingMethod|scale|blankgif|appName|Internet|Explorer|parseInt|MSIE|align|position|relative|display|inline|block|css|image|split|get|runtimeStyle'.split('|'),0,{}))

/*
 * jQuery Easing v1.3 - http://gsgd.co.uk/sandbox/jquery/easing/
 *
 * Uses the built in easing capabilities added In jQuery 1.1
 * to offer multiple easing options
 *
 * TERMS OF USE - jQuery Easing
 *
 * Open source under the BSD License.
 *
 * Copyright Â© 2008 George McGinley Smith
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *
 * Redistributions of source code must retain the above copyright notice, this list of
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list
 * of conditions and the following disclaimer in the documentation and/or other materials
 * provided with the distribution.
 *
 * Neither the name of the author nor the names of contributors may be used to endorse
 * or promote products derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *	COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *	EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *	GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *	NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED
 * OF THE POSSIBILITY OF SUCH DAMAGE.
 *
*/

// t: current time, b: begInnIng value, c: change In value, d: duration
jQuery.easing['jswing'] = jQuery.easing['swing'];

jQuery.extend( jQuery.easing,
{
	def: 'easeOutQuad',
	swing: function (x, t, b, c, d) {
		//alert(jQuery.easing.default);
		return jQuery.easing[jQuery.easing.def](x, t, b, c, d);
	},
	easeInQuad: function (x, t, b, c, d) {
		return c*(t/=d)*t + b;
	},
	easeOutQuad: function (x, t, b, c, d) {
		return -c *(t/=d)*(t-2) + b;
	},
	easeInOutQuad: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t + b;
		return -c/2 * ((--t)*(t-2) - 1) + b;
	},
	easeInCubic: function (x, t, b, c, d) {
		return c*(t/=d)*t*t + b;
	},
	easeOutCubic: function (x, t, b, c, d) {
		return c*((t=t/d-1)*t*t + 1) + b;
	},
	easeInOutCubic: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t + b;
		return c/2*((t-=2)*t*t + 2) + b;
	},
	easeInQuart: function (x, t, b, c, d) {
		return c*(t/=d)*t*t*t + b;
	},
	easeOutQuart: function (x, t, b, c, d) {
		return -c * ((t=t/d-1)*t*t*t - 1) + b;
	},
	easeInOutQuart: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
		return -c/2 * ((t-=2)*t*t*t - 2) + b;
	},
	easeInQuint: function (x, t, b, c, d) {
		return c*(t/=d)*t*t*t*t + b;
	},
	easeOutQuint: function (x, t, b, c, d) {
		return c*((t=t/d-1)*t*t*t*t + 1) + b;
	},
	easeInOutQuint: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
		return c/2*((t-=2)*t*t*t*t + 2) + b;
	},
	easeInSine: function (x, t, b, c, d) {
		return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
	},
	easeOutSine: function (x, t, b, c, d) {
		return c * Math.sin(t/d * (Math.PI/2)) + b;
	},
	easeInOutSine: function (x, t, b, c, d) {
		return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
	},
	easeInExpo: function (x, t, b, c, d) {
		return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
	},
	easeOutExpo: function (x, t, b, c, d) {
		return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
	},
	easeInOutExpo: function (x, t, b, c, d) {
		if (t==0) return b;
		if (t==d) return b+c;
		if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
		return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
	},
	easeInCirc: function (x, t, b, c, d) {
		return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
	},
	easeOutCirc: function (x, t, b, c, d) {
		return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
	},
	easeInOutCirc: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
		return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
	},
	easeInElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;	 if ((t/=d)==1) return b+c;	 if (!p) p=d*.3;
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
	},
	easeOutElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;	 if ((t/=d)==1) return b+c;	 if (!p) p=d*.3;
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
	},
	easeInOutElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;	 if ((t/=d/2)==2) return b+c;	 if (!p) p=d*(.3*1.5);
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
		return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
	},
	easeInBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c*(t/=d)*t*((s+1)*t - s) + b;
	},
	easeOutBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
	},
	easeInOutBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
		return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
	},
	easeInBounce: function (x, t, b, c, d) {
		return c - jQuery.easing.easeOutBounce (x, d-t, 0, c, d) + b;
	},
	easeOutBounce: function (x, t, b, c, d) {
		if ((t/=d) < (1/2.75)) {
			return c*(7.5625*t*t) + b;
		} else if (t < (2/2.75)) {
			return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
		} else if (t < (2.5/2.75)) {
			return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
		} else {
			return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
		}
	},
	easeInOutBounce: function (x, t, b, c, d) {
		if (t < d/2) return jQuery.easing.easeInBounce (x, t*2, 0, c, d) * .5 + b;
		return jQuery.easing.easeOutBounce (x, t*2-d, 0, c, d) * .5 + c*.5 + b;
	}
});

/*
 *
 * TERMS OF USE - EASING EQUATIONS
 *
 * Open source under the BSD License.
 *
 * Copyright Â© 2001 Robert Penner
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *
 * Redistributions of source code must retain the above copyright notice, this list of
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list
 * of conditions and the following disclaimer in the documentation and/or other materials
 * provided with the distribution.
 *
 * Neither the name of the author nor the names of contributors may be used to endorse
 * or promote products derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *	COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *	EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *	GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *	NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED
 * OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 */

/*************************************************
**	jQuery Masonry version 1.3.2
**	Copyright David DeSandro, licensed MIT
**	http://desandro.com/resources/jquery-masonry
**************************************************/
(function(e){var n=e.event,o;n.special.smartresize={setup:function(){e(this).bind("resize",n.special.smartresize.handler)},teardown:function(){e(this).unbind("resize",n.special.smartresize.handler)},handler:function(j,l){var g=this,d=arguments;j.type="smartresize";o&&clearTimeout(o);o=setTimeout(function(){jQuery.event.handle.apply(g,d)},l==="execAsap"?0:100)}};e.fn.smartresize=function(j){return j?this.bind("smartresize",j):this.trigger("smartresize",["execAsap"])};e.fn.masonry=function(j,l){var g=
{getBricks:function(d,b,a){var c=a.itemSelector===undefined;b.$bricks=a.appendedContent===undefined?c?d.children():d.find(a.itemSelector):c?a.appendedContent:a.appendedContent.filter(a.itemSelector)},placeBrick:function(d,b,a,c,h){b=Math.min.apply(Math,a);for(var i=b+d.outerHeight(true),f=a.length,k=f,m=c.colCount+1-f;f--;)if(a[f]==b)k=f;d.applyStyle({left:c.colW*k+c.posLeft,top:b},e.extend(true,{},h.animationOptions));for(f=0;f<m;f++)c.colY[k+f]=i},setup:function(d,b,a){g.getBricks(d,a,b);if(a.masoned)a.previousData=
d.data("masonry");a.colW=b.columnWidth===undefined?a.masoned?a.previousData.colW:a.$bricks.outerWidth(true):b.columnWidth;a.colCount=Math.floor(d.width()/a.colW);a.colCount=Math.max(a.colCount,1)},arrange:function(d,b,a){var c;if(!a.masoned||b.appendedContent!==undefined)a.$bricks.css("position","absolute");if(a.masoned){a.posTop=a.previousData.posTop;a.posLeft=a.previousData.posLeft}else{d.css("position","relative");var h=e(document.createElement("div"));d.prepend(h);a.posTop=Math.round(h.position().top);
a.posLeft=Math.round(h.position().left);h.remove()}if(a.masoned&&b.appendedContent!==undefined){a.colY=a.previousData.colY;for(c=a.previousData.colCount;c<a.colCount;c++)a.colY[c]=a.posTop}else{a.colY=[];for(c=a.colCount;c--;)a.colY.push(a.posTop)}e.fn.applyStyle=a.masoned&&b.animate?e.fn.animate:e.fn.css;b.singleMode?a.$bricks.each(function(){var i=e(this);g.placeBrick(i,a.colCount,a.colY,a,b)}):a.$bricks.each(function(){var i=e(this),f=Math.ceil(i.outerWidth(true)/a.colW);f=Math.min(f,a.colCount);
if(f===1)g.placeBrick(i,a.colCount,a.colY,a,b);else{var k=a.colCount+1-f,m=[];for(c=0;c<k;c++){var p=a.colY.slice(c,c+f);m[c]=Math.max.apply(Math,p)}g.placeBrick(i,k,m,a,b)}});a.wallH=Math.max.apply(Math,a.colY);d.applyStyle({height:a.wallH-a.posTop},e.extend(true,[],b.animationOptions));a.masoned||setTimeout(function(){d.addClass("masoned")},1);l.call(a.$bricks);d.data("masonry",a)},resize:function(d,b,a){a.masoned=!!d.data("masonry");var c=d.data("masonry").colCount;g.setup(d,b,a);a.colCount!=c&&
g.arrange(d,b,a)}};return this.each(function(){var d=e(this),b={};b.masoned=!!d.data("masonry");var a=b.masoned?d.data("masonry").options:{},c=e.extend({},e.fn.masonry.defaults,a,j),h=a.resizeable;b.options=c.saveOptions?c:a;l=l||function(){};g.getBricks(d,b,c);if(!b.$bricks.length)return this;g.setup(d,c,b);g.arrange(d,c,b);!h&&c.resizeable&&e(window).bind("smartresize.masonry",function(){g.resize(d,c,b)});h&&!c.resizeable&&e(window).unbind("smartresize.masonry")})};e.fn.masonry.defaults={singleMode:false,
columnWidth:undefined,itemSelector:undefined,appendedContent:undefined,saveOptions:true,resizeable:true,animate:false,animationOptions:{}}})(jQuery);


$.fn.fixYouTube = function() {
	/*
		Widescreen YouTube Embeds by Matthew Buchanan & Hayden Hunter
		http://matthewbuchanan.name/451892574
		http://blog.haydenhunter.me

		Released under a Creative Commons attribution license:
		http://creativecommons.org/licenses/by/3.0/nz/
	*/
		$(this).find("embed[src^='http://www.youtube.com']").each(function() {
			// Identify and hide embed(s)
			var parent = $(this).closest('object');
			parent.css("visibility","hidden");
			var youtubeCode = parent.html();
			var params = "";
			if (youtubeCode.toLowerCase().indexOf("<param") == -1) {
				// IE doesn't return params with html(), soâ€¦
				$("param", this).each(function () {
					params += $(this).get(0).outerHTML;
				});
			}
			// Set colours in control bar to match page background
			var oldOpts = /rel=0/g;
			var newOpts = "rel=0&amp;color1=0x"+Whites+"&amp;color2=0x"+Whites;
			youtubeCode = youtubeCode.replace(oldOpts, newOpts);
			if (params != "") {
				params = params.replace(oldOpts, newOpts);
				youtubeCode = youtubeCode.replace(/<embed/i, params + "<embed");
			}
			// Extract YouTube ID and calculate ideal height
			var youtubeIDParam = $(this).attr("src");
			var youtubeIDPattern = /\/v\/([0-9A-Za-z-_]*)/;
			var youtubeID = youtubeIDParam.match(youtubeIDPattern);
			var youtubeHeight = Math.floor(parent.width() * 0.75 + 25 - 3);
			var youtubeHeightWide = Math.floor(parent.width() * 0.5625 + 25 - 3);
			// Test for widescreen aspect ratio
			$.getJSON("http://gdata.youtube.com/feeds/api/videos/" + youtubeID[1] + "?v=2&alt=json-in-script&callback=?", function (data) {
				oldOpts = /height="?([0-9]*)"?/g;
				if (data.entry.media$group.yt$aspectRatio != null) {
					newOpts = 'height="' + youtubeHeightWide + '"';
				} else {
					newOpts = 'height="' + youtubeHeight + '"';
				}
				youtubeCode = youtubeCode.replace(oldOpts, newOpts);
				if (params != "") {
					params = params.replace(oldOpts, newOpts);
					youtubeCode = youtubeCode.replace(/<embed/i, params + "<embed");
				}
				// Replace YouTube embed with new code
				parent.html(youtubeCode).css("visibility","visible");
			});

		});
   
    return $(this);
    
}

$.fn.fixVimeo = function() {
	/*
		Better Vimeo Embeds 2.1 by Matthew Buchanan
		Modelled on the Vimeo Embedinator Script
		http://mattbu.ch/tumblr/vimeo-embeds/

		Released under a Creative Commons attribution license:
		http://creativecommons.org/licenses/by/3.0/nz/
	*/
	var color = Accents;
	var opts = "title=0&byline=0&portrait=0";
	$(this).find("iframe[src^='http://player.vimeo.com']").each(function() {
		var src = $(this).attr("src");
		var w = $(this).attr("width");
		var h = $(this).attr("height");
		if (src.indexOf("?") == -1) {
			$(this).replaceWith(
				"<iframe src='"+src+"?"+opts+"&color="+
				color+"' width='"+w+"' height='"+h+
				"' frameborder='0'></iframe>"
			);
		}
	});
	$(this).find("object[data^='http://vimeo.com']").each(function() {
		var $obj = $(this);
		var data = $obj.attr("data");
		var temp = data.split("clip_id=")[1];
		var id = temp.split("&")[0];
		var server = temp.split("&")[1];
		var w = $obj.attr("width");
		var h = $obj.attr("height");
		$obj.replaceWith(
			"<iframe src='http://player.vimeo.com/video/"
			+id+"?"+server+"&"+opts+"&color="+color+
			"' width='"+w+"' height='"+h+
			"' frameborder='0'></iframe>"
		);
	});

  return $(this);

}

function webkitSearch() {
	var defaultValue = "Search"; // Default Value
	if ($.browser.webkit) {
		var sf = document.getElementById("searchfield");
		sf.setAttribute("type", "search");
		sf.setAttribute("autosave", "saved.data");
		sf.setAttribute("results", "10");
		sf.setAttribute("placeholder", defaultValue);
		$("#searchfield").addClass("webkit");
		$("#search .button").hide();
	} else {
		$("#searchfield").val(defaultValue);
		$("#searchfield").css("color", "#889");
		$("#searchfield").focus( function() {
			if ($(this).val() == defaultValue) {
				$(this).val("");
			}
			$(this).css("color", "#334");
		});
		$("#searchfield").blur( function() {
			if ($(this).val() == "") {
				$(this).val(defaultValue);
				$(this).css("color", "#889");
			}
		});
	}
}

function fadingSidebar() {
	// kudos to http://www.tumblr.com/theme/11862, wouldn't have tought about search
	$sidebar = $('#header, #copyright');
	$sidebar.css('opacity', 0.5);

	$sidebar.mouseenter(function() {
		$sidebar
		  .stop()
		  .animate({
  			opacity: 1
    	}, 250);
	}).mouseleave(function() {
		if($('#header input:focus').length == 0) {
			$sidebar
			  .stop()
			  .animate({
  				opacity: 0.5
  			}, 250);
		}
	});
}

// masonite

// remap jQuery to $
(function($){

	// ready
	$(function() {

		webkitSearch();
		fadingSidebar();

		$("a.fullsize")
			.hide()
			.colorbox({
				slideshow:true,
				slideshowAuto:false,
				speed:200,
				photo:true,
				maxWidth:"90%",
				maxHeight:"90%"});

		$posts = $('#container .post');

		$posts.fixYouTube().fixVimeo().live({
			mouseenter: function(event) {
			 $(this)
				.addClass('active')
				.find('a.fullsize')
				  .stop()
				  .fadeIn({duration: 200, easing: 'easeInOutCubic'});
				event.stopPropagation();
			},
			mouseleave: function(event) {
				$(this)
					.removeClass('active')
					.find('a.fullsize')
					  .stop()
					  .fadeOut({duration: 200, easing: 'easeInOutCubic'});
				event.stopPropagation();
			}
		});

		// fix pngs
		$(document).pngFix({blankgif:'http://static.tumblr.com/vkmldjw/LKtkxpcr0/blank.gif'});

		$("#likes li:first-child").addClass('first');
		$("#likes li:last-child").addClass('last');

		// break down according to body.class (=site section)
		// see http://somedirection.com/2008/03/14/structuring-jquery-for-speed-and-efficiency/
		// index pages
		if ( $('body#index').length ) {

			var $wall = $('#posts');

			$(window).load(function() {
				$wall.masonry({
					singleMode    : true,
					animate       : true,
					itemSelector  : '.post',
					saveOptions   : true
				});
			});

			// infinite scroll
			$wall.infinitescroll({
				navSelector     : '#pagination li.next a',   // selector for the paged navigation
				nextSelector    : '#pagination li.next a',  // selector for the NEXT link (to page 2)
				itemSelector    : '#posts .post',           // selector for all items you'll retrieve
				loadingImg      : 'http://static.tumblr.com/wccjej0/SzLlinacm/ajax-loader.gif',
				loadingText     : 'Loading next page',
				donetext        : 'No more pages to load',
				debug           : false,
				errorCallback   : function() {
					// fade out the error message after 2 seconds
					$('#infscr-loading').animate({opacity: .8},2000).fadeOut('normal');
				}
				},
				// call masonry as a callback
				function( newElements ) {
					var $elems = $(newElements);

					//set opacity to 0 for all new elements while they get arranged
					$elems.css('opacity', "0.0");

					// via http://stackoverflow.com/questions/4218377/tumblr-audio-player-not-loading-with-infinite-scroll
					// – thanks to the excellent http://inspirewell.tumblr.com/
					$elems.each(function() {
						if($(this).hasClass("audio")){
							var audioID = $(this).attr("id");
							var $audioPost = $(this);
							$audioPost.find(".player span").css({ visibility: 'hidden' });

							var script=document.createElement('script');
							script.type='text/javascript';
							script.src="http://assets.tumblr.com/javascript/tumblelog.js?16";

							$("body").append(script);

							$.ajax({
								url: "/api/read/json?id=" + audioID,
								dataType: "jsonp",
								timeout: 5000,
								success: function(data){
									$audioPost.find(".player span").css({ visibility: 'visible' });
									embed = data.posts[0]['audio-player'].replace("audio_player.swf", "audio_player_black.swf");
									$audioPost.find("span:first").append('<script type="text/javascript">replaceIfFlash(9,"audio_player_' + audioID + '",\'\x3cdiv class=\x22audio_player\x22\x3e' + embed +'\x3c/div\x3e\')</script>');
								}
							});
						}
					});

					$elems.fixYouTube().fixVimeo();

					$elems.imagesLoaded( function(){
					$wall.masonry({ appendedContent: $elems },
						function() {
							$elems.find("a.fullsize").hide().colorbox({slideshow:true, slideshowAuto:false, speed:200, photo:true, maxWidth:"90%", maxHeight:"90%"});

							$elems.animate({opacity: 1.0}, 200, 'swing');
							if(customTrigger){
								$('#pagination li.next a').fadeIn({duration: 200, easing: 'easeInOutCubic'});
							}
						}
					);
				});
			});

			if(customTrigger){
				// kill scroll binding
				$(window).unbind('.infscr');
				// hook up the manual click guy.
				$('#pagination li.next a').text('Load more posts').click(function(){
					 $(document).trigger('retrieve.infscr');
					 return false;
				});
				// remove the paginator when we're done.
				$(document).ajaxError(function(e,xhr,opt){
					 if (xhr.status == 404) $('#pagination li.next a').remove();
				});
			}

			// leftover from the original theme
			// for the yet totally untested disqus-comments
			$('#container .post .footer .comments a').each(function() {
				$(this).html($(this).text().replace('Comments',''));
				$(this).html($(this).text().replace('Comment',''));
			})

		} // body#index

	}); // ready

})(window.jQuery);