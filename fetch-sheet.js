// URL of your public CSV Google Sheet
const SHEET_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vR_TbE5jib4eA9eleJYOFvlP6fXBHwsJm7XUB_EnQA13ir04voxdgVYz_t_ZB3H2zcwAxLGod3sWDJN/pub?output=csv';

// Function to parse CSV text into array of objects
function parseCSV(text) {
  const lines = text.trim().split('\n');
  const headers = lines[0].split(',');
  return lines.slice(1).map(line => {
    const values = line.split(',');
    let obj = {};
    headers.forEach((header, i) => {
      obj[header.trim()] = values[i]?.trim();
    });
    return obj;
  });
}

// Function to format date to YYYY-MM-DD (for matching)
function formatDate(date) {
  return date.toISOString().split('T')[0];
}

// Main function to fetch data and display today's post
async function showTodaysPost() {
  try {
    const response = await fetch(SHEET_CSV_URL);
    const csvText = await response.text();
    const rows = parseCSV(csvText);

    const todayStr = formatDate(new Date());

    // Find the row with Date === todayStr
    const todaysPost = rows.find(row => row.Date === todayStr);

    const container = document.getElementById('post-container');

    if (!container) {
      console.error('No element with id "post-container" found in HTML.');
      return;
    }

    if (todaysPost) {
      container.innerHTML = `
        <h2>📅 Post for ${todaysPost.Date}</h2>
        <p><strong>English:</strong> ${todaysPost['English Caption']}</p>
        <p><strong>اردو:</strong> ${todaysPost['Urdu Caption']}</p>
        <p><em>Reference:</em> ${todaysPost.Reference}</p>
        <p><small>Hashtags: ${todaysPost.Hashtags}</small></p>
      `;
    } else {
      container.innerHTML = `<p>No post found for today (${todayStr}). Please add one in the sheet.</p>`;
    }
  } catch (error) {
    console.error('Error fetching or processing sheet:', error);
  }
}

// Run on page load
window.onload = showTodaysPost;
