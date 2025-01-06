const SHEET_ID = "14T-ddsNQGLZoWcBoh5_P7F5j1PdAxVxOxfjxqjtpjqo";
const API_KEY = "AIzaSyBRo1I7a8f0c05ym2XHMWlxvBKvedNnbkI";

// Define ranges for Live Scores and Upcoming Matches
const LIVE_SCORES_RANGE = "Live Scores!A1:D10";
const UPCOMING_MATCHES_RANGE = "Upcoming Matches!A1:D10";

// URLs for each range
const liveScoresURL = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${LIVE_SCORES_RANGE}?key=${API_KEY}`;
const upcomingMatchesURL = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${UPCOMING_MATCHES_RANGE}?key=${API_KEY}`;

// Fetch and display Live Scores
async function fetchLiveScores() {
  try {
    const response = await fetch(liveScoresURL);
    if (!response.ok) throw new Error(`Error: ${response.statusText}`);
    
    const data = await response.json();
    displayData(data.values, "liveScores");
  } catch (error) {
    console.error("Error fetching live scores:", error);
    document.getElementById("liveScores").innerHTML = "Failed to load live scores.";
  }
}

// Fetch and display Upcoming Matches
async function fetchUpcomingMatches() {
  try {
    const response = await fetch(upcomingMatchesURL);
    if (!response.ok) throw new Error(`Error: ${response.statusText}`);
    
    const data = await response.json();
    displayData(data.values, "upcomingMatches");
  } catch (error) {
    console.error("Error fetching upcoming matches:", error);
    document.getElementById("upcomingMatches").innerHTML = "Failed to load upcoming matches.";
  }
}

// Display data in a table format
function displayData(data, containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = "";

  // Create a table
  const table = document.createElement("table");
  table.style.border = "1px solid #000";
  table.style.borderCollapse = "collapse";

  data.forEach((row) => {
    const rowElement = document.createElement("tr");
    row.forEach((cell) => {
      const cellElement = document.createElement("td");
      cellElement.textContent = cell;
      cellElement.style.border = "1px solid #000";
      cellElement.style.padding = "8px";
      rowElement.appendChild(cellElement);
    });
    table.appendChild(rowElement);
  });

  container.appendChild(table);
}

// Fetch data on page load
fetchLiveScores();
fetchUpcomingMatches();
