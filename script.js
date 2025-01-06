const SHEET_ID = "1At3qrKeciR4cvyKOdtf7tlllxb2Fe-sQ1oLPk6cJ4is"; // New Sheet ID
const API_KEY = "AIzaSyBRo1I7a8f0c05ym2XHMWlxvBKvedNnbkI"; // Replace with your actual API key

// Define ranges for Live Scores and Upcoming Matches
const LIVE_SCORES_RANGE = "LiveScores!A1:D10"; // Adjust as per your range
const UPCOMING_MATCHES_RANGE = "Upcoming Matches!A1:D10"; // Adjust as per your range

// URLs for each range
const liveScoresURL = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${LIVE_SCORES_RANGE}?key=${API_KEY}`;
const upcomingMatchesURL = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${UPCOMING_MATCHES_RANGE}?key=${API_KEY}`;

// Fetch and display Live Scores
async function fetchLiveScores() {
  try {
    const response = await fetch(liveScoresURL);
    if (!response.ok) throw new Error(`Error: ${response.statusText}`);
    const data = await response.json();
    if (!data.values || data.values.length === 0) {
      throw new Error("No data found in the sheet.");
    }
    displayLiveScores(data.values);
  } catch (error) {
    console.error("Error fetching live scores:", error);
    document.getElementById("liveScores").innerHTML = `Failed to load live scores: ${error.message}`;
  }
}

// Fetch and display Upcoming Matches
async function fetchUpcomingMatches() {
  try {
    const response = await fetch(upcomingMatchesURL);
    if (!response.ok) throw new Error(`Error: ${response.statusText}`);
    const data = await response.json();
    if (!data.values || data.values.length === 0) {
      throw new Error("No data found in the sheet.");
    }
    displayUpcomingMatches(data.values);
  } catch (error) {
    console.error("Error fetching upcoming matches:", error);
    document.getElementById("upcomingMatches").innerHTML = `Failed to load upcoming matches: ${error.message}`;
  }
}

// Display Live Scores in Table
function displayLiveScores(data) {
  const liveScoresContainer = document.getElementById("liveScores");
  liveScoresContainer.innerHTML = ""; // Clear loading message

  const table = document.createElement("table");
  table.style.width = "100%";
  table.style.borderCollapse = "collapse";
  table.style.border = "1px solid #ddd";

  // Header Row
  const headerRow = document.createElement("tr");
  const headers = ["Match", "Score", "Bowler", "Stats"];
  headers.forEach(header => {
    const th = document.createElement("th");
    th.style.padding = "10px";
    th.style.backgroundColor = "#00509E";
    th.style.color = "#fff";
    th.style.fontWeight = "bold";
    th.style.textAlign = "left";
    th.textContent = header;
    headerRow.appendChild(th);
  });
  table.appendChild(headerRow);

  // Data Rows
  data.forEach(row => {
    const tr = document.createElement("tr");
    row.forEach((cell, index) => {
      const td = document.createElement("td");
      td.style.padding = "10px";
      td.style.textAlign = "left";
      td.textContent = cell;

      // Add specific styles for Bowler and Stats columns
      if (index === 2) {
        td.style.fontStyle = "italic";
      }

      tr.appendChild(td);
    });
    table.appendChild(tr);
  });

  liveScoresContainer.appendChild(table);
}

// Display Upcoming Matches in Table
function displayUpcomingMatches(data) {
  const upcomingMatchesContainer = document.getElementById("upcomingMatches");
  upcomingMatchesContainer.innerHTML = ""; // Clear loading message

  const table = document.createElement("table");
  table.style.width = "100%";
  table.style.borderCollapse = "collapse";
  table.style.border = "1px solid #ddd";

  // Header Row
  const headerRow = document.createElement("tr");
  const headers = ["Match", "Date", "Time", "Venue"];
  headers.forEach(header => {
    const th = document.createElement("th");
    th.style.padding = "10px";
    th.style.backgroundColor = "#00509E";
    th.style.color = "#fff";
    th.style.fontWeight = "bold";
    th.style.textAlign = "left";
    th.textContent = header;
    headerRow.appendChild(th);
  });
  table.appendChild(headerRow);

  // Data Rows
  data.forEach(row => {
    const tr = document.createElement("tr");
    row.forEach(cell => {
      const td = document.createElement("td");
      td.style.padding = "10px";
      td.style.textAlign = "left";
      td.textContent = cell;
      tr.appendChild(td);
    });
    table.appendChild(tr);
  });

  upcomingMatchesContainer.appendChild(table);
}

// Fetch data every 1 second
setInterval(fetchLiveScores, 1000);  // Refresh every second for live scores
setInterval(fetchUpcomingMatches, 1000);  // Refresh every second for upcoming matches

// Initial data fetch on page load
fetchLiveScores();
fetchUpcomingMatches();


