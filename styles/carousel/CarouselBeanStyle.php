<?php

/**
 * @file
 * Carousel style for beans.
 */

class CarouselBeanStyle extends ListBeanStyle {
  protected $type = 'carousel';
  protected $theme_function = 'bean_style_carousel';
  protected $display_mode = 'grid';
  protected $image_style = FALSE;

  /**
   * Constructor.
   */
  public function __construct($info) {
    parent::__construct($info);

    if (!$this->image_style) {
      $this->image_style = variable_get('bean_style_carousel_image_style', 'bootstrap_slideshow');
    }
  }

  /**
   * Implements parent::prepareView().
   */
  public function prepareView($build, $bean) {
    $build = parent::prepareView($build, $bean);

    $type = $this->bean->type;
    switch ($type) {
      case 'ombugallery':
        $build['field_slide'] = array(
          '#theme' => $this->theme_function,
          '#items' => $this->items,
          '#type' => $this->type,
        );
        unset($build['nodes']);
        break;
    }

    return $build;
  }

  /**
   * Implements parent::prepareItems().
   */
  public function prepareItems($build, $type) {
    parent::prepareItems($build, $type);

    // Build items differently depending on bean type.
    switch ($type) {
      case 'ombugallery':
        $this->prepareFieldCollectionItems($build);
        break;
    }
  }

  /**
   * Prepare items from a field collection for rendering in a slideshow.
   */
  protected function prepareFieldCollectionItems($build) {
    foreach (element_children($build['field_slide']) as $delta) {
      $fid = key($build['field_slide'][$delta]['entity']['field_collection_item']);
      $item =& $build['field_slide'][$delta]['entity']['field_collection_item'][$fid];

      if (isset($item['field_media'])) {
        $item['field_media'][0]['file']['#image_style'] = $this->image_style;
      }

      $this->items[] = $build['field_slide'][$delta];
    }
  }
}
