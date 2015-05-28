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

  // Set data options for Owl Carousel initialization.
  $options  = ' data-items="1"';
  $options .= ' data-items-480="2"';
  $options .= ' data-items-768="3"';
  $options .= ' data-items-992="4"';

  // Render markup for collection of items.
  $list  = '<div class="bean-style-carousel">';
  $list .= '<div class="items"' . $options . '>';
  foreach ($variables['items'] as $item) {
    $render = array('data' => drupal_render($item));
    $list .= '<div class="item">' . $render['data'] . '</div>';
  }
  $list .= "</div></div>";

  return $list;
}
