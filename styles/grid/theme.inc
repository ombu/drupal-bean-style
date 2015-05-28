<?php

/**
 * @file
 * Theme callbacks for grid bean style.
 */

/**
 * Theme grid style.
 */
function theme_bean_style_grid($variables) {

  // Add bean style assets.
  $path = drupal_get_path('module', 'bean_style') . '/styles/grid';
  drupal_add_css($path . '/css/bean-style-grid.css');

  // Render markup for collection of items.
  $list  = '<div class="bean-style-grid">';
  $list .= '<ul class="items">';
  foreach ($variables['items'] as $item) {
    $render = array('data' => drupal_render($item));
    $list .= '<li class="item">' . $render['data'] . '</li>';
  }
  $list .= "</ul></div>";

  return $list;
}
