// fetch-sheet.js
fetch('https://docs.google.com/spreadsheets/d/e/2PACX-1vR_TbE5jib4eA9eleJYOFvlP6fXBHwsJm7XUB_EnQA13ir04voxdgVYz_t_ZB3H2zcwAxLGod3sWDJN/pub?output=csv')
  .then(res => res.text())
  .then(csv => {
    console.log(csv); // for testing
    // In future: convert this CSV into HTML or JSON for auto display
  });
