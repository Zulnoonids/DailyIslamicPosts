const https = require('https');
const { parse } = require('csv-parse/sync');

const sheetUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vR_TbE5jib4eA9eleJYOFvlP6fXBHwsJm7XUB_EnQA13ir04voxdgVYz_t_ZB3H2zcwAxLGod3sWDJN/pub?output=csv';

https.get(sheetUrl, (res) => {
  let data = '';

  res.on('data', chunk => data += chunk);

  res.on('end', () => {
    try {
      const records = parse(data, {
        columns: true,
        skip_empty_lines: true
      });

      const today = new Date().toISOString().split('T')[0];

      const todaysPost = records.find(row => row.Date === today);

      if (todaysPost) {
        const fullPost = `${todaysPost['English Caption']}\n\n${todaysPost['Urdu Caption']}\n\n${todaysPost.Reference}\n\n${todaysPost.Hashtags}`;
        console.log(fullPost);
      } else {
        console.log('No post for today');
      }
    } catch (err) {
      console.error('Error parsing CSV:', err.message);
    }
  });

}).on('error', err => {
  console.error('Error fetching Google Sheet:', err.message);
});
