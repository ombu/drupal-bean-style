(function ($) {
  Drupal.behaviors.ombugallery = {
    attach: function(context, settings) {

      $('.ombugallery-slideshow:not(.ombugallery-processed)', context)
        .each(function(i, el) {
          var $slideshow = $(el);
          if ($slideshow.find('> .slides > li').length > 1) {
            var settings = $.parseJSON($slideshow.attr('data-ombugallery-settings'));
            new Drupal.slideshow($slideshow, settings);
          }
        })
        .addClass('ombugallery-processed');

    }
  }

  Drupal.slideshow = function($slideshow, settings) {
      this.settings = settings;

      this.$slideshow = $slideshow;

      this.$slides = $slideshow.find('.slides');

      // Instantiate jQuery Cycle 2 plugin.
      this.$slides.cycle(settings);

      // Pause the slideshow if the user clicks or hovers anywhere inside
      // its container element.
      this.$slideshow.on('click mouseover', $.proxy(function(e) {

        // Only prevent event propagation for clicks.  Mouseover events should
        // be allowed to propagate so that other Drupal behaviors — such as the
        // appearance of the admin gear menu icon — will remain in effect.
        if (e.type == 'click') {
          e.stopPropagation();
        }

        this.$slides.cycle('pause');
      }, this));

      // Resize the iframe on load and when the browse window is resized.
      $(window).on('resize', $.proxy(function() {
        resizeVideo(this.$slideshow, this.$slideshow.find('.file-video iframe'));
      }, this));

      resizeVideo(this.$slideshow, this.$slideshow.find('.file-video iframe'));

      this.$slides.on('cycle-update-view', $.proxy(function(event, optionHash, slideOptionsHash, currentSlideEl) {
        var $currentSlideEl = $(currentSlideEl);
        this.lazyLoadSlideImages($currentSlideEl.next('li'));
        this.lazyLoadSlideImages($currentSlideEl.prev('li'));
      }, this));

      this.$slides.on('cycle-before', $.proxy(function(event, optionHash, outgoingSlideEl, incomingSlideEl, forwardFlag) {
        this.lazyLoadSlideImages($(incomingSlideEl));
      }, this));

  }

  Drupal.slideshow.prototype.lazyLoadSlideImages = function($slide) {
    $slide
      .find('.lazy:not(.lazy-loaded)')
      .each(function(i, el) {
        $(el).replaceWith('<img class="lazy lazy-loaded" src="' + $(el).attr('data-src') + '" />');
      });
  };


  function resizeVideo($container, $video) {
    var aspectRatio = $video.attr('height') / $video.attr('width');
    var newWidth = $container.width();
    var newHeight = newWidth * aspectRatio;
    $video.attr('width', newWidth);
    $video.attr('height', newHeight);
  }
})(jQuery);
