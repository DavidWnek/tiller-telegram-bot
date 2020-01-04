import Bot from 'node-telegram-bot-api';
import User from '../models/user';

class TelegramBot {
  bot = null;

  constructor(token) {
    this.bot = new Bot(token, {polling: true});

    this.bot.on('message', (msg) => {
      const {id, username} = msg.chat;

      User.findOne({telegramHandle: username}).exec((err, data) => {
        if(err) {
          return;
        }

        if(!data) {
          User.create({
            telegramChatId: id,
            telegramHandle: username
          });
        }
      });

      switch(msg.text.toLowerCase()) {
        default:
        case '/start':
          User.updateOne({telegramHandle: username}, {enabled: true}).exec();
          this.sendMessage(id,  'Thank you for following me. I\'ll give you a daily compliment. Type /stop to turn me off :/');
          break;

        case '/stop':
          this.sendMessage(id, 'Sorry to see you go.');

          User.updateOne({telegramHandle: username}, {enabled: false}).exec();
          break;
      }
    });
  }
  sendMessage(chatId, message) {
    this.bot.sendMessage(chatId, message);
  }

  sendCompliment(user, message) {
    this.sendMessage(user.telegramChatId, message);
  }
}

export default TelegramBot;
