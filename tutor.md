# NOTE JANGAN DIKLAIM PROJECT SENDIRI YA ABANGKU!

# tutorial instalasi tedidevv1 whatsapp bot

berikut adalah panduan lengkap cara install dan menjalankan bot whatsapp tedidevv1 dari awal.

## bahan-bahan yang wajib ada di laptop masing-masing

sebelum melakukan clone dan menjalankan web bot ini, pastikan laptop kamu sudah memiliki bahan-bahan berikut:

1. git - digunakan untuk melakukan clone repository [download here](https://git-scm.com/install/windows).
2. node.js - wajib untuk menjalankan script server. unduh versi lts (long term support) [download here](https://nodejs.org/en/download)
3. google chrome - browser yang diperlukan oleh sistem bot (puppeteer/wa-web) untuk menjalankan whatsapp web di background.
4. koneksi internet - wajib ada dan stabil untuk sinkronisasi pesan whatsapp secara real-time.
5. hp dengan nomer whatsapp aktif - untuk melakukan scan QR code dan menautkan akun whatsapp tumbal.

## langkah-langkah instalasi

### 1. clone repository

buka terminal atau command prompt (cmd) di laptop kamu. arahkan ke folder yang diinginkan, kemudian jalankan perintah berikut:

```
git clone https://github.com/tfhrigit/cobot.devted.git
```

lalu masuk ke folder hasil clone:

```
cd cobot.devted
```

### 2. install dependencies dan library

di dalam folder cobot.devted tersebut, kamu wajib menginstall semua library atau modul yang dibutuhkan (seperti whatsapp-web.js, ffmpeg, express, dll) dengan mengetik perintah berikut di terminal:

```
npm install
```

tunggu proses download bahan-bahan modul ini sampai 100% selesai.

### 3. cara menjalankan bot

setelah semua modul selesai di-install, kamu bisa langsung mensimulasikan dan menjalankan server bot. ada dua cara:

- klik instan (windows): klik dua kali pada file `start.bat` yang ada di dalam folder aplikasi.
- via terminal: buka cmd/terminal di folder tersebut, lalu ketik :

```
npm run dev
```

...atau

```
npm run start
```

kedua nya menyalakan server yang sama.

### 4. hubungkan whatsapp (scan QR code)

setelah server bot berhasil berjalan:

1. buka web responsif yang disediakan (dengan mengakses `http://localhost:3000` di browser entah google chrome, edge, brave, tor, dan seterusnya intinya browser) atau bisa juga lihat langsung di tampilan terminal jika tersedia di sana.
2. layar web/cmd akan segera menampilkan QR code autentikasi.
3. buka aplikasi whatsapp utama di hp kamu, klik ikon titik tiga / menu pengaturan akun.
4. pilih opsi "perangkat tertaut" (linked devices) lalu klik "tautkan perangkat".
5. arahkan kamera hp kamu dan scan QR code yang muncul di layar laptop.
6. tunggu beberapa detik hingga muncul keterangan bot siap atau client is ready!

### 5. bot online dan aktif

bot tedidevv1 sekarang sudah berjalan dan terkoneksi dengan nomor kamu. fitur-fiturnya (seperti convert video/gambar menjadi stiker) sudah bisa langsung dites di chat. biarkan jendela cmd atau `start.bat` tersebut tetap terbuka selama kamu ingin bot tetap hidup.
untuk mematikan server bot, cukup tutup (_close_) jendela cmd tersebut atau tekan tombol kombinasi `ctrl + c`.

### 6. limitasi

ada beberapa kekurangan dalam bot in, berikut kekurangan yang sejauh ini di temukan :

1. ketika mengirim perintah `!brat`, `!sticker`, `!tts`, `!ttp` namun tidak ada isi nya atau `null` maka tidak akan muncul error atau peringatan.
2. ketika laptop kamu mati sendiri, bot akan ikut mati, itu merupakan kelemahannya, jika ada solusi mohon kontribusi disini ya!

### 7. cara mematikan dan menghidupkan kembali server

1.  jika server masih nyala, untuk mematikan cukup tekan `ctrl + c`.
2.  untuk nyalain lagi servernya pencet start.bat atau ga di terminal root project `node index.js` atau `npm run dev` atau `npm run start`

### 8. tips pengembangan

jika temen-temen dalam pengembangan dan berkontribusi temen-temen bisa menambahkan `.gitignore` pada root folder cobot.devted agar saat di unggah tidak berat dengan `node_modules` ataupun cache dan auth logs wwebjs.
isi `.gitignore` bisa ikuti code berikut :

```
node_modules
.wwebjs_auth
.wwebjs_cache
.gitignore
```

## List perintah

untuk melakukan generate stiker temen-temen bisa menggunakan beberapa command di bawah ini :

| Command    | Alias | Deskripsi                                                                                        |
| ---------- | ----- | ------------------------------------------------------------------------------------------------ |
| `!sticker` | `!s`  | Konversi gambar/video menjadi stiker. kirim media dengan caption atau balas media dengan command |
| `!brat`    | -     | Buat stiker teks dengan style brat. contoh: `!brat iki stiker loh rek`                           |
| `!tts`     | -     | Sama seperti `!brat`                                                                             |
| `!ttp`     | -     | Sama seperti `!brat`                                                                             |

---

## Advanced

#### penggunaan event `message` vs `message_create`

event `message` berfungsi untuk menjadikan nomor whatsapp yang tertaut sebagai bot hanya berfungsi jika ada nomor lain yang men _trigger_ bot tersebut, sedangkan event `message_create` memiliki pendekatan yang lebih luas artinya dapat melakukan _trigger_ pada hampir semua pesan yang dikirim.

#### referensi :

[https://docs.wwebjs.dev/Client.html#event:message_create](https://docs.wwebjs.dev/Client.html#event:message_create)
[https://docs.wwebjs.dev/Client.html#event:message](https://docs.wwebjs.dev/Client.html#event:message)
