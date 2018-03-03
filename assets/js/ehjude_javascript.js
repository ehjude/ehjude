$(document).on("ready page:load", function (){
	$(function() {
	  $('a[href*=#]:not([href=#])').click(function() {
	    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
	      var target = $(this.hash);
	      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
	      if (target.length) {
	        $('html,body').animate({
	          scrollTop: target.offset().top
	        }, 1000);
	        return false;
	      }
	    }
	  });
	});

	// MODAL
	$(function() {
		$('.easy-modal').easyModal({
			top: 60,
			overlay: 0.2,
			overlayOpacity: 0.7
		});

		$('.easy-modal-open').click(function(e) {
			var target = $(this).attr('href');
			$(target).trigger('openModal');
			e.preventDefault();
		});

		$('.easy-modal-close').click(function(e) {
			$('.easy-modal').trigger('closeModal');
		});

		$('.easy-modal-animated').easyModal({
			top: 60,
			overlay: 0.2,
			transitionIn: 'animated bounceInLeft',
			transitionOut: 'animated bounceOutRight',
			closeButtonClass: '.animated-close'
		});
	});


	// WAYPOINTS
	$(function() {

		// Do our DOM lookups beforehand
		var nav_container = $(".nav-container");
		var nav = $("nav");
		
		var top_spacing = 0;
		var waypoint_offset = -25;

		nav_container.waypoint({
			handler: function(event, direction) {
				
				if (direction == 'down') {
				
					nav_container.css({ 'height':nav.outerHeight() });		
					nav.stop().addClass("sticky").css("top",-nav.outerHeight()).animate({"top":top_spacing});
					
				} else {
				
					nav_container.css({ 'height':'auto' });
					nav.stop().removeClass("sticky").css("top",nav.outerHeight()+waypoint_offset).animate({"top":""});
					
				}
				
			},
			offset: function() {
				return -nav.outerHeight()-waypoint_offset;
			}
		});
		
		var sections = $("section");
		var navigation_links = $("nav a");
		
		sections.waypoint({
			handler: function(event, direction) {
			
				var active_section;
				active_section = $(this);
				if (direction === "up") active_section = active_section.prev();

				var active_link = $('nav a[href="#' + active_section.attr("id") + '"]');
				navigation_links.removeClass("selected");
				active_link.addClass("selected");

			},
			offset: '5%'
		})
		
		
		navigation_links.click( function(event) {

			$.scrollTo(
				$(this).attr("href"),
				{
					duration: 200,
					offset: { 'left':0, 'top':-0.15*$(window).height() }
				}
			);
		});
	});


	// Slideshow
	jQuery('#camera_wrap_2').camera({
		height: '600px',
		loader: 'bar',
		pagination: false,
		thumbnails: true
	});

});
