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

	      /*Ajax Form Handling*/
    $("#faqForm,#contactFormMain,#orderFormSmall,#callbackModal,#requestForm,#callbackFormModal,#contactModal,#contactBossModal").submit(function(e){
      var $form            =  $(this);
      var $generalErrors    = $('#general_errors_'+$(this).attr("id"));
    //hide all errors
    $('.error_message').hide().html('');
    $generalErrors.hide().html('');
     //jquery ajax shortcut
      $.post(
          //form url (Freeform autodetects ajax)
          $form.attr('action'),
          //form params
          $form.serialize(),
          //data handler
          function(data)
          {
              if (data.success == false)
              {
                  //data.errors
                  $.each(data.errors, function(i, item){
                      var $errorHolder = $form.find('[name="' + i + '"]').next('.error_message');
                      $errorHolder = ($errorHolder.length == 0) ? $form.find('[name="' + i + '"]').parent().parent().find('.error_message') : $errorHolder;
                      var error         = ($.isArray(item) ? item.join('<br/>') : item);
                      $form.find('[name="' + i + '"]').parent().addClass('has-error');
                       //does the error holder field exist?
                      if ($errorHolder.length > 0)
                      {
                          $errorHolder.append('<p class="text-danger">' + error + '</p>').show();
                      }
                      //lets add it to general errors
                      else
                      {
                          //$generalErrors.append('<p class="text-danger">' + error + '</p>').show();
                      }
                  });
              }
              else if (data.success)
              {
                $form.find("i.fa-paper-plane").removeClass('fa-paper-plane').addClass('fa-spinner fa-spin');
                setTimeout(function(){
                  if ($form.attr("id").match("^orderFormSmall-")) {
                    $form.parent().parent().append('<div class="alert alert-success" role="alert">Спасибо. Ваша заявка отправлена.</div>').show(); 
                  } else {
                    $generalErrors.append('<div class="alert alert-success" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>Спасибо. Ваша заявка отправлена.</div>').show();                    
                  }
                  $form[0].reset();
                  $('div.has-error').removeClass('has-error');
                  $form.find("i.fa-spinner").removeClass('fa-spinner fa-spin').addClass('fa-paper-plane');
                }, 1500);                        
              }
          }
      );
      e.preventDefault();
      return false;
    });
    /*Ajax Form Handling*/
    
});

