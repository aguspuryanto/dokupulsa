<?php
$url = 'http://vaganzatravel.com/pulsa/operator';

/*$header = array(
'Accept: application/json',
'Authorization: Bearer cX0uZ7wVEmIvThCw9Z6uO6LIpKHIRh=u50dT6Po02wtJTw7QL1=ZuLiZVphn', // Ganti [apikey] dengan API KEY Anda
);

$data = array( 
'product_id' => 'pulsa', // Kode Kategori (pulsa, plnpra, paket, dll)
);

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
curl_setopt($ch, CURLOPT_HTTPHEADER, $header);
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
$result = curl_exec($ch);*/

header('Content-Type: application/json');
$result = file_get_contents($url);
echo $result;