<?php
/**
 * BFL PstpIntegration
 *
 * @category   PstpIntegration Module
 * @package    BFL PstpIntegration
 * @copyright  2019 All rights reserved.
 * @license    Proprietary
 * @author     BFL (bajaj finserv limited)
 */

namespace Cybage\PstpIntegration\Helper;

class Data extends \Magento\Framework\App\Helper\AbstractHelper
{
    /**
     * OCP APIM SUBSCRIPTION KEY
     */
    const OCP_APIM_SUBSCRIPTION_KEY = 'api_config/pstp/ocp_apim_subscription_key';

    /**
     * SENDOTP_API_URL
     */
    const SENDOTP_API_URL = 'api_config/pstp/sendotp_api_url';

    /**
     * GETOFFER API URL
     */
    const GETOFFER_API_URL = 'api_config/pstp/getoffer_api_url';

    /**
     * FIRST TRANSACTION API URL
     */
    const FIRST_TRANSACTION_API_URL = 'api_config/pstp/first_transaction_api_url';

    /**
     * OTPSOURCE
     */
    const OTPSOURCE = 'api_config/pstp/otpsource';

    /**
     * GETOFFER API SOURCE ID
     */
    const GETOFFER_API_SOURCE_ID = 'api_config/pstp/getoffer_api_source_id';

    /**
     * CUSTOMER CAPTCHA FORMS
     */
    const CUSTOMER_CAPTCHA_FORMS = 'customer/captcha/forms';

    /**
     * EMAIL_DOMAIN
     */
    const EMAIL_DOMAIN = 'bajajfinserv.in';

    /**
     * TOKEN_TYPE
     */
    const TOKEN_TYPE = 'Bearer ';

    /**
     * ACCESS_TOKEN_API_URL
     */
    const ACCESS_TOKEN_API_URL = 'api_config/accesstoken/api_url';

    /**
     * ACCESS_TOKEN_CLIENT_ID
     */
    const ACCESS_TOKEN_CLIENT_ID = 'api_config/accesstoken/client_id';

    /**
     * ACCESS_TOKEN_CLIENT_SECRET
     */
    const ACCESS_TOKEN_CLIENT_SECRET = 'api_config/accesstoken/client_secret';

    /**
     * ACCESS_TOKEN_GRANT_TYPE
     */
    const ACCESS_TOKEN_GRANT_TYPE = 'api_config/accesstoken/grant_type';

    /**
     * ACCESS_TOKEN_RESOURCE
     */
    const ACCESS_TOKEN_RESOURCE = 'api_config/accesstoken/resource';

    /**
     * @var \Magento\Framework\App\Config\ScopeConfigInterface
     */
    protected $_scopeConfig;

    /**
     * @var \Magento\Framework\HTTP\Client\Curl
     */
    protected $_curl;

    /**
     * @var \Magento\Framework\Json\Helper\Data
     */
    protected $_jsonHelper;

    /**
     * @var \Magento\Customer\Model\Session
     */
    protected $_customerSession;

    /**
     * @var _otpSource
     */
    protected $_otpSource;

    /**
     * @var _ocp_apim_subscription_key
     */
    protected $_ocp_apim_subscription_key;

    /**
     * @var _firstName
     */
    protected $_firstName;

    /**
     * @var _mobileNumber
     */
    protected $_mobileNumber;

    /**
     * @var _lastName
     */
    protected $_lastName;

    /**
     * @var _email
     */
    protected $_email;

    /**
     * @var _websiteId
     */
    protected $_websiteId;

