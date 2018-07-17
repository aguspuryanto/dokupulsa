<?php
// $url = 'https://larakostpulsa.com/api/pembelian/categorie';
$url = 'http://vaganzatravel.com/pulsa/categorie.php';

// $header = array(
// 'Accept: application/json',
// 'Authorization: Bearer cX0uZ7wVEmIvThCw9Z6uO6LIpKHIRh=u50dT6Po02wtJTw7QL1=ZuLiZVphn', // Ganti [apikey] dengan API KEY Anda
// );

// $ch = curl_init();
// curl_setopt($ch, CURLOPT_URL, $url);
// curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
// curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
// // curl_setopt($ch, CURLOPT_HTTPHEADER, $header);
// curl_setopt($ch, CURLOPT_POST, 1);
// $result = curl_exec($ch);

header('Content-Type: application/json');

// $result = file_get_contents($url);
$result = '{
  "status": "success",
  "data": [
    {
      "product_id": "pulsa",
      "product_name": "Pulsa",
      "image": "pulsa.png",
      "status": "1"
    },
    {
      "product_id": "plnpra",
      "product_name": "Token PLN",
      "image": "token-pln.png",
      "status": "1"
    },
    {
      "product_id": "paket",
      "product_name": "Paket Data",
      "image": "paket-data.png",
      "status": "1"
    },
    {
      "product_id": "game",
      "product_name": "Voucher Game",
      "image": "voucher-game.png",
      "status": "1"
    },
    {
      "product_id": "gopay",
      "product_name": "Saldo GOJEK",
      "image": "saldo-gojek.png",
      "status": "1"
    },
    {
      "product_id": "EMONEY",
      "product_name": "E-Money",
      "image": "e-money.png",
      "status": "1"
    },
    {
      "product_id": "WIFIID",
      "product_name": "WIFI ID",
      "image": "wifi-id.png",
      "status": "1"
    },
    {
      "product_id": "TRFBANK",
      "product_name": "Transfer Bank",
      "image": "transfer-bank.png",
      "status": "1"
    },
    {
      "product_id": "TLPSMS",
      "product_name": "Telepon & SMS",
      "image": "telepon-sms.png",
      "status": "1"
    }
  ]
}';

echo $result;