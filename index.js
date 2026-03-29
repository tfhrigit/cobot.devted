const { Client, LocalAuth } = require('whatsapp-web.js');
const express = require('express');
const { Server } = require('socket.io');
const http = require('http');
const ffmpeg = require('ffmpeg-static');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static('public'));

const client = new Client({
    authStrategy: new LocalAuth(),
    ffmpegPath: ffmpeg,
    puppeteer: {
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--disable-accelerated-2d-canvas', '--no-first-run', '--no-zygote', '--disable-gpu']
    }
});

io.on('connection', (socket) => {
    socket.emit('message', 'Lagi nyiapin bot tedidevv1 nih...');
});

client.on('loading_screen', (percent, message) => {
    console.log(`Loading: ${percent}% - ${message}`);
    io.emit('message', `Lagi loading WhatsApp nih (${percent}%)... Sabar ya`);
});

client.on('qr', (qr) => {
    console.log('QR Code generated');
    io.emit('qr', qr);
    io.emit('message', 'Yuk, scan QR Code di bawah pakai WhatsApp kamu');
});

client.on('authenticated', () => {
    console.log('Wabot terautentikasi!');
    io.emit('message', 'Suksess! Menunggu sinkronisasi WA...');
});

client.on('auth_failure', msg => {
    console.error('Authentication failure:', msg);
    io.emit('message', 'Waduh, gagal autentikasi. Coba restart start.bat nya ya.');
});

client.on('ready', () => {
    console.log('Client is ready!');
    io.emit('ready', 'Sip, tersambung!');
    io.emit('message', 'Botnya udah siap tempur nih.');
});

client.on('message', async msg => {
    // Command !sticker or !s
    if (msg.body === '!sticker' || msg.body === '!s') {
        try {
            if (msg.hasMedia) {
                const media = await msg.downloadMedia();
                client.sendMessage(msg.from, media, { sendMediaAsSticker: true, stickerName: 'tedidevv1 Bot', stickerAuthor: 'tedidevv1' });
            } else if (msg.hasQuotedMsg) {
                const quotedMsg = await msg.getQuotedMessage();
                if (quotedMsg.hasMedia) {
                    const media = await quotedMsg.downloadMedia();
                    client.sendMessage(msg.from, media, { sendMediaAsSticker: true, stickerName: 'tedidevv1 Bot', stickerAuthor: 'tedidevv1' });
                } else {
                    msg.reply('Ealah, pesan yang kamu bales ngga ada gambar/videonya tuh.');
                }
            } else {
                msg.reply('Kirim gambar/video terus kasih caption *!sticker*, atau balas aja medianya pake *!sticker* ya.');
            }
        } catch (error) {
            console.error('Error saat membuat stiker:', error);
            msg.reply('Yah, ada error waktu bikin stikernya :( Coba lagi ya!');
        }
    }
});

client.initialize();

server.listen(3000, () => {
    console.log('Server tedidev1 berjalan pada http://localhost:3000');
});
