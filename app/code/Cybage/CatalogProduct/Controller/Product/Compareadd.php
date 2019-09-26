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

namespace Cybage\CatalogProduct\Controller\Product;

use Magento\Catalog\Api\ProductRepositoryInterface;
use Magento\Framework\Data\Form\FormKey\Validator;
use Magento\Framework\View\Result\PageFactory;
use Magento\Framework\Controller\ResultFactory;
class Compareadd extends \Magento\Catalog\Controller\Product\Compare\Add
{

    public function __construct(
        \Magento\Framework\App\Action\Context $context,
        \Magento\Catalog\Model\Product\Compare\ItemFactory $compareItemFactory,
        \Magento\Catalog\Model\ResourceModel\Product\Compare\Item\CollectionFactory $itemCollectionFactory,
        \Magento\Customer\Model\Session $customerSession,
        \Magento\Customer\Model\Visitor $customerVisitor,
        \Magento\Catalog\Model\Product\Compare\ListCompare $catalogProductCompareList,
        \Magento\Catalog\Model\Session $catalogSession,
        \Magento\Store\Model\StoreManagerInterface $storeManager,
        Validator $formKeyValidator,
        PageFactory $resultPageFactory,
        ProductRepositoryInterface $productRepository,
        \Magento\Catalog\Helper\Product\Compare $compareHelper
    ) {
        $this->compareHelper = $compareHelper;
        
        parent::__construct(
            $context,
            $compareItemFactory,
            $itemCollectionFactory,
            $customerSession,
            $customerVisitor,
            $catalogProductCompareList,
            $catalogSession,
            $storeManager,
            $formKeyValidator,
            $resultPageFactory,
            $productRepository
        );
    }
    
    /**
     * execute
     * @return type
     */
    public function execute()
    {
        $resultRedirect = $this->resultRedirectFactory->create();
        if (!$this->_formKeyValidator->validate($this->getRequest())) {
            return $resultRedirect->setRefererUrl();
        }
        $errorFlag  = false;
        $productId = (int)$this->getRequest()->getParam('product');
        if ($productId && ($this->_customerVisitor->getId() || $this->_customerSession->isLoggedIn())) {
            $storeId = $this->_storeManager->getStore()->getId();
            try {
                $product = $this->productRepository->getById($productId, false, $storeId);
            } catch (NoSuchEntityException $e) {
                $product = null;
            }

            if ($product) {
                $collection = $this->compareHelper->getItemCollection();
                if ($collection) {
                    if ($collection->getSize() >= 3) {
                        $errorFlag = true;
                        $this->messageManager->addComplexErrorMessage(
                            'addCompareErrorMessage',
                            [
                                'msg' => __('You have already added maximum number of products. '),
                                'url' => $this->_url->getUrl('catalog/product_compare')
                            ]
                        );
                    } else {
                        foreach ($collection as $compareProduct) {
                            if ($compareProduct->getId() != $product->getId()) {
                                if ($compareProduct->getAttributeSetId() != $product->getAttributeSetId()) {
                                    $errorFlag = true;
                                    $this->messageManager->addComplexErrorMessage(
                                        'addCompareErrorMessage',
                                        [
                                            'msg' => __('You can compare product only from same category. '),
                                            'url' => $this->_url->getUrl('catalog/product_compare')
                                        ]
                                    );
                                    break;
                                }
                            }
                        }
                    }
                }
                if (!$errorFlag) {
                $this->_catalogProductCompareList->addProduct($product);
                $productName = $this->_objectManager->get(
                    \Magento\Framework\Escaper::class
                )->escapeHtml($product->getName());
                $this->messageManager->addComplexSuccessMessage(
                    'addCompareSuccessMessage',
                    [
                        'product_name' => $productName,
                        'compare_list_url' => $this->_url->getUrl('catalog/product_compare')
                    ]
                );

                $this->_eventManager->dispatch('catalog_product_compare_add_product', ['product' => $product]);
            }
            }
            $this->compareHelper->calculate();
        }
        return $resultRedirect->setRefererOrBaseUrl();
    }
}