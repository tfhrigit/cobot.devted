const { Client, LocalAuth, MessageMedia } = require("whatsapp-web.js");
const express = require("express");
const { Server } = require("socket.io");
const http = require("http");
const axios = require("axios");
const { execSync } = require("child_process");

async function createTextStickerImage(text) {
  const url = `https://aqul-brat.hf.space/api/brat?text=${encodeURIComponent(text)}`;
  const response = await axios.get(url, { responseType: "arraybuffer" });
  return Buffer.from(response.data).toString("base64");
}

function getChromiumPath() {
  const candidates = [
    "/data/data/com.termux/files/usr/bin/chromium-browser",
    "/data/data/com.termux/files/usr/bin/chromium",
    "/usr/bin/chromium-browser",
    "/usr/bin/chromium",
  ];
  for (const p of candidates) {
    try {
      execSync(`test -f ${p}`);
      return p;
    } catch {}
  }
  return null;
}

function getFfmpegPath() {
  try {
    return execSync("which ffmpeg").toString().trim();
  } catch {
    return null;
  }
}

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const SERVER_PORT = 3000;

const stickerAuthor = "tedi dev";
const stickerName = "tedi dev";
const stickerNameBratBot = "tedi dev";

app.use(express.static("public"));

const chromiumPath = getChromiumPath();
const ffmpegPath = getFfmpegPath();const puppeteerConfig = {
  headless: true,
  args: [
    "--no-sandbox",
    "--disable-setuid-sandbox",
    "--disable-dev-shm-usage",
    "--disable-accelerated-2d-canvas",
    "--no-first-run",
    "--no-zygote",
    "--disable-gpu",
    "--single-process",
    "--disable-extensions",
    "--disable-background-networking",
    "--disable-sync",
    "--disable-translate",
    "--hide-scrollbars",
    "--mute-audio",
    "--headless=new",
    "--disable-software-rasterizer",
    "--disable-dbus",
    "--disable-features=site-per-process",
    "--js-flags=--max-old-space-size=256",
    "--memory-pressure-off",
    "--disable-web-security",
  ],
};



if (chromiumPath) {
  puppeteerConfig.executablePath = chromiumPath;
}

const client = new Client({
  authStrategy: new LocalAuth(),
  ffmpegPath: ffmpegPath,
  puppeteer: puppeteerConfig,
  webVersionCache: {
    type: "remote",
    remotePath: "https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2412.54.html",
  },
});

io.on("connection", (socket) => {
  socket.emit("message", "Lagi nyiapin bot tedidevv1 nih...");
});

client.on("loading_screen", (percent, message) => {
  console.log(`Loading: ${percent}% - ${message}`);
  io.emit("message", `Lagi loading WhatsApp nih (${percent}%)... Sabar ya`);
});

client.on("qr", (qr) => {
  console.log("QR Code generated");
  io.emit("qr", qr);
  io.emit("message", "Yuk, scan QR Code di bawah pakai WhatsApp kamu");
});

client.on("authenticated", () => {
  console.log("Wabot terautentikasi!");
  io.emit("message", "Suksess! Menunggu sinkronisasi WA...");
});

client.on("auth_failure", (msg) => {
  console.error("Authentication failure:", msg);
  io.emit("message", "Waduh, gagal autentikasi. Coba restart start.bat nya ya.");
});

client.on("ready", () => {
  console.log("Client is ready!");
  io.emit("ready", "Sip, tersambung!");
  io.emit("message", "Botnya udah siap tempur nih.");
});

client.on("message_create", async (msg) => {
  if (msg.body === "!sticker" || msg.body === "!s") {
    try {
      if (msg.hasMedia) {
        const media = await msg.downloadMedia();
        await client.sendMessage(msg.from, media, {
          sendMediaAsSticker: true,
          stickerName: stickerName,
          stickerAuthor: stickerAuthor,
        });
      } else if (msg.hasQuotedMsg) {
        const quotedMsg = await msg.getQuotedMessage();
        if (quotedMsg.hasMedia) {
          const media = await quotedMsg.downloadMedia();
          await client.sendMessage(msg.from, media, {
            sendMediaAsSticker: true,
            stickerName: stickerName,
            stickerAuthor: stickerAuthor,
          });
        } else {
          await msg.reply("Ealah, pesan yang kamu bales ngga ada gambar/videonya tuh.");
        }
      } else {
        await msg.reply("Kirim gambar/video terus kasih caption *!sticker*, atau balas aja medianya pake *!sticker* ya.");
      }
    } catch (error) {
      console.error("Error saat membuat stiker:", error);
      await msg.reply("Yah, ada error waktu bikin stikernya :( Coba lagi ya!");
    }
  }

  if (
    msg.body.startsWith("!tts") ||
    msg.body.startsWith("!ttp") ||
    msg.body.startsWith("!brat")
  ) {
    const prefixMatch = msg.body.match(/^!(tts|ttp|brat)/i);
    if (!prefixMatch) return;

    const text = msg.body.slice(prefixMatch[0].length).trim();
    if (!text) {
      return await msg.reply("Silakan masukkan teksnya! Contoh: *!brat Halo semuanya*");
    }

    try {
      const base64Data = await createTextStickerImage(text);
      const media = new MessageMedia("image/png", base64Data, "sticker.png");
      await client.sendMessage(msg.from, media, {
        sendMediaAsSticker: true,
        stickerName: stickerNameBratBot,
        stickerAuthor: stickerAuthor,
      });
    } catch (error) {
      console.error("Error saat membuat teks ke stiker:", error);
      await msg.reply("Yah, gagal bikin stiker teksnya :( Coba lagi nanti ya (Mungkin server apinya lagi sibuk).");
    }
  }
});

client.initialize();

server.listen(SERVER_PORT, () => {
  console.log(`Server tedidev1 berjalan pada http://localhost:${SERVER_PORT}`);
});
