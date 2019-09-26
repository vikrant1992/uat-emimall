<?php
namespace Cybage\Productdetail\Observer;

use Magento\Framework\Event\ObserverInterface;

class ProductSaveBefore implements ObserverInterface
{
    /*
     *  execute on product save before
     *  Magento\Framework\Event\ObserverInterface
     */
    public function execute(\Magento\Framework\Event\Observer $observer)
    {
        $product = $observer->getProduct();
        $emiStarting=$product->getEmiStartingAt();
        if(isset($emiStarting)){
            $parsedValue = str_replace( ',', '', $emiStarting );
            $product->setEmiStartingAt($parsedValue);
        }
        return $this;
    }
}
