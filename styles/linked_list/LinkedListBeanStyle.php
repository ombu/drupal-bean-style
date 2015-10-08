<?php

/**
 * @file
 * Linked list style for solr bean.
 */

class LinkedListBeanStyle extends ListBeanStyle {
  /**
   * Implements parent::prepareNodeItems().
   */
  protected function prepareNodeItems($build) {
    if (isset($build['#nodes'])) {
      foreach ($build['#nodes'] as $node) {
        $this->items[] = $this->prepareLinkTheme('node/' . $node->nid, $node->title, 'node', $node);
      }
    }
  }

  /**
   * Implements parent::prepareFeaturedItems().
   */
  protected function prepareFeaturedItems($build) {
    foreach ($build['#featured_content'] as $content) {
      $this->items[] = $this->prepareLinkTheme('node/' . $content['entity']->nid, $content['entity']->title, 'featured', $content['entity']);
    }
  }

  /**
   * Implements parent::prepareSolrItems().
   */
  protected function prepareSolrItems($build) {
    if (!empty($build['search']['search_results']['#results'])) {
      foreach ($build['search']['search_results']['#results'] as $result) {
        $this->items[] = $this->prepareLinkTheme('node/' . $result['fields']['entity_id'], $result['title'], 'solr', $result);
      }
    }
  }

  /**
   * Build link theme array.
   */
  protected function prepareLinkTheme($path, $title, $type, $entity) {
    return array(
      '#theme' => array('bean_style_linked_list_link__' . $type, 'bean_style_linked_list_link'),
      '#entity' => $entity,
      '#text' => $title,
      '#path' => $path,
    );
  }
}
