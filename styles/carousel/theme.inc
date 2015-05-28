<?php

/**
 * @file
 * Theme callbacks for carousel bean style.
 */

/**
 * Carousel theme.
 */
function theme_bean_style_carousel(&$variables) {

  // Add theme assets.
  $path = drupal_get_path('module', 'bean_style') . '/styles/carousel';
  drupal_add_js($path . '/js/bean-style-carousel.js');
  drupal_add_js($path . '/js/vendor/owl.carousel.js');
  drupal_add_css($path . '/css/bean-style-carousel.css');

  // Render markup for collection of items.
  $list = '<div class="items">';
  foreach ($variables['items'] as $item) {
    $render = array('data' => drupal_render($item));
    $list .= '<div class="item">' . $render['data'] . '</div>';
  }
  $list .= "</div>";

  return $list;
}
