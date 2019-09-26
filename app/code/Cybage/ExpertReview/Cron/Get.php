<?php
/**
 * BFL Cybage_ExpertReview
 *
 * @category   Cybage_ExpertReview Module
 * @package    BFL Cybage_ExpertReview
 * @copyright  2019 All rights reserved.
 * @license    Proprietary
 * @author     BFL (bajaj finserv limited)
 */

namespace Cybage\ExpertReview\Cron;

class Get
{
        /**
     * @var \Cybage\ExpertReview\Helper\Data
     */
    protected $_data;

    /**
     *
     * @param \Cybage\ExpertReview\Helper\Data $data
     * @param \Magento\Catalog\Model\ResourceModel\Category\CollectionFactory $categoryCollectionFactory
     * @param \Magento\Catalog\Model\CategoryRepository $categoryRepository
     */
    public function __construct(
        \Cybage\ExpertReview\Helper\Data $data,
        \Magento\Catalog\Model\ResourceModel\Category\CollectionFactory $categoryCollectionFactory,
        \Magento\Catalog\Model\CategoryRepository $categoryRepository
    ) {
        $this->_data = $data;
        $this->_categoryCollectionFactory = $categoryCollectionFactory;
        $this->_categoryRepository = $categoryRepository;
    }

    /**
     * 
     * @return \Cybage\ExpertReview\Cron\Get
     */
    public function execute()
    {
        $categories = $this->get91mobilesCategories();
        if (isset($categories) && !empty($categories)) {
            foreach ($categories as $category) {
                $pageNo = 0;
                $response = $this->_data->getExpertReview($category, null, $pageNo);
            }
            return $this;
        }
    }

    /**
     * get91mobilesCategories
     * @return type
     */
    public function get91mobilesCategories()
    {
        $expertReviewsCategories = [];
        $collection = $this->_categoryCollectionFactory->create()
            ->addAttributeToSelect('91mobiles_category_id');
        
        foreach ($collection as $category) {
            $category->getEntityId();
            $categoryData = $this->_categoryRepository->get($category->getEntityId())->getData('91mobiles_category_id');
            if (isset($categoryData) && !empty($categoryData)) {
                $expertReviewsCategories[] = $categoryData;
            }
        }
        return $expertReviewsCategories;
    }
}
