const SHEET_ID = "1At3qrKeciR4cvyKOdtf7tlllxb2Fe-sQ1oLPk6cJ4is"; // New Sheet ID
const API_KEY = "AIzaSyBRo1I7a8f0c05ym2XHMWlxvBKvedNnbkI"; // Replace with your actual API key

// Define ranges for Live Scores, Upcoming Matches, and Bowler Stats
const LIVE_SCORES_RANGE = "Live Scores!A2:D10"; // Adjust the range as per your sheet
const UPCOMING_MATCHES_RANGE = "Upcoming Matches!A2:D10"; // Adjust the range as per your sheet
const BOWLER_STATS_RANGE = "Bowler Stats!A2:D10"; // Adjust the range for bowler stats

// URLs for each range
const liveScoresURL = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${LIVE_SCORES_RANGE}?key=${API_KEY}`;
const upcomingMatchesURL = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${UPCOMING_MATCHES_RANGE}?key=${API_KEY}`;
const bowlerStatsURL = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${BOWLER_STATS_RANGE}?key=${API_KEY}`;

// Fetch and display Live Scores
async function fetchLiveScores() {
  try {
    const response = await fetch(liveScoresURL);
    if (!response.ok) throw new Error(`Error: ${response.statusText}`);
    const data = await response.json();
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
    displayUpcomingMatches(data.values);
  } catch (error) {
    console.error("Error fetching upcoming matches:", error);
    document.getElementById("upcomingMatches").innerHTML = `Failed to load upcoming matches: ${error.message}`;
  }
}

// Fetch and display Bowler Stats
async function fetchBowlerStats() {
  try {
    const response = await fetch(bowlerStatsURL);
    if (!response.ok) throw new Error(`Error: ${response.statusText}`);
    const data = await response.json();
    displayBowlerStats(data.values);
  } catch (error) {
    console.error("Error fetching bowler stats:", error);
    document.getElementById("bowlerStats").innerHTML = `Failed to load bowler stats: ${error.message}`;
  }
}

// Display Live Scores in Table
function displayLiveScores(data) {
  const liveScoresContainer = document.getElementById("liveScores");
  liveScoresContainer.innerHTML = ""; // Clear loading message

  const table = document.createElement("table");

  // Header Row
  const headerRow = document.createElement("tr");
  const headers = ["Match", "Score", "Bowler", "Stats"];
  headers.forEach(header => {
    const th = document.createElement("th");
    th.textContent = header;
    headerRow.appendChild(th);
  });
  table.appendChild(headerRow);

  // Data Rows
  data.forEach(row => {
    const tr = document.createElement("tr");
    row.forEach(cell => {
      const td = document.createElement("td");
      td.textContent = cell;
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

  // Header Row
  const headerRow = document.createElement("tr");
  const headers = ["Match", "Date", "Time", "Venue"];
  headers.forEach(header => {
    const th = document.createElement("th");
    th.textContent = header;
    headerRow.appendChild(th);
  });
  table.appendChild(headerRow);

  // Data Rows
  data.forEach(row => {
    const tr = document.createElement("tr");
    row.forEach(cell => {
      const td = document.createElement("td");
      td.textContent = cell;
      tr.appendChild(td);
    });
    table.appendChild(tr);
  });

  upcomingMatchesContainer.appendChild(table);
}

// Display Bowler Stats in Table
function displayBowlerStats(data) {
  const bowlerStatsContainer = document.getElementById("bowlerStats");
  bowlerStatsContainer.innerHTML = ""; // Clear loading message

  const table = document.createElement("table");

  // Header Row
  const headerRow = document.createElement("tr");
  const headers = ["Bowler", "Overs", "Wickets", "Stats"];
  headers.forEach(header => {
    const th = document.createElement("th");
    th.textContent = header;
    headerRow.appendChild(th);
  });
  table.appendChild(headerRow);

  // Data Rows
  data.forEach(row => {
    const tr = document.createElement("tr");
    row.forEach(cell => {
      const td = document.createElement("td");
      td.textContent = cell;
      tr.appendChild(td);
    });
    table.appendChild(tr);
  });

  bowlerStatsContainer.appendChild(table);
}

// Fetch data every 1 second
setInterval(fetchLiveScores, 1000);
setInterval(fetchUpcomingMatches, 1000);
setInterval(fetchBowlerStats, 1000);

// Initial data fetch on page load
fetchLiveScores();
fetchUpcomingMatches();
fetchBowlerStats();

