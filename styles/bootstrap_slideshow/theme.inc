<?php

/**
 * @file
 * Theme callbacks for Bootstrap themed slideshow bean style.
 */

/**
 * Theme callback.
 *
 * Themes a field collection as a bootstrap slideshow.
 */
function theme_bean_style_bootstrap_slideshow($variables) {
  $items = $variables['items'];

  $output = '';

  // If there are no slides, return empty string.
  if (!$items) {
    return $output;
  }

  // Generate the parent list element, the corresponding pager list, and
  // previous/next links.
  $id_slides = drupal_html_id('ombugallery-slides');

  // Otherwise, build up the slide items and their associated pager links.
  $items = '';
  $pager = '';
  $num = 0;

  foreach ($variables['items'] as $item) {

    // Add a pager link for this slide.
    $attributes = array(
      'data-target' => '#' . $id_slides,
      'data-slide-to' => $num,
    );
    if ($num == 0) {
      $attributes['class'][] = 'active';
    }

    $pager .= '<li ' . drupal_attributes($attributes) . '></li>';

    // Extract image out to render separately.
    $fid = key($item['data']['entity']['field_collection_item']);
    $collection =& $item['data']['entity']['field_collection_item'][$fid];

    // Set image style.
    $collection['field_media'][0]['#image_style'] = 'bootstrap_slideshow';

    $attributes = array(
      'class' => array(
        'item',
      ),
    );
    if ($num == 0) {
      $attributes['class'][] = 'active';
    }

    $item = '<div ' . drupal_attributes($attributes) . '>';
    $item .= drupal_render($collection['field_media']);
    $item .= '<div class="carousel-caption">';
    $item .= drupal_render($collection);
    $item .= '</div>';
    $item .= '</div>';

    $items .= $item;
    $num++;
  }

  $pager = '<ol class="carousel-indicators">' . $pager . '</ol>';
  $slides = '<div class="carousel-inner" role="listbox">' . $items . '</div>';
  $prevnext = <<<EOD
  <a class="left carousel-control" href="#$id_slides" role="button" data-slide="prev">
    <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
    <span class="sr-only">Previous</span>
  </a>
  <a class="right carousel-control" href="#$id_slides" role="button" data-slide="next">
    <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
    <span class="sr-only">Next</span>
  </a>
EOD;

  $attributes = array(
    'id' => $id_slides,
    'class' => array(
      'carousel',
      'slide',
    ),
    'data-ride' => 'carousel',
  );

  $output = '<div ' . drupal_attributes($attributes) . '>' . $pager . $slides . $prevnext . '</div>';

  // Add js.
  drupal_add_js(drupal_get_path('theme', 'bootstrap') . '/../lib/bootstrap/js/carousel.js');

  return $output;
}
