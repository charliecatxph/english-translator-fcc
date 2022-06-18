'use strict';

const Translator = require('../components/translator.js');
const translator = new Translator();
 
module.exports = function (app) {
  app.route('/api/translate')
    .post((req, res) => {
      const { text, locale} = req.body;
      

      if (text === undefined || locale === undefined) {
        res.json({ error : "Required field(s) missing" })
        return;
      }
      const text_x = text.trim();
      if (!text_x) {
        res.json({ error: 'No text to translate' });
        return;
      }

      switch(locale) {
        case "american-to-british": {
          const translated = translator.american_to_british(text_x);

          if (translated === text_x) {
            res.json({
              text: text_x,
              translation: "Everything looks good to me!"
            })
          } else {
            res.json({
              text: text_x,
              translation: translated
            })
          }
          break;
        }
        case "british-to-american": {
          const translated = translator.british_to_american(text_x);
          
          if (translated === text_x) {
            res.json({
              text: text_x,
              translation: "Everything looks good to me!"
            })
          } else {
            res.json({
              text: text_x,
              translation: translated
            })
          }
          break;
        }
        default: {
          res.json({ error: 'Invalid value for locale field' });
          return;
        }
      }

      
      
    });
};
