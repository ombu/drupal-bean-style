(function ($) {

  Drupal.behaviors.beanStyleCarousel = {
    attach: function(context, settings) {
      // Instantiate this bean.
      new Drupal.beanStyleCarousel($('[data-module="bean"].carousel', context));
    }
  };

  Drupal.beanStyleCarousel = function($bean) {

    // Get assorted handles.
    this.$bean = $bean;
    this.$items = $('> .entity > .content > .items', this.$bean);

    // Instantiate Owl Carousel.
    this.owl = this.$items.owlCarousel({
      items: this.$items.attr('data-items') || 3,
      nav: true,
      dots: true,
      margin: 10,
      stagePadding: 0,
      responsive: {
        480:  { items: this.$items.attr('data-items-480')  || 4, margin: 20 },
        768:  { items: this.$items.attr('data-items-768')  || 5, margin: 20 },
        1024: { items: this.$items.attr('data-items-1024') || 6, margin: 20 },
      }
    });

  }

})(jQuery);
