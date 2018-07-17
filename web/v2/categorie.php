<?php
$url = 'https://larakostpulsa.com/api/pembelian/categorie';
// $api = "A4K4IHWTxgcBs4myNI0MOOf1mr8v6p57hEyqLK=0qc=YUmLiuKu9YPxA7uw2";

include_once ('config_api.php');
/*$header = array(
'Accept: application/json',
'Authorization: Bearer cX0uZ7wVEmIvThCw9Z6uO6LIpKHIRh=u50dT6Po02wtJTw7QL1=ZuLiZVphn', // Ganti [apikey] dengan API KEY Anda
);*/

$header = array(
'Accept: application/json',
'Authorization: Bearer '.$api, // Ganti [apikey] dengan API KEY Anda
);

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
curl_setopt($ch, CURLOPT_HTTPHEADER, $header);
curl_setopt($ch, CURLOPT_POST, 1);
$result = curl_exec($ch);

echo $result;