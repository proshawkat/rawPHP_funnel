<?php
/**
* nmi core Class
*
* This is the core class used by nmiDirectPost and nmiCustomerVault Classes
* This class is only useful when implemented by nmiDirectPost or nmiCustomerVault
*
* @author   Jamie Estep
* @copyright    October 2009
* @version  1.0
* @link     http://www.saynotoflash.com/scripts/network-merchants-api-php-class-script/
*/
class nmi
{
    /*
     * @param array $options
     * - nmi_url
     * - nmi_user
     * - nmi_password
     */
    public function __construct($nmi_url, $nmi_user, $nmi_password)
    {
        $this->setNmiUrl($nmi_url);
        $this->setNmiUser($nmi_user);
        $this->setNmiPassword($nmi_password);
    }

    /*
     * @param string $nmi_url
     *  properly formatted url
     */
    private function setNmiUrl($nmi_url)
    {
        $this->nmi_url = $nmi_url;
    }

    /*
     * @param string $nmi_user
     *  Network Merchant API Username
     */
    private function setNmiUser($nmi_user)
    {
        $this->nmi_user = $nmi_user;
    }

    /*
     * @param string $nmi_password
     *  Network Merchant Password
     */
    private function setNmiPassword($nmi_password)
    {
        $this->nmi_password = $nmi_password;
    }

    /*
     * @return string $this->nmi_url
     *  Network Merchants Post Url
     */
    protected function getNmiUrl()
    {
        return $this->nmi_url;
    }

    /*
     * @return string $this->nmi_user
     */
    protected function getNmiUser()
    {
        return $this->nmi_user;
    }

    /*
     * @return string $this->nmi_password
     */
    protected function getNmiPassword()
    {
        return $this->nmi_password;
    }

    /*
     * @param string $query_string
     *  Properly formatted name-value-pair query string
     *
     * $return array[string] $result
     *  array containing response code, message and other fail or pass codes
     */
    protected function execute($query_string)
    {
        if (in_array("curl", get_loaded_extensions()))
        {

            $ch = curl_init($this->getNmiUrl());
            curl_setopt($ch, CURLOPT_POST, 1);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
            curl_setopt($ch, CURLOPT_POSTFIELDS, $query_string);
            curl_setopt($ch, CURLOPT_REFERER, "");
            $response = curl_exec($ch);
            curl_close($ch);

            $result = array();
            $result['query_string'] = $query_string;

            // TO DO, PARSE RESULT AND PROCESS AVS RETURN CODES
            if (!$response)
            {
                $result['response'] = 2;
                $result['responsetext'] = 'There was an error communicating with the NMI gateway';
            }
            else
            {
                parse_str($response,$result);
            }

            return $result;
        }
        else
        {
            throw new Exception('Could not load cURL libraries. Make sure PHP is compiled with cURL');
        }
    }
}

/*
 * Class for Debugging and Simple Formatting
 */
class globalFormat
{
    public static function phone($input)
    {
        return preg_replace('/[^\d]/','',$input);
    }

    public static function debug($data)
    {
        echo "<pre>";
        print_r($data);
        echo "</pre>";
    }
}