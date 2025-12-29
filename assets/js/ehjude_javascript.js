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

    // Block any accordion actions when clicking inside expanded content
    $(document).on('click touchend', '.job-details-container', function(e) {
        e.stopPropagation();
        // Let scrolling and other interactions happen normally within content
        // Just prevent the event from bubbling up to trigger accordion close
    });

    // SINGLE accordion implementation
    $("#experience").on("click", ".job-target-container", function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        // Get the associated panel
        var panel = $(this).next('.job-details-container');
        var isCurrentlyOpen = $(this).hasClass('active');
        
        if (isMobile()) {
            // Mobile behavior - simple toggle WITHOUT auto-scroll
            if (isCurrentlyOpen) {
                // Close this panel
                $(this).removeClass('active');
                panel.slideUp(300);
            } else {
                // Close all other panels first
                $('.job-target-container').removeClass('active');
                $('.job-details-container').slideUp(300);
                
                // Open this panel
                $(this).addClass('active');
                panel.slideDown(300);
                
                // REMOVE THE AUTO-SCROLL - this was causing the conflict
                // User can scroll manually without interference
            }
        } else {
            // Desktop behavior - your existing complex layout changes
            var currentMaxWidth = $('.job-target-outer-container', this).css('max-width');
            var isCurrentlyOpenDesktop = false;
            
            if (currentMaxWidth === 'none') {
                isCurrentlyOpenDesktop = true;
            } else {
                var maxWidthValue = parseInt(currentMaxWidth);
                if (!isNaN(maxWidthValue) && maxWidthValue > 1050) {
                    isCurrentlyOpenDesktop = true;
                } else if (currentMaxWidth === '100%' || currentMaxWidth.includes('%')) {
                    isCurrentlyOpenDesktop = true;
                }
            }
            
            var detailsVisible = panel.is(':visible');
            
            if (isCurrentlyOpenDesktop || detailsVisible) {
                // Close this accordion
                $('.job-details-container').hide();
                $('.job-target-outer-container', this).css({'max-width': '1050px'});
                $('.job-outer-container', this).css({
                    'padding-left': '25px',
                    'border-top': '0px',
                    'border-radius': '5px'
                });
                $('.job-inner-container', this).css({'width': '899px'});
            } else { 
                // Close all other accordions first 
                $('.job-target-outer-container').not(this).css({'max-width': '1050px'});
                $('.job-outer-container').not($(this).find('.job-outer-container')).css({
                    'padding-left': '25px',
                    'border-top': '0px',
                    'border-radius': '5px'
                });
                $('.job-inner-container').not($(this).find('.job-inner-container')).css({'width': '899px'});
                $('.job-details-container').hide();

                // Open this accordion with responsive widths
                var windowWidth = $(window).width();
                var containerWidth = windowWidth > 1200 ? '100%' : '95%';
                var innerWidth = windowWidth > 1200 ? '1150px' : 'calc(100% - 105px)';
                var paddingLeft = windowWidth > 1200 ? '175px' : '20px';

                $('.job-target-outer-container', this).css({'max-width': containerWidth});
                $('.job-outer-container', this).css({
                    'padding-left': paddingLeft,
                    'border-top': '1px solid #ccd0d2',
                    'border-radius': '0'
                });
                $('.job-inner-container', this).css({'width': innerWidth});

                panel.show();

                $([document.documentElement, document.body]).animate({
                    scrollTop: $('.job-outer-container', this).offset().top - 60
                }, 700);
            }
        }
    });

    // Window resize handler
    $(window).on('resize', function() {
        $('.job-target-container').removeClass('active');
        $('.job-target-outer-container').css({'max-width': '1050px'});
        $('.job-outer-container').css({
            'padding-left': '25px',
            'background-color': '#fff',
            'border-top': '0px',
            'border-radius': '5px'
        });
        
        if (isMobile()) {
            $('.job-inner-container').css({
                'border-top': 'none',
                'color': '#181819'
            });
        } else {
            $('.job-inner-container').css({
                'width': '899px',
                'border-top': '1px solid #ccd0d2',
                'color': '#181819'
            });
        }

        $('.job-company').css({
            'color': '#0065a3',
            'visibility': 'initial'
        });
        $('.job-date-arrow').css({'right': '0'});
        $('.experience-arrow').attr('src','assets/images/arrow.png');
        $('.job-title-company').css({'width': '664px'});
        $('.job-icon').css('top','-10px');
        $('.job-icon-container').css({
            'height':'66px',
            'width': 'initial'
        });
        $('.job-title').css({
            'top': '0',
            'font-size': '26px'
        });
        
        $('.job-details-container').hide();
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
