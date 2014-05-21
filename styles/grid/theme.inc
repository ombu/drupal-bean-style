<?php

/**
 * @file
 * Theme callbacks for grid bean style.
 */

/**
 * Theme grid style.
 */
function theme_bean_style_grid($variables) {
  $grid_cols = 12;
  $items = $variables['items'];
  $type = !empty($variables['type']) ? $variables['type'] : 'grid';
  $per_row = !empty($variables['per_row']) ? $variables['per_row'] : 5;

  $items = array_chunk($items, $per_row);
  $col_classes = drupal_html_class('col-xs-' . str_replace('.', '-', $grid_cols / $per_row));
  $col_classes .= ' ' . drupal_html_class('col-xs-' . $grid_cols . '-' . $per_row);
  $rows = '';
  foreach ($items as $i => $row_items) {
    $rows .= '<div class="row">';
    foreach ($row_items as $item) {
      $rows .= '<div class="col-xs-1 ' . $col_classes . '">';
      $rows .= drupal_render($item);
      $rows .= '</div>';
    }
    $rows .= '</div>';
  }

  $path = drupal_get_path('module', 'bean_style') . '/styles/grid';
  drupal_add_css($path . '/css/grid.css');

  return '<div class="bean-style-' . $type . '"><div class="bean-style-inner">' . $rows. '</div></div>';
}
