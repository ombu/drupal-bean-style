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
      items: 3,
      nav: true,
      dots: true,
      margin: 10,
      stagePadding: 0,
      responsive: {
        480:  { items: 4, margin: 20 },
        768:  { items: 5, margin: 20 },
        1024: { items: 7, margin: 20 },
      }
    });
  }

})(jQuery);
