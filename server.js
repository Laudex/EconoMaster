const express = require("express");
const { createHash } = require('crypto');
const CryptoJS = require("crypto-js");
const TelegramBot = require("node-telegram-bot-api");

const TOKEN = "{token_from_tg}";
const server = express();
const bot = new TelegramBot(TOKEN, { polling: true } );

const port = process.env.PORT || 5000;
const gameName = "ExchangeBattle";

const queries = {};

bot.onText(/help/, (msg) => bot.sendMessage(msg.from.id, "This bot implements ECONO MASTER game. Say /game if you want to play."));
//bot.onText(/start|game/, (msg) => bot.sendGame(msg.from.id, gameName));
bot.onText(/start|game/, function (msg) {
    const keyboard = {
        "inline_keyboard": [
            [
                {
                    text: "Start ECONO MASTER",
					callback_game: "Test description"
                }
            ],
			[
				{
                    text: "Join to Secret Channel",
                    url: "https://t.me/+l4tosHEq9UxhOGY6"
                }
			]
        ]
    }
    let options = {
        reply_markup: keyboard
    }
    bot.sendGame(msg.from.id, gameName, options)
});
bot.on("callback_query", function (query) {
    if (query.game_short_name !== gameName) {
        bot.answerCallbackQuery(query.id, "Sorry, '" + query.game_short_name + "' is not available.");
    } else {
        console.log(query.id)
		let encryptedId = CryptoJS.AES.encrypt(query.id, "Test").toString()
        console.log(encryptedId)
        //const hashedQueryId = createHash('sha256').update(query.id).digest('hex')
        //queries[query.id] = query;
        queries[query.id] = query;
        let gameurl = "https://economaster.fvds.ru/index.html?id="+query.id+"&userId="+query.from.id;
		//let gameurl = "https://economaster.fvds.ru/index.html#id="+query.id+"&userId="+query.from.id;
        bot.answerCallbackQuery({
            callback_query_id: query.id,
            url: gameurl
        });
    }
});
bot.on("inline_query", function (iq) {
	console.log("Inline log")
    const keyboard = {
        "inline_keyboard": [
            [
                {
                    text: "Start ECONO MASTER",
					callback_game: "Test description"
                }
            ],
			[
				{
                    text: "Join to Secret Channel",
                    url: "https://t.me/+l4tosHEq9UxhOGY6"
                }
			]
        ]
    }
    bot.answerInlineQuery(iq.id, [{type: "game", id: "0", game_short_name: gameName, reply_markup: keyboard}]);
});

server.get("/highscore/:score", function(req, res, next) {
    if (!Object.hasOwnProperty.call(queries, req.query.id)) return next();
    let query = queries[req.query.id];
    let options;
    if (query.message) {
        options = {
            chat_id: query.message.chat.id,
            message_id: query.message.message_id
        };
    } else {
        options = {
            inline_message_id: query.inline_message_id
        };
    }
    bot.setGameScore(query.from.id, parseInt(req.params.score), options,
        function (err, result) {});
});

server.get("/gethighscores", function (req, res, next) {
    if (!Object.hasOwnProperty.call(queries, req.query.id)) return next();
    let query = queries[req.query.id];
    let options;
    if (query.message) {
        options = {
            chat_id: query.message.chat.id,
            message_id: query.message.message_id
        };
    } else {
        options = {
            inline_message_id: query.inline_message_id
        };
    }
    bot.getGameHighScores(query.from.id, options,
        function (err, result) {}).then((data) => {
            res.send(data)
    })
})

server.get("/sendExtraLink", function (req, res, next) {
    console.log("Send Extra Link")
    if (!Object.hasOwnProperty.call(queries, req.query.id)) return next();
    let query = queries[req.query.id];
    const keyboard = {
        "inline_keyboard": [
            [
                {
                    text: "Join to Secret Channel",
                    url: "https://t.me/+l4tosHEq9UxhOGY6"
                }
            ]
        ]
    }
    let options = {
        reply_markup: keyboard
    }
	bot.answerCallbackQuery({
        callback_query_id: query.id,
        url: "https://google.com"
    });
    //bot.sendMessage(query.from.id, "Do you want to learn how to play? Please click link below.", options)
})

server.listen(port);