jQuery(document).ready(function($) {
	var galleryItems = $('.cd-gallery').children('li');

	galleryItems.each(function(){
		var container = $(this),
			sliderDots = createSliderDots(container);
		updatePrice(container, 0);

		sliderDots.on('click', function(){
			var selectedDot = $(this);
			if(!selectedDot.hasClass('selected')) {
				var selectedPosition = selectedDot.index(),
					activePosition = container.find('.cd-item-wrapper .selected').index();
				if( activePosition < selectedPosition) {
					nextSlide(container, sliderDots, selectedPosition);
				} else {
					prevSlide(container, sliderDots, selectedPosition);
				}

				updatePrice(container, selectedPosition);
			}
		});

		container.find('.cd-item-wrapper').on('swipeleft', function(){
			var wrapper = $(this);
			if( !wrapper.find('.selected').is(':last-child') ) {
				var selectedPosition = container.find('.cd-item-wrapper .selected').index() + 1;
				nextSlide(container, sliderDots);
				updatePrice(container, selectedPosition);
			}
		});

		container.find('.cd-item-wrapper').on('swiperight', function(){
			var wrapper = $(this);
			if( !wrapper.find('.selected').is(':first-child') ) {
				var selectedPosition = container.find('.cd-item-wrapper .selected').index() - 1;
				prevSlide(container, sliderDots);
				updatePrice(container, selectedPosition);
			}
		});

		container.on('mouseover', '.move-right, .move-left', function(event){
			hoverItem($(this), true);
		});
		container.on('mouseleave', '.move-right, .move-left', function(event){
			hoverItem($(this), false);
		});

		container.on('click', '.move-right, .move-left', function(event){
			event.preventDefault();
			if ( $(this).hasClass('move-right') ) {
				var selectedPosition = container.find('.cd-item-wrapper .selected').index() + 1;
				nextSlide(container, sliderDots);
			} else {
				var selectedPosition = container.find('.cd-item-wrapper .selected').index() - 1;
				prevSlide(container, sliderDots);
			}
			updatePrice(container, selectedPosition);
		});
	});

	function createSliderDots(container){
		var dotsWrapper = $('<ol class="cd-dots"></ol>').insertAfter(container.children('a'));
		container.find('.cd-item-wrapper li').each(function(index){
			var dotWrapper = (index == 0) ? $('<li class="selected"></li>') : $('<li></li>'),
				dot = $('<a href="#0"></a>').appendTo(dotWrapper);
			dotWrapper.appendTo(dotsWrapper);
			dot.text(index+1);
		});
		return dotsWrapper.children('li');
	}

	function hoverItem(item, bool) {
		( item.hasClass('move-right') )
			? item.toggleClass('hover', bool).siblings('.selected, .move-left').toggleClass('focus-on-right', bool)
			: item.toggleClass('hover', bool).siblings('.selected, .move-right').toggleClass('focus-on-left', bool);
	}

	function nextSlide(container, dots, n){
		var visibleSlide = container.find('.cd-item-wrapper .selected'),
			navigationDot = container.find('.cd-dots .selected');
		if(typeof n === 'undefined') n = visibleSlide.index() + 1;
		visibleSlide.removeClass('selected');
		container.find('.cd-item-wrapper li').eq(n).addClass('selected').removeClass('move-right hover').prevAll().removeClass('move-right move-left focus-on-right').addClass('hide-left').end().prev().removeClass('hide-left').addClass('move-left').end().next().addClass('move-right');
		navigationDot.removeClass('selected')
		dots.eq(n).addClass('selected');
	}

	function prevSlide(container, dots, n){
		var visibleSlide = container.find('.cd-item-wrapper .selected'),
			navigationDot = container.find('.cd-dots .selected');
		if(typeof n === 'undefined') n = visibleSlide.index() - 1;
		visibleSlide.removeClass('selected focus-on-left');
		container.find('.cd-item-wrapper li').eq(n).addClass('selected').removeClass('move-left hide-left hover').nextAll().removeClass('hide-left move-right move-left focus-on-left').end().next().addClass('move-right').end().prev().removeClass('hide-left').addClass('move-left');
		navigationDot.removeClass('selected');
		dots.eq(n).addClass('selected');
	}

	function updatePrice(container, n) {
		var priceTag = container.find('.cd-price'),
			selectedItem = container.find('.cd-item-wrapper li').eq(n);
		if( selectedItem.data('sale') ) { 
			priceTag.addClass('on-sale');
			var newPriceTag = ( priceTag.next('.cd-new-price').length > 0 ) ? priceTag.next('.cd-new-price') : $('<em class="cd-new-price"></em>').insertAfter(priceTag);
			newPriceTag.text(selectedItem.data('price'));
			setTimeout(function(){ newPriceTag.addClass('is-visible'); }, 100);
		} else {
			priceTag.removeClass('on-sale').next('.cd-new-price').removeClass('is-visible').on('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
				priceTag.next('.cd-new-price').remove();
			});
		}
	}
});