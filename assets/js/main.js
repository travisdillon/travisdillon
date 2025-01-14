/*
	Massively by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var	$window = $(window),
		$body = $('body'),
		$wrapper = $('#wrapper'),
		$header = $('#header'),
		$nav = $('#nav'),
		$main = $('#main'),
		$navPanelToggle, $navPanel, $navPanelInner;

	// Breakpoints.
		breakpoints({
			default:   ['1681px',   null       ],
			xlarge:    ['1281px',   '1680px'   ],
			large:     ['981px',    '1280px'   ],
			medium:    ['737px',    '980px'    ],
			small:     ['481px',    '736px'    ],
			xsmall:    ['361px',    '480px'    ],
			xxsmall:   [null,       '360px'    ]
		});

	/**
	 * Applies parallax scrolling to an element's background image.
	 * @return {jQuery} jQuery object.
	 */
	$.fn._parallax = function(intensity) {

		var	$window = $(window),
			$this = $(this);

		if (this.length == 0 || intensity === 0)
			return $this;

		if (this.length > 1) {

			for (var i=0; i < this.length; i++)
				$(this[i])._parallax(intensity);

			return $this;

		}

		if (!intensity)
			intensity = 0.25;

		$this.each(function() {

			var $t = $(this),
				$bg = $('<div class="bg"></div>').appendTo($t),
				on, off;

			on = function() {

				$bg
					.removeClass('fixed')
					.css('transform', 'matrix(1,0,0,1,0,0)');

				$window
					.on('scroll._parallax', function() {

						var pos = parseInt($window.scrollTop()) - parseInt($t.position().top);

						$bg.css('transform', 'matrix(1,0,0,1,0,' + (pos * intensity) + ')');

					});

			};

			off = function() {

				$bg
					.addClass('fixed')
					.css('transform', 'none');

				$window
					.off('scroll._parallax');

			};

			// Disable parallax on ..
				if (browser.name == 'ie'			// IE
				||	browser.name == 'edge'			// Edge
				||	window.devicePixelRatio > 1		// Retina/HiDPI (= poor performance)
				||	browser.mobile)					// Mobile devices
					off();

			// Enable everywhere else.
				else {

					breakpoints.on('>large', on);
					breakpoints.on('<=large', off);

				}

		});

		$window
			.off('load._parallax resize._parallax')
			.on('load._parallax resize._parallax', function() {
				$window.trigger('scroll');
			});

		return $(this);

	};

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Scrolly.
		$('.scrolly').scrolly();

	// Background.
		$wrapper._parallax(0.925);

	// Nav Panel.

		// Toggle.
			$navPanelToggle = $(
				'<a href="#navPanel" id="navPanelToggle">Menu</a>'
			)
				.appendTo($wrapper);

			// Change toggle styling once we've scrolled past the header.
				$header.scrollex({
					bottom: '5vh',
					enter: function() {
						$navPanelToggle.removeClass('alt');
					},
					leave: function() {
						$navPanelToggle.addClass('alt');
					}
				});

		// Panel.
			$navPanel = $(
				'<div id="navPanel">' +
					'<nav>' +
					'</nav>' +
					'<a href="#navPanel" class="close"></a>' +
				'</div>'
			)
				.appendTo($body)
				.panel({
					delay: 500,
					hideOnClick: true,
					hideOnSwipe: true,
					resetScroll: true,
					resetForms: true,
					side: 'right',
					target: $body,
					visibleClass: 'is-navPanel-visible'
				});

			// Get inner.
				$navPanelInner = $navPanel.children('nav');

			// Move nav content on breakpoint change.
				var $navContent = $nav.children();

				breakpoints.on('>medium', function() {

					// submenus open on hover
						// $navContent.find('.opener')
						// 	.addClass('open-hover')
						// 	.removeClass('open-click');

					// NavPanel -> Nav.
						$navContent.appendTo($nav);

					// Flip icon classes.
						$nav.find('.icons, .icon')
							.removeClass('alt');

				});

				breakpoints.on('<=medium', function() {

					// submenus open on click
						// $navContent.find('.opener')
						// 	.addClass('open-click')
						// 	.removeClass('open-hover');

					// Nav -> NavPanel.
						$navContent.appendTo($navPanelInner);

					// Flip icon classes.
						$navPanelInner.find('.icons, .icon')
							.addClass('alt');

				});

			// Hack: Disable transitions on WP.
				if (browser.os == 'wp'
				&&	browser.osVersion < 10)
					$navPanel
						.css('transition', 'none');

	// Intro.
		var $intro = $('#intro');

		if ($intro.length > 0) {

			// Hack: Fix flex min-height on IE.
				if (browser.name == 'ie') {
					$window.on('resize.ie-intro-fix', function() {

						var h = $intro.height();

						if (h > $window.height())
							$intro.css('height', 'auto');
						else
							$intro.css('height', h);

					}).trigger('resize.ie-intro-fix');
				}

			// Hide intro on scroll (> small).
				breakpoints.on('>small', function() {

					$main.unscrollex();

					$main.scrollex({
						mode: 'bottom',
						top: '25vh',
						bottom: '-50vh',
						enter: function() {
							$intro.addClass('hidden');
						},
						leave: function() {
							$intro.removeClass('hidden');
						}
					});

				});

			// Hide intro on scroll (<= small).
				breakpoints.on('<=small', function() {

					$main.unscrollex();

					$main.scrollex({
						mode: 'middle',
						top: '15vh',
						bottom: '-15vh',
						enter: function() {
							$intro.addClass('hidden');
						},
						leave: function() {
							$intro.removeClass('hidden');
						}
					});

			});

		}

	// click dropdown menu
		$('.opener a').on('click', function () {
			$(this).parent().toggleClass('active-click');
		 }) // toggles the menu on click

	// sticky nav menu
		// var navTop = $('#main').offset().top - $('#nav').height();
		// var navBottom = $('#main').offset().top;
		$(window).bind('scroll', function () {
		    if ($(window).scrollTop() >= $('#main').offset().top - $('#nav').height()) { // if top of viewpane below top of navbar
		        $('#nav').addClass('sticky');
		        if ($(window).scrollTop() >= $('#main').offset().top) { // if top of viewpane below bottom of (original placing) of navbar
		        	$('#nav').addClass('sticky-low');
		        } else {
		        	$('#nav').removeClass('sticky-low');
		        }
		    } else {
		        $('#nav').removeClass('sticky');
		    }
		});

	// collapsible lists
		$('.collapsible-list li a').on('click', function () {
			var content = $(this).siblings('.collapsible-content');
			content.toggleClass('active');
			if (content.height() > 0) {
				content.css('max-height','0');
			} else {
				content.css('max-height',content.prop('scrollHeight'));
			}
		})

	// dropdown list with several options
		$('.button-dropdown-list .button').on('click', function () {
			var buttonID = $(this).attr('id');
			var content = $('#' + buttonID + '-content');
			var contentBoxID = $(this).parents('.button-dropdown-list').attr('id');
			var contentBox = $('#' + contentBoxID + '-content');
			if (content.hasClass('active')) {
				$(this).removeClass('primary');
				contentBox.css('max-height','0');
				setTimeout( () => {content.removeClass('active')}, 500); /* change the number to the current max-height transition duration */
			} else {
				$(this).parents('.button-dropdown-list').find('.button').removeClass('primary');
				$(this).addClass('primary');
				contentBox.children('.button-dropdown-content').removeClass('active');
				// contentBox.children('.button-dropdown-content-2').css('max-height','0');
				content.addClass('active');
				// content.css('max-height',content.prop('scrollHeight'));
				contentBox.css('max-height',content.prop('scrollHeight'));
			}
		})

	
	// groovy page button + counter
		$(document).ready(function () {
		  const apiUrl = 'https://api.jsonbin.io/v3/b/677ab0a9e41b4d34e4704f97';
		  const apiKey = '$2a$10$ih32TwOnyTU/KrDY4Rn7x..MrUWVBt1hybfhXkzLib5f/iX5xeDxa';
		  var localCounterValue = 0;

		  // Fetch the current counter value
		  function getCounter() {
		    $.ajax({
		      url: apiUrl,
		      headers: { 'X-Access-Key': apiKey },
		      method: 'GET',
		      success: function (data) {
		      	localCounterValue = data.record.grooveCounter;
		        $('#counter').text(localCounterValue);
		      },
		      error: function () {
		        $('#counter').text('Error');
		      },
		    });
		  }

		  // Increment the counter value
		  function incrementCounter() {
			$('#counter').text(localCounterValue + 1) // immediately increases by 1
			//then checks the actual counter value & updates
		    $.ajax({
		      url: apiUrl,
		      headers: { 'X-Access-Key': apiKey },
		      method: 'GET',
		      success: function (data) {
			localCounterValue = data.record.grooveCounter + 1;
			$.ajax({
			  url: apiUrl,
			  headers: {
			    'Content-Type': 'application/json',
			    'X-Access-Key': apiKey,
			  },
			  method: 'PUT',
			  data: JSON.stringify({ grooveCounter: localCounterValue }),
			  success: function () {
			    $('#counter').text(localCounterValue);
			  },
			});
		      },
		    });
		  }

		  $('#groove-report').on('click', function() {
			$('dialog')[0].showModal();
		  });

		  $("#cancel").on('click', function() {
			$('dialog')[0].close();
		  });

		  $("#grooveButton").on('click', function() {
			$('dialog')[0].close();
		  });

		  // Initialize
		  getCounter();
		  $('#grooveButton').on('click', incrementCounter);
		});

})(jQuery);

