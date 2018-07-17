<?php
$url = 'https://larakostpulsa.com/api/balance';

$header = array(
'Accept: application/json',
'Authorization: Bearer [apikey]', // Ganti [apikey] dengan API KEY Anda
);

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
curl_setopt($ch, CURLOPT_HTTPHEADER, $header);
curl_setopt($ch, CURLOPT_POST, 1);
$result = curl_exec($ch);

echo $result;