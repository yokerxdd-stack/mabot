const mineflayer = require("mineflayer");
const { autoVersionForge } = require("minecraft-protocol-forge");
const http = require("http");

// Servidor web para UptimeRobot
http.createServer((req, res) => res.end("Bot andando")).listen(3000);

let reconnectTimer;
let reconnectDelay = 5000;

function createBot() {
  const bot = mineflayer.createBot({
    host: "epsteins.play.hosting",
    port: 25565,
    username: "AFK_Bot",
    version: false,
  });

  autoVersionForge(bot._client);

  bot.on("spawn", () => {
    reconnectDelay = 5000;
    console.log("✅ Bot conectado");
  });

  bot.on("kicked", (reason) => {
    console.log("❌ Kickeado:", reason);
    scheduleReconnect();
  });

  bot.on("error", (err) => {
    console.log("⚠️ Error:", err.message);
    scheduleReconnect();
  });

  bot.on("end", () => {
    console.log("🔄 Desconectado, reconectando...");
    scheduleReconnect();
  });
}

function scheduleReconnect() {
  if (reconnectTimer) return;

  const delay = reconnectDelay;
  reconnectDelay = Math.min(reconnectDelay * 2, 60000);

  reconnectTimer = setTimeout(() => {
    reconnectTimer = undefined;
    createBot();
  }, delay);
}

createBot();
