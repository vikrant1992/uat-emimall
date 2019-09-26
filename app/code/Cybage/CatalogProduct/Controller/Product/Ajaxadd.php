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

class Ajaxadd extends \Magento\Framework\App\Action\Action
{
    /**
     * @var JsonFactory
     */
    protected $resultJsonFactory;
    const MAX_COUNT = '3';

    /**
     *
     * @param \Magento\Framework\App\Action\Context $context
     * @param \Magento\Customer\Model\Session $customerSession
     * @param \Magento\Customer\Model\Visitor $customerVisitor
     * @param \Magento\Catalog\Model\Product\Compare\ListCompare $catalogProductCompareList
     * @param \Magento\Store\Model\StoreManagerInterface $storeManager
     * @param Validator $formKeyValidator
     * @param PageFactory $resultPageFactory
     * @param ProductRepositoryInterface $productRepository
     * @param \Magento\Catalog\Helper\Product\Compare $compareHelper
     */
    public function __construct(
        \Magento\Framework\App\Action\Context $context,
        \Magento\Customer\Model\Session $customerSession,
        \Magento\Customer\Model\Visitor $customerVisitor,
        \Magento\Catalog\Model\Product\Compare\ListCompare $catalogProductCompareList,
        \Magento\Store\Model\StoreManagerInterface $storeManager,
        Validator $formKeyValidator,
        PageFactory $resultPageFactory,
        ProductRepositoryInterface $productRepository,
        \Magento\Catalog\Helper\Product\Compare $compareHelper
    ) {
        $this->compareHelper = $compareHelper;
        $this->_storeManager = $storeManager;
        $this->_customerSession = $customerSession;
        $this->_customerVisitor = $customerVisitor;
        $this->_catalogProductCompareList = $catalogProductCompareList;
        $this->_formKeyValidator = $formKeyValidator;
        $this->resultPageFactory = $resultPageFactory;
        $this->productRepository = $productRepository;
        parent::__construct($context);
    }

    public function execute()
    {
        $errorFlag = false;
        $resultJson = $this->resultFactory->create(ResultFactory::TYPE_JSON);
        $result = [];
        if (!$this->_formKeyValidator->validate($this->getRequest())) {
            $result = [
                'success' => false,
                'error_reason' => 'invalid_form_key',
                'message' => __('Invalid Form Key. Please refresh the page.')
            ];
            return $resultJson->setData($result);
        }
        $productId = (int)$this->getRequest()->getParam('product');
        $result = $this->addProduct($productId);
        $resultJson->setData($result);
        return $resultJson;
    }
    
    public function addProduct($productId)
    {
        $errorFlag = false;
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
                    if ($collection->getSize() >= self::MAX_COUNT) {
                        $errorFlag = true;
                        $result = [
                            'success' => false,
                            'error_reason' => 'max_products',
                            'message' => __('You have already added maximum number of products')
                        ];
                    } else {
                        foreach ($collection as $compareProduct) {
                            if ($compareProduct->getId() != $product->getId()) {
                                if ($compareProduct->getAttributeSetId() != $product->getAttributeSetId()) {
                                    $errorFlag = true;
                                    $result = [
                                        'success' => false,
                                        'error_reason' => 'different_product',
                                        'message' => __('You can compare product only from same category')
                                    ];
                                    break;
                                }
                            } else {
                                $errorFlag = true;
                                $result = [
                                    'success' => false,
                                    'error_reason' => 'already_product',
                                ];
                            }
                        }
                    }
                }
                if (!$errorFlag) {
                    $this->_catalogProductCompareList->addProduct($product);
                    $this->_eventManager->dispatch('catalog_product_compare_add_product', ['product' => $product]);
                    $result = [
                        'success' => true,
                        'message' => __('Successfully added')
                    ];
                }
            }
            $this->_objectManager->get(\Magento\Catalog\Helper\Product\Compare::class)->calculate();
        }
        return $result;
    }
}
