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
      if (typeof obj.$items.attr(name) !== 'undefined') {
        return (obj.$items.attr(name) === 'true');
      } else {
        return value;
      }
    },

    getDataInt: function(obj, name, value) {
      if (typeof obj.$items.attr(name) !== 'undefined') {
        return parseInt(obj.$items.attr(name));
      } else {
        return value;
      }
    }
  };

  Drupal.beanStyleCarousel = function($bean) {

    // Get assorted handles.
    var obj = this;
    this.$bean = $bean;
    this.$items = $('> .items', this.$bean);
    this.getDataInt = Drupal.behaviors.beanStyleCarousel.getDataInt;
    this.getDataBoolean = Drupal.behaviors.beanStyleCarousel.getDataBoolean;

    // On Owl Carousel initialization and change events, determine position and
    // set bean classes to configure visibility of previous and next arrows.
    this.$bean.on('change.owl.carousel refreshed.owl.carousel', function(e) {
      var $items = $(e.target).find('.owl-item');
      var numVisible = parseInt(e.page.size);
      var indexCurrent = e.hasOwnProperty('property') ? parseInt(e.property.value) : 0;
      var indexLast = e.item.count - 1;
      var indexLastVisible = indexCurrent + (numVisible - 2);

      // If there's a neighbor to the right of the last visible item, consider
      // it the last item instead.
      if ($items.eq(indexLastVisible).next().length) {
        ++indexLastVisible;
      }

      // Is the user at either end of the carousel?  If so, hide the previous
      // and/or next links as needed.
      obj.$items.toggleClass('at-start', indexCurrent <= 0);
      obj.$items.toggleClass('at-end', indexLastVisible >= indexLast);
      obj.$items.toggleClass('past-start', indexCurrent > 0);
    });

    // Instantiate Owl Carousel.
    this.owl = this.$items.owlCarousel({
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

    // If an off-canvas element is tapped, trigger a next or previous transition
    // on the carousel rather than allowing the link to be traveled.
    this.$items.on('click', 'a', function(e) {
      var $owlItem = $(this).closest('.owl-item');
      if (!$owlItem.hasClass('active')) {
        e.preventDefault();
        e.stopPropagation();
        var trigger = $owlItem.next().hasClass('active') ? 'prev' : 'next';
        obj.owl.trigger(trigger + '.owl.carousel');
      }
    });
  }

})(jQuery);
