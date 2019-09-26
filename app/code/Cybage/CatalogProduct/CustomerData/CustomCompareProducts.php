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
namespace Cybage\CatalogProduct\CustomerData;

use Magento\Catalog\CustomerData\CompareProducts;

class CustomCompareProducts extends CompareProducts
{
    /**
     * @var \Magento\Catalog\Helper\Product\Compare
     */
    protected $helper;

    /**
     * @var \Magento\Catalog\Model\Product\Url
     */
    protected $productUrl;

    /**
     * @var \Magento\Catalog\Helper\Output
     */
    private $outputHelper;

    /**
     * @param \Magento\Catalog\Helper\Product\Compare $helper
     * @param \Magento\Catalog\Model\Product\Url $productUrl
     * @param \Magento\Catalog\Helper\Output $outputHelper
     */
    public function __construct(
        \Magento\Catalog\Helper\Product\Compare $helper,
        \Magento\Catalog\Model\Product\Url $productUrl,
        \Magento\Catalog\Helper\Output $outputHelper,
        \Magento\Catalog\Model\Product $productManager,
        \Magento\Catalog\Helper\Image $imageHelper
    ) {
        $this->helper = $helper;
        $this->productUrl = $productUrl;
        $this->outputHelper = $outputHelper;
        $this->productManager = $productManager;
        $this->imageHelper = $imageHelper;
    }

    /**
     * {@inheritdoc}
     */
    public function getSectionData()
    {
        $count = $this->helper->getItemCount();
        return [
            'count' => $count,
            'countCaption' => $count == 1 ? __('1 item') : __('%1 items', $count),
            'listUrl' => $this->helper->getListUrl(),
            'items' => $count ? $this->getItems() : [],
        ];
    }

    /**
     * @return array
     */
    protected function getItems()
    {
        $items = [];
        /** @var \Magento\Catalog\Model\Product $item */
        foreach ($this->helper->getItemCollection() as $item) {
            $product = $this->productManager->load($item->getId());
            $imageUrl = $this->imageHelper->init($product, 'product_base_image')
                                                        ->constrainOnly(true)
                                                        ->keepAspectRatio(true)
                                                        ->keepTransparency(true)
                                                        ->keepFrame(false)
                                                        ->resize(150, 150)->getUrl();
            $items[] = [
                'id' => $item->getId(),
                'product_url' => $this->productUrl->getUrl($item),
                'name' => $this->outputHelper->productAttribute($item, $item->getName(), 'name'),
                'product_image' => $imageUrl,
                'remove_url' => $this->helper->getPostDataRemove($item),
            ];
        }
        return $items;
    }
}
