Saya membutuhkan seorang programmer berpengalaman dalam pembuatan web dan aplikasi android pulsa dan PPOB. Contoh aplikasinya seperti  bisatopup.co.id  , payfazz, mobilepulsa , portalpulsa.com  Pembuatan aplikasi pulsa melalui api yg sudah disediakan oleh supplier untuk diintegrasikan dalam web dan apliikasinya serta laporan transaksi maupun laporan bonus member. Bagi yg berpengalaman silahkan di replay.



A. Gambaran Project di Aplikasi member pulsa dan PPOB :

1. Home / Dashboard Halaman

2.  Menu Transkasi 

   # Pembelian : Pulsa reguler , Paket data , Token PLN, Voucher Game , Pulsa Transfer , Pakets sms & telepon 

   # Pembayaran PPOB  : PLN Bulanan , BPJS KEsehatan, ESIA, FIF, Adira Finance ( mengikuti dari supplier ppob )

# Deposit Saldo 

# Kirim Antar agen 

# Ganti PIn

3. Menu Report 

# Laporan Transaksi pulsa dan ppob

# Inbox dan outbox

4. Menu Bonus

  # Bonus Mingguan 

    # Bonus Transaksi 

5. Menu Data Profile

    # Biodata

    # Data Bank 

    # Ubah Password

    # Ubah PIN

   # Catatan Aktivitas

    # Kirim Testimonila 

6.  Harga Produk 

    # Pulsa Reguler 

    # Paket Data Internet 

    # Paket SMS & Telepon

    # Pulsa Transfer

    # Gojek , Grab , dll

    # Token PLN

    # Voucher Game 

    # PPOB

7  Menu Tutorial ,

8.  Menu Kontak 

9. Logout 

10. Menu Notifikasi 

11. Halaman Login Sebelum Masuk aplikasi Dashboard



B . Gambaran Backend atau pengaturan aplikasi untuk admin 

   Menu yang dibutuhkan harus disesuaikan dengan  pengaturan pada aplikasi diatas 


Project Class: Medium (5jt-50jt)
Published Date: 14/05/2018 16:26:13 WIB
Published Budget: Rp 5,000,000
Finish Days: 25


$ npm install -g ionic cordova

$ ionic start firstProject sidemenu --v2

$ ionic serve -l

--port - This allows you to designate the dev port. When omitted, the default port is 8100.
--nolivereload - When you run ionic serve, livereload is enabled, which automatically reloads the browser when you save files. If you don't want this functionality for whatever reason, you can turn it off with this flag.
--browser - You can designate which browser to use (safari, firefox, or chrome).
-lab or -l - This is a great feature, as it allows you to view the app on simulated mobile platforms and screen sizes, simultaneously.
--platform - You can serve it with a specific platform build in mind (ios or android).


The Ionic 2 Project Structure
> hooks
> node_modules
> plugins
> resources
> src
  > app
    app.component.ts
    app.html
    app.module.ts
    app.scss
    main.ts
  > assets
  > pages
  > theme
> www
