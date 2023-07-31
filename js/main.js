$(function(){
	var scrollT=0;
	var pageN=0;
	var targetY=0;
	var winHalf;
	var transition=false;
	var categoryFlag=false;


	$(".floating_menu li").eq(pageN).addClass("active");
	$("#header nav li").eq(pageN).addClass("active");
	$("#start .controller li").eq(pageN).addClass("active");

	$(".tab").click(function(e){
		e.preventDefault();

		if($(this).hasClass("active")){
			$("body").removeClass("fixed");
			$(this).removeClass("active");
			$(".floating_menu").removeClass("active");
		}
		else{
			$("body").addClass("fixed");
			$(this).addClass("active");
			$(".floating_menu").addClass("active");
		}
	});
	$(window).scroll(function(){
		scrollT=$(window).scrollTop();

		if(scrollT <= $("#page1").offset().top-winHalf){
			pageN=0;
		}
		else if(scrollT <= $("#page2").offset().top-winHalf){
			pageN=1;
		}
		else if(scrollT <= $("#page3").offset().top-winHalf){
			pageN=2;
		}
		else if(scrollT <= $("#page4").offset().top-winHalf){
			pageN=3;

			if((scrollT+$(window).height()) == $(document).height()){
				pageN=4;
			}
		}
		else{
			pageN=4;
		}

		$(".floating_menu li").removeClass("active");
		$(".floating_menu li").eq(pageN).addClass("active");
		$("#header nav li").removeClass("active");
		$("#header nav li").eq(pageN).addClass("active");
		$("#start .controller li").removeClass("active");
		$("#start .controller li").eq(pageN).addClass("active");

		if(pageN == 1 || pageN == 3){
			$("#start .controller").addClass("dark");
			$("#header nav").addClass("dark");
			$(".logo").addClass("dark");
			$(".tab").addClass("dark");
		}
		else{
			$("#start .controller").removeClass("dark");
			$("#header nav").removeClass("dark");
			$(".logo").removeClass("dark");
			$(".tab").removeClass("dark");
		}

		if(categoryFlag){
			return;
		}
		else{
			if(pageN == 0){
				$("#header").addClass("active");
			}
			else{
				$("#page"+pageN).addClass("active");

				if(pageN == 4){
					categoryFlag=true;
				}
			}
		}
	});
	$(window).resize(function(){
		winHalf=$(window).height()/2;
		$(window).trigger("scroll");
	});
	$(window).trigger("resize");

	$("#gnb li, #start .controller li").click(function(e){
		e.preventDefault();
		pageN=$(this).index();

		if(pageN == 0){
			targetY=0;
		}
		else{
			targetY=$("#page"+pageN).offset().top;
		}

		$("html").animate({"scrollTop": targetY}, 300);
	});
	$(".floating_menu li").click(function(e){
		e.preventDefault();
		pageN=$(this).index();

		if(pageN == 0){
			targetY=0;
		}
		else{
			targetY=$("#page"+pageN).offset().top;
		}

		transition=true;
		$("body").removeClass("fixed");
		$(".tab").removeClass("active");
		$(".floating_menu").removeClass("active");
	});
	$(".floating_menu").on("transitionend", function(){
		if($(this).hasClass("active") == false && transition){
			transition=false;
			$("html").animate({"scrollTop": targetY}, 300);
		}
	});

	var videoUrl=["video1", "video2", "video3"];
	var videoTotal=videoUrl.length-1;
	var videoN=0;
	var videoPath="";
	var video=document.getElementById("my_video");
	video.muted=true;
	video.play();

	function videoDimmed(){
		$(".media video").hide().css({opacity: 0});

		setTimeout(function(){
			$(".media video").show().animate({opacity: 1}, 300);
		}, 500);
	}

	videoDimmed();

	video.addEventListener("ended", function(){
		if(videoN < videoTotal){
			videoN+=1;
		}
		else{
			videoN=0;
		}

		video.pause();
		videoPath="video/"+videoUrl[videoN]+".mp4";
		$("#my_video").attr({src: videoPath});
		video.play();
		videoDimmed();
	});
	$(".btn .left").click(function(e){
		e.preventDefault();

		if(videoN > 0){
			videoN-=1;
		}
		else{
			videoN=videoTotal;
		}

		video.pause();
		videoPath="video/"+videoUrl[videoN]+".mp4";
		$("#my_video").attr({src: videoPath});
		video.play();
		videoDimmed();
	});
	$(".btn .right").click(function(e){
		e.preventDefault();

		if(videoN < videoTotal){
			videoN+=1;
		}
		else{
			videoN=0;
		}

		video.pause();
		videoPath="video/"+videoUrl[videoN]+".mp4";
		$("#my_video").attr({src: videoPath});
		video.play();
		videoDimmed();
	});

	$("#project1").addClass("active");

	$(".project .title").click(function(e){
		var portY;
		e.preventDefault();
		$(".project").removeClass("active");
		$(this).parents(".project").addClass("active");
		portY=$(this).parents(".project").offset().top;
		$("html").animate({scrollTop: portY}, 800);
	});

	const trigger=new ScrollTrigger({
		trigger: {
			once: true,
			toggle: {
				class: {
					in: "active",
					out: "inactive"
				}
			},
			offset: {
				viewport: {
					x: 0,
					y: 0.25
				}
			}
		},
		scroll: {
			element: window,
			callback: (offset, dir) => scrollInteraction(offset.y)
		}
	});
	trigger.add("section[id^=page]")
	
});