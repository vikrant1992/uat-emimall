<?php
/**
 * BFL Cybage_CatalogProduct
 *
 * @category   Cybage_CatalogProduct
 * @package    BFL Cybage_CatalogProduct
 * @copyright  2019 All rights reserved.
 * @license    Proprietary
 * @author     BFL (bajaj finserv limited)
 */

namespace Cybage\CatalogProduct\Plugin\Model;

use Magento\Store\Model\StoreManagerInterface;

class Config
{
    /**
     * Set attributes for sorting as per requirement and unset not required default attributes
     * 
     * @param \Magento\Catalog\Model\Config $catalogConfig
     * @param array $options
     * @return array
     */
    public function afterGetAttributeUsedForSortByArray(\Magento\Catalog\Model\Config $catalogConfig, $options)
    {
        // Remove specific default sorting options
        $default_options = [];
        $default_options['name'] = $options['name'];

        unset($options['position']);
        unset($options['name']);
        unset($options['price']);
        unset($options['microwave_type']);
        unset($options['launch_date_of_the_product']);
        unset($options['capacity_tons_ac']);
        unset($options['emi_starting_at']);

        //New sorting options
        $customOption['emi_asc'] = __('EMI Amount (Low to High)');
        $customOption['emi_desc'] = __('EMI Amount (High to Low)');
        $customOption['updated_at'] = __('Newest Arrivals');
        
        //Merge default sorting options with custom options
        $options = array_merge($customOption, $options);

        return $options;
    }
}
