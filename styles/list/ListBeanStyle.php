<?php

/**
 * @file
 * List bean style.
 */

class ListBeanStyle extends BeanStyle {
  /**
   * Type of style to pass to theme function.
   */
  protected $type = 'list';

  /**
   * Theme function for list view.
   */
  protected $theme_function = 'bean_style_list';

  /**
   * Display mode for entity items.
   */
  protected $display_mode = 'teaser';

  /**
   * Items used to render into list style.
   * 
   */
  protected $items = array();

  /**
   * Implements parent::prepareView().
   */
  public function prepareView($build, $bean) {
    $this->items = array();

    parent::prepareView($build, $bean);

    switch ($bean->type) {
      case 'solr_bean':
        $build['search']['search_results']['#theme'] = $this->theme_function;
        $build['search']['search_results']['#items'] = $this->items;
        $build['search']['search_results']['#type']  = $this->type;
        $build['search']['#weight'] = -1;
        break;

      case 'featuredbean':
        $build['field_featured_content']['#theme'] = $this->theme_function;
        $build['field_featured_content']['#items'] = $this->items;
        $build['field_featured_content']['#type']  = $this->type;
        break;

      default:
        $build['nodes']['#theme'] = $this->theme_function;
        $build['nodes']['#items'] = $this->items;
        $build['nodes']['#type']  = $this->type;
        break;
    }

    return $build;
  }

  /**
   * Implements parent::prepareItems().
   */
  protected function prepareItems($build, $type) {
    // Build items differently depending on bean type.
    switch ($type) {
      case 'solr_bean':
        $this->prepareSolrItems($build);
        break;

      case 'featuredbean':
        $this->prepareFeaturedItems($build);
        break;

      default:
        $this->prepareNodeItems($build);
        break;
    }
  }

  /**
   * Build items for list.
   */
  protected function prepareNodeItems($build) {
    if (isset($build['#nodes'])) {
      foreach ($build['#nodes'] as $node) {
        $this->items[] = node_view($node, $this->display_mode);
      }
    }
  }

  /**
   * Build featuredbean items for list.
   */
  protected function prepareFeaturedItems($build) {
    foreach ($build['#featured_content'] as $content) {
      $this->items[] = node_view($content['entity'], $this->display_mode);
    }
  }

  /**
   * Build solr items for list.
   */
  protected function prepareSolrItems($build) {
    if (!empty($build['search']['search_results']['#results'])) {
      foreach ($build['search']['search_results']['#results'] as $result) {
        $entity_type = $result['entity_type'];
        $entity_id = $result['fields']['entity_id'];

        // Default to teaser if view mode isn't a valid node view.
        $entity_info = entity_get_info($entity_type);

        // Render entity appropriately.
        if ($entity_info) {
          $entity = entity_load($entity_type, array($entity_id));
          if ($entity) {
            $rendered_result = entity_view(
              $entity_type,
              $entity,
              $this->display_mode
            );
            $rendered_result = $rendered_result[$entity_type][$entity_id];
            $rendered_result['#result'] = $result;

            $this->items[] = $rendered_result;
          }
        }
        else {
          // todo: if result is not an entity, then render using default solr
          // result.
        }
      }
    }
  }
}