    /**
     *
     * @param \Magento\Framework\App\Helper\Context $context
     * @param \Magento\Framework\HTTP\Client\Curl $curl
     * @param \Magento\Framework\Json\Helper\Data $jsonHelper
     * @param \Magento\Framework\App\Config\ScopeConfigInterface $scopeConfig
     * @param \Magento\Customer\Model\Session $customerSession
     * @param \Magento\Store\Model\StoreManagerInterface $storeManager
     * @param \Magento\Customer\Model\CustomerFactory $customerFactory
     * @param \Magento\Framework\Controller\Result\JsonFactory $resultJsonFactory
     */
    public function __construct(
        \Magento\Framework\App\Helper\Context $context,
        \Magento\Framework\HTTP\Client\Curl $curl,
        \Magento\Framework\Json\Helper\Data $jsonHelper,
        \Magento\Framework\App\Config\ScopeConfigInterface $scopeConfig,
        \Magento\Customer\Model\Session $customerSession,
        \Magento\Store\Model\StoreManagerInterface $storeManager,
        \Magento\Customer\Model\CustomerFactory $customerFactory,
        \Magento\Framework\Controller\Result\JsonFactory $resultJsonFactory
    ) {
        $this->_curl = $curl;
        $this->_jsonHelper = $jsonHelper;
        $this->_scopeConfig = $scopeConfig;
        $this->_storeManager = $storeManager;
        $this->_customerFactory = $customerFactory;
        $this->_customerSession = $customerSession;
        $this->_resultJsonFactory = $resultJsonFactory;

        $this->_otpSource = $this->getConfigValue(self::OTPSOURCE);
        $this->_ocpApimSubscriptionKey = $this->getConfigValue(self::OCP_APIM_SUBSCRIPTION_KEY);

        parent::__construct($context);
    }

