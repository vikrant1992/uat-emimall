<?php
/**
 * BFL CatalogProduct
 *
 * @category   CatalogProduct Module
 * @package    BFL CatalogProduct
 * @copyright  2019 All rights reserved.
 * @license    Proprietary
 * @author     BFL (bajaj finserv limited)
 */

namespace Cybage\CatalogProduct\Helper\Product\Compare;

class Data extends \Magento\Catalog\Helper\Product\Compare
{
    const YES = 'Yes';
    
    /**
     * @var \Magento\Framework\Json\EncoderInterface
     */
    protected $_jsonEncoder;

    /**
     *
     * @param \Magento\Framework\App\Helper\Context $context
     * @param \Magento\Store\Model\StoreManagerInterface $storeManager
     * @param \Magento\Catalog\Model\ResourceModel\Product\Compare\Item\CollectionFactory $itemCollectionFactory
     * @param \Magento\Catalog\Model\Product\Visibility $catalogProductVisibility
     * @param \Magento\Customer\Model\Visitor $customerVisitor
     * @param \Magento\Customer\Model\Session $customerSession
     * @param \Magento\Catalog\Model\Session $catalogSession
     * @param \Magento\Framework\Data\Form\FormKey $formKey
     * @param \Magento\Wishlist\Helper\Data $wishlistHelper
     * @param \Magento\Framework\Data\Helper\PostHelper $postHelper
     */
    public function __construct(
        \Magento\Framework\App\Helper\Context $context,
        \Magento\Store\Model\StoreManagerInterface $storeManager,
        \Magento\Catalog\Model\ResourceModel\Product\Compare\Item\CollectionFactory $itemCollectionFactory,
        \Magento\Catalog\Model\Product\Visibility $catalogProductVisibility,
        \Magento\Customer\Model\Visitor $customerVisitor,
        \Magento\Customer\Model\Session $customerSession,
        \Magento\Catalog\Model\Session $catalogSession,
        \Magento\Framework\Data\Form\FormKey $formKey,
        \Magento\Wishlist\Helper\Data $wishlistHelper,
        \Magento\Framework\Data\Helper\PostHelper $postHelper
    ) {
        parent::__construct(
            $context,
            $storeManager,
            $itemCollectionFactory,
            $catalogProductVisibility,
            $customerVisitor,
            $customerSession,
            $catalogSession,
            $formKey,
            $wishlistHelper,
            $postHelper
        );
    }

    /**
     * getAjaxAddUrl
     * @return type
     */
    public function getAjaxAddUrl()
    {
        return $this->_getUrl('customcatalog/product/ajaxadd');
    }
    
    public function getAjaxPostDataParams($product)
    {
        $params = ['product' => $product->getId()];
        $requestingPageUrl = $this->_getRequest()->getParam('requesting_page_url');

        if (!empty($requestingPageUrl)) {
            $encodedUrl = $this->urlEncoder->encode($requestingPageUrl);
            $params[\Magento\Framework\App\ActionInterface::PARAM_NAME_URL_ENCODED] = $encodedUrl;
        }

        return $this->postHelper->getPostData($this->getAjaxAddUrl(), $params);
    }

    /**
     * isInCollection
     * @param type $product
     * @return boolean
     */
    public function isInCollection($product)
    {
        $collection = $this->getItemCollection();
        if ($collection) {
            foreach ($collection as $compareProduct) {
                if ($compareProduct->getId() == $product->getId()) {
                    return true;
                }
            }
        }
        return false;
    }
}
