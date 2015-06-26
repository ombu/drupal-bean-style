<?php

/**
 * @file
 * Theme callbacks for linked list bean style.
 */

/**
 * Simple theme function for linked list item.
 *
 * Mostly exists to be overridden.
 */
function theme_bean_style_linked_list_link($variables) {
  return theme('link', array(
    'text' => $variables['text'],
    'path' => $variables['path'],
    'options' => array(
      'html' => FALSE,
      'attributes' => array(),
    ),
  ));
}
