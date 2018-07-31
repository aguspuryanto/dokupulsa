Butuh Aplikasi POS (Points of sales)
 

Hallo Juragan,

Saya butuh aplikasi POS (Point of sales) untuk toko saya. Budget ga tinggi gan, soalnya tokonya masih kecil.
yang saya butuhkan kira2 fungsinya seperti ini :
User Admin :
- Bisa menambahkan stok barang
- Input harga barang
- Input sistem diskon dll
- Lihat laporan penjualan baik harian mingguan atau bulanan

Untuk Kasir :
- Penjualan barang
- Input pembelian
- Uang kembian sudah terhitung otomatis
- Cetak struk pembelian

https://stackoverflow.com/questions/19081654/send-text-to-specific-contact-programmatically-whatsapp

Intent i = new Intent(Intent.ACTION_SENDTO, Uri.parse("content://com.android.contacts/data/" + c.getString(0)));
i.setType("text/plain");
i.setPackage("com.whatsapp");           // so that only Whatsapp reacts and not the chooser
i.putExtra(Intent.EXTRA_SUBJECT, "Subject");
i.putExtra(Intent.EXTRA_TEXT, "I'm the body.");
startActivity(i);

Uri uri = Uri.parse("smsto:" + smsNumber);
Intent i = new Intent(Intent.ACTION_SENDTO, uri);
i.putExtra("sms_body", smsText);  
i.setPackage("com.whatsapp");  
startActivity(i);


private void openWhatsApp() {
    String smsNumber = "7****"; // E164 format without '+' sign
    Intent sendIntent = new Intent(Intent.ACTION_SEND);
    sendIntent.setType("text/plain");
    sendIntent.putExtra(Intent.EXTRA_TEXT, "This is my text to send.");
    sendIntent.putExtra("jid", smsNumber + "@s.whatsapp.net"); //phone number without "+" prefix
    sendIntent.setPackage("com.whatsapp");
    if (intent.resolveActivity(getActivity().getPackageManager()) == null) {
        Toast.makeText(this, "Error/n" + e.toString(), Toast.LENGTH_SHORT).show();
        return;    
    }
    startActivity(sendIntent);
}

PackageManager packageManager = context.getPackageManager();
    Intent i = new Intent(Intent.ACTION_VIEW);

    try {
        String url = "https://api.whatsapp.com/send?phone="+ phone +"&text=" + URLEncoder.encode(message, "UTF-8");
        i.setPackage("com.whatsapp");
        i.setData(Uri.parse(url));
        if (i.resolveActivity(packageManager) != null) {
            context.startActivity(i);
        }
    } catch (Exception e){
        e.printStackTrace();
    }