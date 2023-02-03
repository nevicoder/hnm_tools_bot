require("dotenv").config();
const axios = require("axios");
const TelegramBot = require("node-telegram-bot-api");
const Bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });
console.log("Bot is running");

const VND = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
});
Bot.onText(/\/crypto (.+)/, (msg, match) => {
  try {
    const crypto = match[1];
    console.log(crypto);
    axios
      .get(
        `https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest?CMC_PRO_API_KEY=${process.env.CMC_KEY}&symbol=${crypto}&convert=VND`
      )
      .then((response) => {
        const data = response.data.data;
        for (const coin in data) {
          const [result] = data[coin];
          const price = result.quote.VND.price;
          console.log(price);
          Bot.sendMessage(
            msg.chat.id,
            `Tên: ${result.name}
  Giá: ${VND.format(price)}`
          );
        }
      })
      .catch((err) => Bot.sendMessage(msg.chat.id, "Tên coin không đúng"));
  } catch (e) {
    console.log(e);
  }
});
