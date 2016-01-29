<?php

/**
 * @file
 * Bean style hooks.
 */

/**
 * Implements hook_bean_style_info().
 */
function bean_style_bean_style_info() {
  return array(
    'bootstrap_slideshow' => array(
      'label'          => 'Bootstrap Slider',
      'class'          => 'BootstrapSlideshowBeanStyle',
      'bean_types'     => array(
        'ombugallery',
      ),
    ),
    'slideshow' => array(
      'label'          => 'Slider',
      'class'          => 'SlideshowBeanStyle',
      'bean_types'     => array(
        'ombugallery',
      ),
    ),
    'grid' => array(
      'label'          => 'Grid',
      'class'          => 'GridBeanStyle',
      'bean_types'     => array(
        'solr_bean',
        'bean_featured',
        'ombugallery',
      ),
    ),
    'list' => array(
      'label'          => 'List',
      'class'          => 'ListBeanStyle',
      'bean_types'     => array(
        'solr_bean',
        'bean_featured',
        'ombubeans_popular_content',
      ),
    ),
    'linked_list' => array(
      'label'          => 'Linked list',
      'class'          => 'LinkedListBeanStyle',
      'bean_types'     => array(
        'solr_bean',
        'bean_featured',
        'ombubeans_popular_content',
        'ombublog_list',
      ),
    ),
    'carousel' => array(
      'label'          => 'Carousel',
      'class'          => 'CarouselBeanStyle',
      'bean_types'     => array(
        'solr_bean',
        'bean_featured',
        'ombugallery',
      ),
    ),
  );
}

/**
 * Implements hook_bean_style_options_alter().
 */
function bean_style_bean_style_options_alter(&$options, $context) {
  if ($context['bundle'] == 'ombugallery') {
    // Remove default option for slideshows, since we always want a slideshow
    // style displayed.
    unset($options['']);

    // Remove boostrap_slideshow style if bootstrap theme isn't loaded, since
    // theme is required for correct markup.
    if (variable_get('theme_default', '') != 'bootstrap') {
      unset($options['bootstrap_slideshow']);
    }
  }
  elseif ($context['bundle'] == 'bean_featured') {
    // Remove default option for featured bean.
    unset($options['']);
  }
}
