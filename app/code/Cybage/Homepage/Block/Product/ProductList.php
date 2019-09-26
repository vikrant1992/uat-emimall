<?php

/**
 * BFL Cybage_Homepage
 *
 * @category   Cybage_Homepage
 * @package    BFL Cybage_Homepage
 * @copyright  2019 All rights reserved.
 * @license    Proprietary
 * @author     BFL (bajaj finserv limited)
 */

namespace Cybage\Homepage\Block\Product;

use Magento\Framework\App\ObjectManager;
use Magento\Framework\Serialize\Serializer\Json;
use Magento\Framework\View\LayoutFactory;
use Magento\Framework\Url\EncoderInterface;

/**
 * Catalog Products List widget block
 *
 * @SuppressWarnings(PHPMD.CouplingBetweenObjects)
 * @SuppressWarnings(PHPMD.ExcessiveParameterList)
 */
class ProductsList extends \Magento\CatalogWidget\Block\Product\ProductsList
{

    /**
     * @param \Magento\Catalog\Block\Product\Context $context
     * @param \Magento\Catalog\Model\ResourceModel\Product\CollectionFactory $productCollectionFactory
     * @param \Magento\Catalog\Model\Product\Visibility $catalogProductVisibility
     * @param \Magento\Framework\App\Http\Context $httpContext
     * @param \Magento\Rule\Model\Condition\Sql\Builder $sqlBuilder
     * @param \Magento\CatalogWidget\Model\Rule $rule
     * @param \Magento\Widget\Helper\Conditions $conditionsHelper
     * @param \Magento\Framework\Pricing\Helper\Data $priceHelper
     * @param array $data
     * @param Json $json
     * @param LayoutFactory $layoutFactory
     * @param EncoderInterface $urlEncoder
     * @param \Magento\Catalog\Model\Product $product
     */
    public function __construct(
        \Magento\Catalog\Block\Product\Context $context,
        \Magento\Catalog\Model\ResourceModel\Product\CollectionFactory $productCollectionFactory,
        \Magento\Catalog\Model\Product\Visibility $catalogProductVisibility,
        \Magento\Framework\App\Http\Context $httpContext,
        \Magento\Rule\Model\Condition\Sql\Builder $sqlBuilder,
        \Magento\CatalogWidget\Model\Rule $rule,
        \Magento\Widget\Helper\Conditions $conditionsHelper,
        \Magento\Framework\Pricing\Helper\Data $priceHelper,
        array $data = [],
        Json $json = null,
        LayoutFactory $layoutFactory = null,
        EncoderInterface $urlEncoder = null,
        \Magento\Catalog\Model\Product $product
    )
    {
        $this->productCollectionFactory = $productCollectionFactory;
        $this->catalogProductVisibility = $catalogProductVisibility;
        $this->httpContext = $httpContext;
        $this->sqlBuilder = $sqlBuilder;
        $this->rule = $rule;
        $this->conditionsHelper = $conditionsHelper;
        $this->json = $json ?: ObjectManager::getInstance()->get(Json::class);
        $this->layoutFactory = $layoutFactory ?: ObjectManager::getInstance()->get(LayoutFactory::class);
        $this->urlEncoder = $urlEncoder ?: ObjectManager::getInstance()->get(EncoderInterface::class);
        $this->priceHelper = $priceHelper;
        $this->product = $product;
        parent::__construct(
            $context,
            $productCollectionFactory,
            $catalogProductVisibility,
            $httpContext,
            $sqlBuilder,
            $rule,
            $conditionsHelper,
            $data,
            $json,
            $layoutFactory,
            $urlEncoder
        );
    }

    /**
     * @inheritdoc
     * @SuppressWarnings(PHPMD.NPathComplexity)
     */
    public function getProductPrice(
        \Magento\Catalog\Model\Product $product
    ) {
        $productData = $this->product->load($product->getId());
        return $productData->getData('emi_starting_at');
    }
}
