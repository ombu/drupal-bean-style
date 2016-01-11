(function ($) {

  Drupal.behaviors.beanStyleCarousel = {
    attach: function(context, settings) {
      // Get handle to carousel bean instances.
      $carousels = $('[data-type="block"]:not(.no-behaviors) .bean-style-carousel', context);

      // Instantiate each bean.
      $carousels.each(function(i, el) {
        new Drupal.beanStyleCarousel($(el));
      });
    },

    getDataBoolean: function(obj, name, value) {
      if (typeof obj.$carousel.attr(name) !== 'undefined') {
        return (obj.$carousel.attr(name) === 'true');
      } else {
        return value;
      }
    },

    getDataInt: function(obj, name, value) {
      if (typeof obj.$carousel.attr(name) !== 'undefined') {
        return parseInt(obj.$carousel.attr(name));
      } else {
        return value;
      }
    }
  };

  Drupal.beanStyleCarousel = function($bean) {

    // Get assorted handles.
    var obj = this;
    this.$bean = $bean;
    this.$carousel = $('> .carousel > .items', this.$bean);
    this.$items = null;
    this.$clones = null;
    this.count = 0;
    this.getDataInt = Drupal.behaviors.beanStyleCarousel.getDataInt;
    this.getDataBoolean = Drupal.behaviors.beanStyleCarousel.getDataBoolean;

    // Store some constants after Owl Carousel has initialized.
    this.$carousel.on('initialized.owl.carousel', function(event) {
      obj.$items = $('.owl-item', this.$carousel);
      obj.$clones = $('.owl-item.cloned', this.$carousel);
      obj.count = event.item.count;

      setTimeout(function() {
        obj.$bean.addClass('initialized');
      }, 0);
    });

    // On Owl Carousel initialization and change events, determine position and
    // set bean classes to configure visibility of previous and next arrows.
    this.$carousel.on('change.owl.carousel refreshed.owl.carousel', function(e) {
      var $items = $(e.target).find('.owl-item');
      var numVisible = parseInt(e.page.size);
      var indexCurrent = e.hasOwnProperty('property') ? parseInt(e.property.value) : 0;
      var indexLast = obj.count - 1;
      var indexLastVisible = indexCurrent + (numVisible - 2);

      // If there's a neighbor to the right of the last visible item, consider
      // it the last item instead.
      if ($items.eq(indexLastVisible).next().length) {
        ++indexLastVisible;
      }

      // Is the user at either end of the carousel?  If so, hide the previous
      // and/or next links as needed.
      obj.$carousel.toggleClass('at-start', indexCurrent <= 0);
      obj.$carousel.toggleClass('at-end', indexLastVisible >= indexLast);
      obj.$carousel.toggleClass('past-start', indexCurrent > 0);
    });

    // In the case of looping carousels, Owl Carousel will clone the items and
    // then control their layering during transitions.  If the theme desires
    // inactive (e.g., translucent) states on entering or exiting items, these
    // clones need to be targeted manually.
    this.$carousel.on('translate.owl.carousel initialized.owl.carousel', function(event) {
      var indexBefore = event.item.index - obj.count;
      var indexAfter = event.item.index + obj.count;

      // If a clone of the active item is present before it, mark it active.
      if (indexBefore >= 0) {
        var $clone = obj.$items.eq(indexBefore);
        $clone.addClass('active-clone');
        obj.$items.not($clone).removeClass('active-clone');
      }

      // If a clone of the active item is present after it, mark it active.
      if (indexAfter <= obj.$items.length) {
        var $clone = obj.$items.eq(indexAfter);
        $clone.addClass('active-clone');
        obj.$items.not($clone).removeClass('active-clone');
      }
    });

    // Mark the active item when it concludes translation and arrives in place.
    this.$carousel.on('translated.owl.carousel', function() {
      var $active = obj.$items.filter('.active, .active-clone');
      obj.$items.removeClass('translated');
      $active.addClass('translated');
    });

    // If an off-canvas element is tapped, trigger a next or previous transition
    // on the carousel rather than allowing the link to be traveled.
    this.$carousel.on('click', 'a', function(e) {
      var $owlItem = $(this).closest('.owl-item');
      if (!$owlItem.hasClass('active')) {
        e.preventDefault();
        e.stopPropagation();
        var trigger = $owlItem.next().hasClass('active') ? 'prev' : 'next';
        obj.owl.trigger(trigger + '.owl.carousel');
      }
    });

    // Instantiate Owl Carousel.
    this.owl = this.$carousel.owlCarousel({
      items: this.getDataInt(this, 'data-items', 3),
      nav: this.getDataBoolean(this, 'data-nav', true),
      dots: this.getDataBoolean(this, 'data-dots', true),
      margin: this.getDataInt(this, 'data-margin', 10),
      loop: this.getDataBoolean(this, 'data-loop', false),
      autoplay: this.getDataBoolean(this, 'data-autoplay', false),
      autoplayTimeout: this.getDataInt(this, 'data-autoplay-timeout', 6000),
      smartSpeed: this.getDataInt(this, 'data-smart-speed', 500),
      mouseDrag: this.getDataBoolean(this, 'data-mouse-drag', true),
      stagePadding: this.getDataInt(this, 'data-stage-padding', 40),
      responsiveRefreshRate: 0,
      responsive: {
        480: {
          items: this.getDataInt(this, 'data-items-480', 4),
          margin: this.getDataInt(this, 'data-margin-480', 20),
          stagePadding: this.getDataInt(this, 'data-stage-padding-480', 40),
        },
        768: {
          items: this.getDataInt(this, 'data-items-768', 5),
          margin: this.getDataInt(this, 'data-margin-768', 20),
          stagePadding: this.getDataInt(this, 'data-stage-padding-768', 60),
        },
        992: {
          items: this.getDataInt(this, 'data-items-992', 6),
          margin: this.getDataInt(this, 'data-margin-992', 20),
          stagePadding: this.getDataInt(this, 'data-stage-padding-992', 0),
        }
      }
    });
  }

})(jQuery);
