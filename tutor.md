# NOTE JANGAN DIKLAIM PROJECT SENDIRI YA ABANGKU!
# tutorial instalasi tedidevv1 whatsapp bot

berikut adalah panduan lengkap cara install dan menjalankan bot whatsapp tedidevv1 dari awal.

## bahan-bahan yang wajib ada di laptop masing-masing
sebelum melakukan clone dan menjalankan web bot ini, pastikan laptop kamu sudah memiliki bahan-bahan berikut:
1. git - digunakan untuk melakukan clone repository.
2. node.js - wajib untuk menjalankan script server. unduh versi lts (long term support)
3. google chrome - browser yang diperlukan oleh sistem bot (puppeteer/wa-web) untuk menjalankan whatsapp web di background.
4. koneksi internet - wajib ada dan stabil untuk sinkronisasi pesan whatsapp secara real-time.
5. hp dengan nomer whatsapp aktif - untuk melakukan scan qr code dan menautkan akun whatsapp tumbal.

## langkah-langkah instalasi

### 1. clone repository
buka terminal atau command prompt (cmd) di laptop kamu. arahkan ke folder yang diinginkan, kemudian jalankan perintah berikut:
`git clone <link-repository-bot-ini>`
lalu masuk ke folder hasil clone:
`cd tedidevv1-bot`

### 2. install dependencies
di dalam folder tedidevv1-bot tersebut, kamu wajib menginstall semua library atau modul yang dibutuhkan (seperti whatsapp-web.js, ffmpeg, express, dll) dengan mengetik perintah berikut di terminal:
`npm install`
tunggu proses download bahan-bahan modul ini sampai 100% selesai.

### 3. cara menjalankan bot
setelah semua modul selesai di-install, kamu bisa langsung mensimulasikan dan menjalankan server bot. ada dua cara:
- klik instan (windows): klik dua kali pada file `start.bat` yang ada di dalam folder aplikasi.
- via terminal: buka cmd/terminal di folder tersebut, lalu ketik `node index.js`.

### 4. hubungkan whatsapp (scan qr code)
setelah server bot berhasil berjalan:
1. buka web responsif yang disediakan (dengan mengakses `http://localhost:3000` di google chrome) atau bisa juga lihat langsung di tampilan terminal jika tersedia di sana.
2. layar web/cmd akan segera menampilkan qr code autentikasi.
3. buka aplikasi whatsapp utama di hp kamu, klik ikon titik tiga / menu pengaturan akun.
4. pilih opsi "perangkat tertaut" (linked devices) lalu klik "tautkan perangkat".
5. arahkan kamera hp kamu dan scan qr code yang muncul di layar laptop.
6. tunggu beberapa detik hingga muncul keterangan bot siap atau client is ready!

### 5. bot online dan aktif
bot tedidevv1 sekarang sudah berjalan dan terkoneksi dengan nomor kamu. fitur-fiturnya (seperti convert video/gambar menjadi stiker) sudah bisa langsung dites di chat. biarkan jendela cmd atau start.bat tersebut tetap terbuka selama kamu ingin bot tetap hidup.
untuk mematikan server bot, cukup tutup (close) jendela cmd tersebut atau tekan kombinasi `ctrl + c`.

### 6. minus bot ini ketika laptop kamu mati sendiri, bot bakal ikut mati, itu kelemahannya, jika ada solusi mohon kontribusi disini ya!
