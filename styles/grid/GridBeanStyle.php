<?php

/**
 * @file
 * Grid style for beans.
 */

class GridBeanStyle extends ListBeanStyle {
  protected $type = 'grid';
  protected $display_mode = 'grid';
  protected $theme_function = 'bean_style_grid';

  /**
   * Implements parent::prepareView().
   */
  public function prepareView($build, $bean) {
    $build = parent::prepareView($build, $bean);

    if ($bean->type == 'ombugallery') {
      $build['field_slide']['#access'] = FALSE;
    }

    return $build;
  }

  /**
   * Implements parent::prepareItems().
   */
  protected function prepareItems($build, $type) {
    // Handle special case of gallery tiles.
    if ($type == 'ombugallery') {
      $this->prepareGalleryItems($build);
    }
    else {
      parent::prepareItems($build, $type);
    }
  }

  /**
   * Build Gallery items for grid.
   */
  protected function prepareGalleryItems($build) {
    foreach (element_children($build['field_slide']) as $delta) {
      $this->items[] = $build['field_slide'][$delta];
    }
  }
}
