// Masonry
$(function() {
var $container = $('#folio-thumbs');
  $container.imagesLoaded( function(){ 
    $container.show();
    $('#loading').hide();       
    $container.masonry({
      itemSelector: '.box',
      columnWidth: 70,
	  gutterWidth: 10
    });   
  });
});
// Retina images
$(function () {
	if (window.devicePixelRatio == 2) {
          var images = $("img.retina");
		  for(var i = 0; i < images.length; i++) {

            var imageType = images[i].src.substr(-4);
            var imageName = images[i].src.substr(0, images[i].src.length - 4);
            imageName += "@2x" + imageType;

            images[i].src = imageName;
          }
     }
});

// Fancybox
$(document).ready(function() {
	$(".inline").fancybox({
		autoSize	: true,
		closeClick	: true,
		openEffect	: 'elastic',
		closeEffect	: 'fade',
		helpers: {
        overlay: {
            locked: false
        	}
    	}
	});
});

// Panel Toggles
$(document).ready(function(){
	$(".trigger1").click(function(){
		$(this).find("img").toggleClass("pulled");
		$("#contact").toggle("fast").toggleClass("active");
		return false;
	});
	$(".trigger2").click(function(){
		$(this).find("img").toggleClass("pulled");
		$("#audio").toggle("fast").toggleClass("active");
		return false;
	});
});

// Audio Player
$(function() { 
        // Setup the player to autoplay the next track
        var a = audiojs.createAll({
          trackEnded: function() {
            var next = $('ol li.playing').next();
            if (!next.length) next = $('ol li').first();
            next.addClass('playing').siblings().removeClass('playing');
            audio.load($('a', next).attr('data-src'));
            audio.play();
          }
        });
        
        // Load in the first track
        var audio = a[0];
            first = $('ol a').attr('data-src');
        $('ol li').first().addClass('playing');
        audio.load(first);

        // Load in a track on click
        $('ol li').click(function(e) {
          e.preventDefault();
          $(this).addClass('playing').siblings().removeClass('playing');
          audio.load($('a', this).attr('data-src'));
          audio.play();
        });      
});

// Contact Form
var request;
var response;
$("#contact-form").submit(function(event){
    if (request) {
        request.abort();
    }
	
    var $form = $(this);
	var message = $.trim($("#message").val())
	
	//check for message
    if(message == "") {
		$('#error span').replaceWith('<span>Not much point sending without a message.</span>');
		$('#error').fadeIn();
		$('#message').addClass('required');
    	return false;
	}
	
	//submit the form
	var $inputs = $form.find("input, textarea");
    var serializedData = $form.serialize();

    $inputs.prop("disabled", true);
	$form.fadeOut(400);
	$('#response p').replaceWith('<p>Sending...</p>');
	$('#response').delay(500).fadeIn();

    // fire off the request
    request = $.ajax({
        url: "process-contact.php",
        type: "post",
        data: serializedData,
		dataType: "json"
    });

    // callback handlers
    request.done(function (response, textStatus, jqXHR){
		console.log("Hooray, it worked!"+
            textStatus);
		if(response.status == "1") {
        	$('#response p').fadeOut().replaceWith('<p><strong>Sweet!</strong> Thanks for that. I will be in touch.</p>').fadeIn();
		} else {
			$('#response').fadeOut(400);
			$('#error span').replaceWith('<span>Boo! Something sketchy happened. Try again?</span>');
			$('#error').fadeIn();
			$form.delay(750).fadeIn();
		}
    });

    request.fail(function (jqXHR, textStatus, errorThrown){
        console.error(
            "The following error occured: "+
            textStatus, errorThrown
        );
		$('#response').fadeOut(400);
		$('#error span').replaceWith('<span>Bummer! That was a no go. Try again?</span>');
		$('#error').fadeIn();
		$form.delay(750).fadeIn();
    });

    request.always(function () {
        $inputs.prop("disabled", false);
    });

    event.preventDefault();

});