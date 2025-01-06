const SHEET_ID = "14T-ddsNQGLZoWcBoh5_P7f5j1PdAxVxOxfjxqjtpjqo"; // Replace with your Sheet ID
const API_KEY = "AIzaSyBRo1I7a8f0c05ym2XHMWlxvBKvedNnbkI";

const LIVE_SCORES_RANGE = "Live Scores!A1:G10"; // Adjusted range to include multiple bowlers
const UPCOMING_MATCHES_RANGE = "Upcoming Matches!A1:D10";

const liveScoresURL = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${LIVE_SCORES_RANGE}?key=${API_KEY}`;
const upcomingMatchesURL = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${UPCOMING_MATCHES_RANGE}?key=${API_KEY}`;

// Fetch and display Live Scores
async function fetchLiveScores() {
  try {
    const response = await fetch(liveScoresURL);
    if (!response.ok) throw new Error(`Error: ${response.statusText}`);
    const data = await response.json();
    displayLiveScores(data.values);
  } catch (error) {
    console.error("Error fetching live scores:", error);
    document.getElementById("liveScores").innerHTML = "Failed to load live scores.";
  }
}

// Display Live Scores with multiple bowlers
function displayLiveScores(data) {
  const liveScoresContainer = document.getElementById("liveScores");
  liveScoresContainer.innerHTML = "";

  const table = document.createElement("table");
  table.style.borderCollapse = "collapse";
  table.style.width = "100%";

  // Add table header
  const headerRow = document.createElement("tr");
  ["Match", "Score", "Bowler 1", "Bowler 1 Stats", "Bowler 2", "Bowler 2 Stats", "Status"].forEach((header) => {
    const th = document.createElement("th");
    th.textContent = header;
    th.style.border = "1px solid #ddd";
    th.style.padding = "10px";
    th.style.backgroundColor = "#00509E";
    th.style.color = "#fff";
    headerRow.appendChild(th);
  });
  table.appendChild(headerRow);

  // Add table rows
  data.forEach((row, index) => {
    if (index === 0) return; // Skip the header row from the sheet
    const tr = document.createElement("tr");
    row.forEach((cell) => {
      const td = document.createElement("td");
      td.textContent = cell;
      td.style.border = "1px solid #ddd";
      td.style.padding = "10px";
      td.style.fontSize = "0.9rem";
      tr.appendChild(td);
    });
    table.appendChild(tr);
  });

  liveScoresContainer.appendChild(table);
}

// Fetch and display Upcoming Matches
async function fetchUpcomingMatches() {
  try {
    const response = await fetch(upcomingMatchesURL);
    if (!response.ok) throw new Error(`Error: ${response.statusText}`);
    const data = await response.json();
    displayUpcomingMatches(data.values);
  } catch (error) {
    console.error("Error fetching upcoming matches:", error);
    document.getElementById("upcomingMatches").innerHTML = "Failed to load upcoming matches.";
  }
}

// Display Upcoming Matches
function displayUpcomingMatches(data) {
  const upcomingMatchesContainer = document.getElementById("upcomingMatches");
  upcomingMatchesContainer.innerHTML = "";

  const table = document.createElement("table");
  table.style.borderCollapse = "collapse";
  table.style.width = "100%";

  // Add table header
  const headerRow = document.createElement("tr");
  ["Match", "Date", "Time", "Venue"].forEach((header) => {
    const th = document.createElement("th");
    th.textContent = header;
    th.style.border = "1px solid #ddd";
    th.style.padding = "10px";
    th.style.backgroundColor = "#00509E";
    th.style.color = "#fff";
    headerRow.appendChild(th);
  });
  table.appendChild(headerRow);

  // Add table rows
  data.forEach((row, index) => {
    if (index === 0) return; // Skip the header row from the sheet
    const tr = document.createElement("tr");
    row.forEach((cell) => {
      const td = document.createElement("td");
      td.textContent = cell;
      td.style.border = "1px solid #ddd";
      td.style.padding = "10px";
      td.style.fontSize = "0.9rem";
      tr.appendChild(td);
    });
    table.appendChild(tr);
  });

  upcomingMatchesContainer.appendChild(table);
}

// Fetch data every second for live updates
setInterval(fetchLiveScores, 1000);
setInterval(fetchUpcomingMatches, 1000);

// Initial fetch
fetchLiveScores();
fetchUpcomingMatches();



