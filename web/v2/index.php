<?php

/* Script ini hanya membantu menyimpan dalam file saja
* Hasil yg tersimpan silakan dianalisa agar dapat diproses oleh sistem Anda.
*/ 

if($_SERVER['REMOTE_ADDR']=='103.215.72.227'){ // memastikan data terikirim dari server Larakost Pulsa

file_put_contents('save.txt', $_POST['content']); // menyimpan dalam file save.txt

}