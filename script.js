// Google Sheets API Configuration
const SHEET_ID = "14T-ddsNQGLZoWcBoh5_P7F5j1PdAxVxOxfjxqjtpjqo";
const API_KEY = "AIzaSyBRo1I7a8f0c05ym2XHMWlxvBKvedNnbkI";

// Define ranges for Live Scores and Upcoming Matches
const LIVE_SCORES_RANGE = "Live Scores!A1:D10"; // Match | Score | Bowler Name | Status
const UPCOMING_MATCHES_RANGE = "Upcoming Matches!A1:D10"; // Match | Date | Time | Venue

// URLs for each range
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
    document.getElementById("liveScores").innerHTML = "<p>Failed to load live scores.</p>";
  }
}

// Display Live Scores in the Table
function displayLiveScores(data) {
  const container = document.getElementById("liveScores");
  const tableBody = container.querySelector("tbody");
  tableBody.innerHTML = ""; // Clear existing rows

  data.forEach((row) => {
    const rowElement = document.createElement("tr");

    row.forEach((cell) => {
      const cellElement = document.createElement("td");
      cellElement.textContent = cell;
      rowElement.appendChild(cellElement);
    });

    tableBody.appendChild(rowElement);
  });

  // Update Bowler Card with the first bowler's data
  if (data.length > 0 && data[0].length >= 3) {
    const [match, score, bowlerName, status] = data[0]; // Assuming first row has data
    updateBowlerCard(bowlerName, score, match);
  }
}

// Update Bowler Card
function updateBowlerCard(bowlerName, stats, match) {
  document.querySelector(".bowler-info span").textContent = `Bowler: ${bowlerName}`;
  document.querySelector(".bowler-info").setAttribute("title", `Match: ${match} | Stats: ${stats}`);
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
    document.getElementById("upcomingMatches").innerHTML = "<p>Failed to load upcoming matches.</p>";
  }
}

// Display Upcoming Matches in the Table
function displayUpcomingMatches(data) {
  const container = document.getElementById("upcomingMatches");
  const tableBody = container.querySelector("tbody");
  tableBody.innerHTML = ""; // Clear existing rows

  data.forEach((row) => {
    const rowElement = document.createElement("tr");

    row.forEach((cell) => {
      const cellElement = document.createElement("td");
      cellElement.textContent = cell;
      rowElement.appendChild(cellElement);
    });

    tableBody.appendChild(rowElement);
  });
}

// Fetch data every 1 second
setInterval(() => {
  fetchLiveScores();
  fetchUpcomingMatches();
}, 1000);

// Initial Fetch
fetchLiveScores();
fetchUpcomingMatches();


