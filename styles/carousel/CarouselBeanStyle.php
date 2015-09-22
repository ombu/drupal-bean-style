<?php

/**
 * @file
 * Carousel style for beans.
 */

class CarouselBeanStyle extends ListBeanStyle {
  protected $type = 'carousel';
  protected $theme_function = 'bean_style_carousel';
  protected $display_mode = 'grid';
  protected $image_style = 'bootstrap_slideshow';

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

      if (isset($item['field_image'])) {
        $item['field_image'][0]['#image_style'] = $this->image_style;
      }

      $link = field_get_items('field_collection_item', $item['#entity'], 'field_link');
      if ($link) {
        $item['field_image'][0]['#prefix'] = '<a href="' . $link[0]['url'] . '">';
        $item['field_image'][0]['#suffix'] = '</a>';
      }

      $this->items[] = $build['field_slide'][$delta];
    }
  }
}
