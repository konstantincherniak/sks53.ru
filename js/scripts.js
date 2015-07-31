$(document).ready(function() {
	$('#carousel1').carousel({
		interval: 100000
	});
    
    $('#carousel1').on('slid.bs.carousel', function() {
    	//alert("slid");
	});
	
	if ($(".fancybox").length > 0) {
		$(".fancybox").fancybox({
			openEffect  : 'elastic',
			closeEffect : 'elastic',
			padding: 0,
			helpers : {
				title : {
					type : 'outside'
				}
			}
		});
	}
	
	if ($(".fancyfields").length > 0) {
		$(".fancyfields").fancyfields();
	}
	
	$("form input[type='text']").focus(function() {
		var defaultText = $(this).attr("data");
		if (defaultText && $(this).val() == defaultText) {
			$(this).val("").addClass("on");
		}
	}).blur(function() {
		var defaultText = $(this).attr("data");
		if (defaultText) {
			if ($(this).val() == "") {
				$(this).val(defaultText);
			}
			if ($(this).val() == "" || $(this).val() == defaultText) {
				$(this).removeClass("on");
			}
		}
	});
	
	$("#questions .button a").click(function() {
		$(this).parents(".questions-block").find(".answer").slideToggle();
		$(this).parents(".questions-block").find(".button").toggleClass("colored");
		$(this).hide().siblings().show();
		
		return false;
	});
    
});

