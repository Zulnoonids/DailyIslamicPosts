async function loadCSV() {
  const response = await fetch('https://docs.google.com/spreadsheets/d/e/2PACX-1vR_TbE5jib4eA9eleJYOFvlP6fXBHwsJm7XUB_EnQA13ir04voxdgVYz_t_ZB3H2zcwAxLGod3sWDJN/pub?output=csv');
  const data = await response.text();
  const rows = data.split('\n').slice(1); // skip header

  const today = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD
  let found = false;
  let html = '';

  rows.forEach(row => {
    const cols = row.split(',');
    const rowDate = cols[0]?.trim();

    if (rowDate === today) {
      found = true;
      html += `
        <div style="border:1px solid #ccc; padding:10px; margin:10px;">
          <strong>Date:</strong> ${cols[0]}<br>
          <strong>English:</strong> ${cols[1]}<br>
          <strong>Urdu:</strong> ${cols[2]}<br>
          <strong>Reference:</strong> ${cols[3]}<br>
          <strong>Hashtags:</strong> ${cols[4]}<br>
        </div>`;
    }
  });

  if (!found) {
    html = "<div>No post for today found.</div>";
  }

  document.getElementById('content').innerHTML = html;
}

loadCSV();