    /**
     * Check whether customer is logged in or not
     *
     * @return boolean logged in
     */
    public function isLoggedIn()
    {
        if ($this->_customerSession->isLoggedIn()) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * Return BFL customer flag from customer session
     *
     * @return string customer flag
     */
    public function getBflCustomerFlag()
    {
        $bflCustomerFlag = '';
        if ($this->isLoggedIn()) {
            $bflCustomerFlag = $this->_customerSession->getBflCustomerFlag();
        }

        return $bflCustomerFlag;
    }

    /**
     * Return BFL customer first name customer session
     *
     * @return string first name
     */
    public function getBflCustomerFirstName()
    {
        $bflCustomerFirstName = 'Guest';
        if ($this->isLoggedIn()) {
            $bflCustomerFirstName = $this->_customerSession->getBflCustomerFirstName();
        }

        return $bflCustomerFirstName;
    }

    /**
     * Return BFL customer amount from customer session
     *
     * @return string amount from customer session
     */
    public function getBflCustomerAmount()
    {
        $bflCustomerAmount = 0;
        if ($this->isLoggedIn()) {
            $bflCustomerAmount = $this->_customerSession->getBflCustomerAmount();
        }

        return $bflCustomerAmount;
    }

    /**
     * Return value for config path
     *
     * @param $configPath
     * @return string config value
     */
    public function getConfigValue($configPath = '')
    {
        return $this->_scopeConfig->getValue($configPath, \Magento\Store\Model\ScopeInterface::SCOPE_STORES);
    }

    /**
     * Return captcha enabled value for custom login form
     *
     * @return string captcha enabled value
     */
    public function isCaptchaEnabled()
    {
        $isEnabled = 'no';
        $strFormCodes = $this->getConfigValue(self::CUSTOMER_CAPTCHA_FORMS);
        if (isset($strFormCodes)) {
            $arrFormCodes = explode(",", $strFormCodes);
            if (in_array("custom_login_form", $arrFormCodes)) {
                $isEnabled = 'yes';
            }
        }
        return $isEnabled;
    }

    /**
     * Return OTP response
     *
     * @param $arrInputData
     * @return json OTP response
     */
    public function sendOtp($arrInputData)
    {
        $curlSendOtpApiUrl = $this->getConfigValue(self::SENDOTP_API_URL);

        // Generate Access Token
        $generatedToken = $this->getAccessToken();
        $accessToken = self::TOKEN_TYPE.$generatedToken;

        // Generate API Header
        $arrApiHeaders = array(
                            "Content-Type" => "application/json",
                            "Ocp-Apim-Subscription-Key" => $this->_ocpApimSubscriptionKey,
                            "Authorization" => $accessToken,
                         );

        // Generate API Body
        $arrParams = array(
                        "mobileNumber" => $arrInputData["mobileNumber"],
                        "otpSource" => $this->_otpSource
                     );
        $strParams = json_encode($arrParams);

        $arrResponseData = $this->getApiResponse($curlSendOtpApiUrl, $strParams, $arrApiHeaders);

        $apiResponseCode = '';
        $requestID = '';

        $responseStatusCode = $arrResponseData["responseStatusCode"];
        if ($responseStatusCode == 200) {
            $arrResponseBody = $arrResponseData["responseBody"];
            $apiResponseCode = $arrResponseBody['errorCode'];

            if ($apiResponseCode == "00") {
                $requestID = $arrResponseBody['requestID'];
            }
            $message = $arrResponseBody['errorMsg'];
        } else {
            $message = "Unable to generate OTP. Please try again.";
        }

        $result = $this->_resultJsonFactory->create();
        $result->setData(['responseStatusCode' => $responseStatusCode, 'apiResponseCode' => $apiResponseCode, 'message' => $message, 'requestID' => $requestID]);

        return $result;
    }

    /**
     * Return customer offer
     *
     * @param $arrInputData
     * @return json customer offer
     */
    public function getCustomerOffer($arrInputData)
    {
        $curlGetOfferUrl = $this->getConfigValue(self::GETOFFER_API_URL);
        $sourceId = $this->getConfigValue(self::GETOFFER_API_SOURCE_ID);

        $this->_firstName = $arrInputData["firstName"];
        $this->_lastName = $arrInputData["lastName"];
        $this->_mobileNumber = $arrInputData["mobileNumber"];
        $this->_email = $arrInputData["mobileNumber"]."@".self::EMAIL_DOMAIN;

        $this->_websiteId  = $this->_storeManager->getWebsite()->getWebsiteId();

        // Generate Access Token
        $generatedToken = $this->getAccessToken();
        $accessToken = self::TOKEN_TYPE.$generatedToken;

        // Generate API Header
        $arrApiHeaders = array(
                            "Content-Type" => "application/json",
                            "Ocp-Apim-Subscription-Key" => $this->_ocpApimSubscriptionKey,
                            "Authorization" => $accessToken,
                         );

        // Generate API Body
        $arrParams = array(
                        "mobileNumber" => $arrInputData["mobileNumber"],
                        "firstName" => $this->_firstName,
                        "lastName" => $this->_lastName,
                        "sourceId" => $sourceId,
                        "otp" => $arrInputData["otp"],
                        "otpSource" => $this->_otpSource,
                        "requestID" => $arrInputData["requestID"]
                     );
        $strParams = json_encode($arrParams);

        $arrResponseData = $this->getApiResponse($curlGetOfferUrl, $strParams, $arrApiHeaders);

        $apiResponseCode = '';
        $apiResponseFlag = '';
        $apiResponseAmount = '';
        $apiResponseOfferId = '';
        $apiResponseProductOfferingName = '';
        $apiResponseProduct = '';
        $apiResponseCityName = '';
        $apiResponseDealerLookup = '';

        $responseStatusCode = $arrResponseData["responseStatusCode"];
        if ($responseStatusCode == 200) {
            $arrResponseBody = $arrResponseData["responseBody"];
            $apiResponseCode = $arrResponseBody['responseCode'];

            if ($apiResponseCode == "00") {
                $arrFirstTransactionDetails = $this->getFirstTransactionDetails($arrInputData);
                
                $this->loginToEmms($arrResponseBody['offerDetails'], $arrFirstTransactionDetails);

                if (isset($arrResponseBody['offerDetails'][0]['flag'])) {
                    $apiResponseFlag = $arrResponseBody['offerDetails'][0]['flag'];
                } else {
                    $apiResponseFlag = "N";
                }

                if (isset($arrResponseBody['offerDetails'][0]['amount'])) {
                    $apiResponseAmount = $arrResponseBody['offerDetails'][0]['amount'];
                } else {
                    $apiResponseAmount = "0";
                }

                if (isset($arrResponseBody['offerDetails'][0]['offerId'])) {
                    $apiResponseOfferId = $arrResponseBody['offerDetails'][0]['offerId'];
                }

                if (isset($arrResponseBody['offerDetails'][0]['productOfferingName'])) {
                    $apiResponseProductOfferingName = $arrResponseBody['offerDetails'][0]['productOfferingName'];
                }

                if (isset($arrResponseBody['offerDetails'][0]['product'])) {
                    $apiResponseProduct = $arrResponseBody['offerDetails'][0]['product'];
                }

                if (isset($arrFirstTransactionDetails['cityName'])) {
                    $apiResponseCityName = $arrFirstTransactionDetails['cityName'];
                }
                if (isset($arrFirstTransactionDetails['dealerLookup'])) {
                    $apiResponseDealerLookup = $arrFirstTransactionDetails['dealerLookup'];
                }
            }
            $message = $arrResponseBody['responseMessage'];
        } else {
            $message = "Unable to process request. Please try again.";
        }

        $result = $this->_resultJsonFactory->create();
        $result->setData(['responseStatusCode' => $responseStatusCode, 'apiResponseCode' => $apiResponseCode, 'message' => $message, 'flag' => $apiResponseFlag, 'amount' => $apiResponseAmount, 'offerId' => $apiResponseOfferId, 'productOfferingName' => $apiResponseProductOfferingName, 'product' => $apiResponseProduct, 'cityName' => $apiResponseCityName, 'dealerLookup' => $apiResponseDealerLookup]);

        return $result;
    }

    /**
     * Return API response
     *
     * @param $url $params $headers
     * @return json api response
     */
    protected function getApiResponse($url, $params = '', $headers = array())
    {
        try {
            if (!empty($headers) && is_array($headers)) {
                $this->_curl->setHeaders($headers);
            }

            //if the method is post
            $this->_curl->post($url, $params);

            //response will contain the output in form of JSON string
            $responseStatusCode = $this->_curl->getStatus();

            //response will contain the output in form of JSON string
            $responseBody = $this->_curl->getBody();

            $arrResponseBody = $this->_jsonHelper->jsonDecode($responseBody);
            $arrResponse = array("responseStatusCode" => $responseStatusCode, "responseBody" => $arrResponseBody);

            return $arrResponse;
        } catch (Exception $e) {
            return $e->getMessage();
        }
    }

    /**
     * Customer login to EMMS
     *
     * @param $arrOfferDetails $arrFirstTransactionDetails
     * @return void
     */
    public function loginToEmms($arrOfferDetails = array(), $arrFirstTransactionDetails = array())
    {
        // instantiate customer object
        $customer = $this->_customerFactory->create();
        $customer->setWebsiteId($this->_websiteId);

        // check if customer is already present
        if ($customer->loadByEmail($this->_email)->getId()) {
            // Save data in customer session
            $this->saveEmmsCustomerInSession($arrOfferDetails, $arrFirstTransactionDetails);
        } else {
            // else create new customer
            $this->createEmmsCustomer($arrOfferDetails, $arrFirstTransactionDetails);
        }
    }

    /**
     * Save customer data in session
     *
     * @param $arrOfferDetails $arrFirstTransactionDetails
     * @return void
     */
    public function saveEmmsCustomerInSession($arrOfferDetails, $arrFirstTransactionDetails)
    {
        // instantiate customer object
        $customer = $this->_customerFactory->create();
        $customer->setWebsiteId($this->_websiteId);
        $userId = $customer->loadByEmail($this->_email)->getId();

        $customerData = $this->_customerFactory->create()->load($userId);
        $this->_customerSession->setCustomerAsLoggedIn($customerData);

        if (isset($arrOfferDetails[0]['flag'])) {
            $this->_customerSession->setBflCustomerFlag($arrOfferDetails[0]['flag']);
        } else {
            $this->_customerSession->setBflCustomerFlag("N");
        }

        if (isset($arrOfferDetails[0]['amount'])) {
            $this->_customerSession->setBflCustomerAmount($arrOfferDetails[0]['amount']);
        } else {
            $this->_customerSession->setBflCustomerAmount("0");
        }

        if (isset($arrOfferDetails[0]['offerId'])) {
            $this->_customerSession->setBflCustomerOfferId($arrOfferDetails[0]['offerId']);
        }

        if (isset($arrOfferDetails[0]['productOfferingName'])) {
            $this->_customerSession->setBflCustomerProductOfferingName($arrOfferDetails[0]['productOfferingName']);
        }

        if (isset($arrOfferDetails[0]['product'])) {
            $this->_customerSession->setBflCustomerProduct($arrOfferDetails[0]['product']);
        }

        if (isset($arrFirstTransactionDetails['cityName'])) {
            $this->_customerSession->setBflCustomerCityName($arrFirstTransactionDetails['cityName']);
        }

        if (isset($arrFirstTransactionDetails['dealerLookup'])) {
            $this->_customerSession->setBflCustomerDealerLookup($arrFirstTransactionDetails['dealerLookup']);
        }

        if (isset($this->_firstName)) {
            $this->_customerSession->setBflCustomerFirstName($this->_firstName);
        }
    }

    /**
     * Create customer in magento DB
     *
     * @param $arrOfferDetails $arrFirstTransactionDetails
     * @return void
     */
    public function createEmmsCustomer($arrOfferDetails, $arrFirstTransactionDetails)
    {
        // instantiate customer object
        $customer = $this->_customerFactory->create();
        $customer->setWebsiteId($this->_websiteId);

        try {
            // prepare customer data
            $customer->setEmail($this->_email);
            $customer->setFirstname($this->_mobileNumber);
            $customer->setLastname($this->_mobileNumber);

            // set the customer as confirmed
            $customer->setForceConfirmed(true);

            // save data
            $customer->save();

            $this->saveEmmsCustomerInSession($arrOfferDetails, $arrFirstTransactionDetails);
        } catch (Exception $e) {
            return $e->getMessage();
        }
    }

    /**
     * Return customer first transaction details
     *
     * @param $arrInputData
     * @return array first transaction details
     */
    public function getFirstTransactionDetails($arrInputData)
    {
        $curlFirstTransactionApiUrl = $this->getConfigValue(self::FIRST_TRANSACTION_API_URL);

        // Generate Access Token
        $generatedToken = $this->getAccessToken();
        $accessToken = self::TOKEN_TYPE.$generatedToken;

        // Generate API Header
        $arrApiHeaders = array(
                            "Content-Type" => "application/json",
                            "Ocp-Apim-Subscription-Key" => $this->_ocpApimSubscriptionKey,
                            "Authorization" => $accessToken,
                         );

        // Generate API Body
        $arrParams = array(
                        "mobileNumber" => $arrInputData["mobileNumber"]
                     );
        $strParams = json_encode($arrParams);

        $arrResponseData = $this->getApiResponse($curlFirstTransactionApiUrl, $strParams, $arrApiHeaders);

        $arrFirstTransactionDetails = array(
                                        "cityName" => "",
                                        "emiCardAcceptFlag" => "",
                                        "cardLimit" => "",
                                        "availableLimit" => "",
                                        "dealerLookup" => ""
                                      );

        $strResponse = '';
        $apiResponseCode = '';
        $requestID = '';

        if ($arrResponseData["responseStatusCode"] == 200) {
            $arrResponseBody = $arrResponseData["responseBody"];

            if (isset($arrResponseBody["firstTransactionDetails"][0]) && !empty($arrResponseBody["firstTransactionDetails"][0])) {
                $arrFirstTransactionDetails["cityName"] = $arrResponseBody["firstTransactionDetails"][0]["cityName"];
                $arrFirstTransactionDetails["emiCardAcceptFlag"] = $arrResponseBody["firstTransactionDetails"][0]["emiCardAcceptFlag"];
                $arrFirstTransactionDetails["cardLimit"] = $arrResponseBody["firstTransactionDetails"][0]["cardLimit"];
                $arrFirstTransactionDetails["availableLimit"] = $arrResponseBody["firstTransactionDetails"][0]["availableLimit"];
                $arrFirstTransactionDetails["dealerLookup"] = $arrResponseBody["firstTransactionDetails"][0]["dealerLookup"];
            }
        }
        return $arrFirstTransactionDetails;
    }

    /**
     * Get access token for authorization
     *
     * @param
     * @return string
     */
    public function getAccessToken()
    {
        $accessTokenApiUrl = $this->getConfigValue(self::ACCESS_TOKEN_API_URL);
        $accessTokenClientId = $this->getConfigValue(self::ACCESS_TOKEN_CLIENT_ID);
        $accessTokenClientSecret = $this->getConfigValue(self::ACCESS_TOKEN_CLIENT_SECRET);
        $accessTokenGrantType = $this->getConfigValue(self::ACCESS_TOKEN_GRANT_TYPE);
        $accessTokenResource = $this->getConfigValue(self::ACCESS_TOKEN_RESOURCE);
        
        // Generate API Header
        $arrApiHeaders = array(
                            "Content-Type" => "application/x-www-form-urlencoded"
                         );

        // Generate API Body
        $arrApiParams = array(
                            "client_id" => $accessTokenClientId,
                            "client_secret" => $accessTokenClientSecret,
                            "grant_type" => $accessTokenGrantType,
                            "RESOURCE" => $accessTokenResource
                        );
        $strApiParams = http_build_query($arrApiParams);
        
        $arrResponseData = $this->getApiResponse($accessTokenApiUrl, $strApiParams, $arrApiHeaders);
        
        $accessToken = '';
        if ($arrResponseData["responseStatusCode"] == 200) {
            $arrResponseBody = $arrResponseData["responseBody"];
            
            if (!empty($arrResponseBody["access_token"])) {
                $accessToken = $arrResponseBody["access_token"];
            }
        }

        return $accessToken;
    }
}
