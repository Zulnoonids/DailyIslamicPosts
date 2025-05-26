const https = require('https');

const sheetUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vR_TbE5jib4eA9eleJYOFvlP6fXBHwsJm7XUB_EnQA13ir04voxdgVYz_t_ZB3H2zcwAxLGod3sWDJN/pub?output=csv';

https.get(sheetUrl, (res) => {
  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    const rows = data.trim().split('\n').slice(1); // Skip header row
    const today = new Date().toISOString().split('T')[0];

    const todayPost = rows.find(row => row.startsWith(today));

    if (todayPost) {
      const [date, caption, arabic, urdu] = todayPost.split(',');
      const fullPost = `${caption}\n\n${arabic}\n\n${urdu}`;
      console.log(fullPost);
    } else {
      console.log('No post for today');
    }
  });

}).on('error', (err) => {
  console.error('Error fetching Google Sheet:', err.message);
});
