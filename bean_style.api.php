<?php

/**
 * @file
 * Hooks provided by the Bean styles module.
 */

/**
 * @addtogroup hooks
 * @{
 */

/**
 * Register new styles for beans.
 */
function hook_bean_style_info() {
  return array(
    'style_type' => array(
      'label'          => 'My Bean Style',
      'class'          => 'BeanStyleType',
      'bean_types'     => array(
        'rte_block',
      ),
    ),
  );
}

/**
 * Alter bean build after bean style processing.
 *
 * @param array $build
 *   Build array for bean.
 * @param array $context
 *   Context of style. Includes the following elements:
 *     - bean: the bean being displayed.
 *     - style: the bean style object.
 */
function hook_bean_style_alter(&$build, $context) {

}

/**
 * @} End of "addtogroup hooks".
 */
