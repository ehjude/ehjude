$(document).on("ready page:load", function (){
    // Check if we're on mobile/tablet
    function isMobile() {
        return window.innerWidth <= 1050;
    }
    
      // EXPERIENCE - Modified for responsive behavior
    $("#experience-container" ).on( "mouseenter", ".job-target-outer-container", function( event ) {
        // Skip hover effects on mobile/tablet
        if (isMobile()) {
            return;
        }
        
        // Desktop hover effects
        $('.job-outer-container', this).css({'background-color': '#0065a3'});
         $('.job-inner-container', this).css({'color': '#fff'});
         $('.job-inner-container', this).css({'border': '#fff'});
         $('.job-company', this).css({'color': '#fff'});
         $('.experience-arrow', this).attr('src','assets/images/arrow_white.png');
        $('.job-inner-container', this).css({'padding-left': '20px'});
    }).on( "mouseleave", ".job-target-container", function( event ) {
        // Skip hover effects on mobile/tablet
        if (isMobile()) {
            return;
        }
        
        // Desktop hover reset effects
        $('.job-outer-container', this).css({'background-color': '#fff'});
        $('.job-inner-container', this).css({'color': '#181819'});
         $('.job-inner-container', this).css({'border-top': '1px solid #ccd0d2'});
         $('.job-company', this).css({'color': '#0065a3'});
         $('.experience-arrow', this).attr('src','assets/images/arrow.png');
        $('.job-inner-container', this).css({'padding-left': '0'});
    });

    // FIX: Block interactions within job-details-container to prevent accidental accordion closure
    $(document).on('click touchend touchstart', '.job-details-container', function(e) {
        if (isMobile()) {
            e.stopPropagation();
        }
    });

    // FIX: Block interactions on ALL child elements within job-details-container (including <p> tags)
    $(document).on('click touchend touchstart', '.job-details-container *', function(e) {
        if (isMobile()) {
            e.stopPropagation();
        }
    });

    // Modified click handler for responsive accordion
    $("#experience" ).on( "click", ".job-target-container", function( event ) {
        event.preventDefault();
        
        if (isMobile()) {
            // Mobile accordion behavior - simplified
            var isCurrentlyOpen = $(this).hasClass('mobile-open');
            var clickedJobContainer = $(this);
            
            $('.job-target-container').removeClass('mobile-open');
            $(".job-details-container").slideUp(300);
            
            if (!isCurrentlyOpen) {
                clickedJobContainer.addClass('mobile-open');
                clickedJobContainer.next('.job-details-container').slideDown(300);
                
                setTimeout(function() {
                    $([document.documentElement, document.body]).animate({
                        // scrollTop: clickedJobContainer.offset().top - 70
                        scrollTop: clickedJobContainer.offset().top - 10
                    }, 500);
                }, 350);
            }
        } else {
            // Desktop accordion behavior - improved logic
            var currentMaxWidth = $('.job-target-outer-container', this).css('max-width');
            var isCurrentlyOpen = false;
            
            if (currentMaxWidth === 'none') {
                isCurrentlyOpen = true;
            } else {
                var maxWidthValue = parseInt(currentMaxWidth);
                if (!isNaN(maxWidthValue) && maxWidthValue > 1050) {
                    isCurrentlyOpen = true;
                } else if (currentMaxWidth === '100%' || currentMaxWidth.includes('%')) {
                    isCurrentlyOpen = true;
                }
            }
            
            var detailsVisible = $(this).next('.job-details-container').is(':visible');
            
            if (isCurrentlyOpen || detailsVisible) {
                // Close this accordion
                $(".job-details-container").hide();
                $('.job-target-outer-container', this).css({'max-width': '1050px'});
                $('.job-outer-container', this).css({
                    'padding-left': '25px',
                    'border-top': '0px',
                    'border-radius': '5px'
                });
                $('.job-inner-container', this).css({'width': '899px'}); // Restore original width
            } else { 
                // Close all other accordions first 
                $('.job-target-outer-container').not(this).css({'max-width': '1050px'});
                $('.job-outer-container').not($(this).find('.job-outer-container')).css({
                    'padding-left': '25px',
                    'border-top': '0px',
                    'border-radius': '5px'
                });
                $('.job-inner-container').not($(this).find('.job-inner-container')).css({'width': '899px'}); // Restore original width, not 'initial'
                $(".job-details-container").hide();

                // Open this accordion with responsive widths
                var windowWidth = $(window).width();
                var containerWidth = windowWidth > 1200 ? '100%' : '95%';
                var innerWidth = windowWidth > 1200 ? '1150px' : 'calc(100% - 105px)';
                var paddingLeft = windowWidth > 1200 ? '175px' : '20px';
                
                // $(this).find('.job-inner-container').css({'border-top': 'none !important'});

                $('.job-target-outer-container', this).css({'max-width': containerWidth});
                $('.job-outer-container', this).css({
                    'padding-left': paddingLeft,
                    'border-top': '1px solid #ccd0d2',
                    'border-radius': '0'
                });
                $('.job-inner-container', this).css({'width': innerWidth});

                $(this).next('.job-details-container').show();

                $([document.documentElement, document.body]).animate({
                    scrollTop: $(".job-outer-container", this).offset().top - 60
                }, 700);

                // When hovering over job title bar, change background to blue
                $("#experience-container" ).on( "mouseenter", ".job-target-outer-container", function( event ) {
                    $('.job-outer-container', this).css({'background-color': '#0065a3'});
                }).on( "mouseleave", ".job-target-container", function( event ) {
                    $('.job-outer-container', this).css({'background-color': '#fff'});
                });
            }
        }
    });







    // ????
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
		var scrollPosition = 0;
		
		$('.easy-modal').easyModal({
			top: 60,
			overlay: 0.2,
			overlayOpacity: 0.7,
			onOpen: function(myModal) {
				// Store current scroll position
				scrollPosition = $(window).scrollTop();
				
				// Disable body scrolling when modal opens
				$('body').addClass('modal-open').css('top', -scrollPosition + 'px');
			},
			onClose: function(myModal) {
				// Re-enable body scrolling when modal closes
				$('body').removeClass('modal-open').css('top', '');
				
				// Restore scroll position
				$(window).scrollTop(scrollPosition);
			}
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
			closeButtonClass: '.animated-close',
			onOpen: function(myModal) {
				// Store current scroll position
				scrollPosition = $(window).scrollTop();
				
				// Disable body scrolling when modal opens
				$('body').addClass('modal-open').css('top', -scrollPosition + 'px');
			},
			onClose: function(myModal) {
				// Re-enable body scrolling when modal closes
				$('body').removeClass('modal-open').css('top', '');
				
				// Restore scroll position
				$(window).scrollTop(scrollPosition);
			}
		});
	});

	







	// WAYPOINTS
	$(function() {

		// Do our DOM lookups beforehand
		var nav_container = $("#nav-container");
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

});

// Simplified resize handler - only for actual device orientation changes
$(window).on('orientationchange', function() {
    // Only reset on actual orientation changes, not during scrolling
    setTimeout(function() {
        $('.job-target-container').removeClass('mobile-open');
        $('.job-details-container').slideUp(0); // Instant close, no animation
        
        // Reset basic styles
        $('.job-target-outer-container').css({'max-width': '1050px'});
        $('.job-outer-container').css({
            'padding-left': '25px',
            'background-color': '#fff',
            'border-top': '0px',
            'border-radius': '5px'
        });
        $('.job-inner-container').css({'width': '899px'});
    }, 100); // Small delay to ensure orientation change is complete
});