
let currentPage = 1;
const pageSize = 10;

async function fetchNews(page = 1) {
  const country = document.getElementById('country').value.toLowerCase();
  const category = document.getElementById('category').value;
  const newsContainer = document.getElementById('news-container');
  const pagination = document.getElementById('pagination');

  if (!country) {
    newsContainer.innerHTML = '<p>Please enter a valid country code.</p>';
    return;
  }

  // const = '2c6b2c6d77a4901f7c114a7ae6b1891e'; 
  const apiKey  = "YOUR_API_KEY_HERE"; // Replace with your actual API key
  const apiUrl = `http://api.mediastack.com/v1/news?access_key=${apiKey}&countries=${country}&categories=${category}&languages=en&limit=${pageSize}&offset=${(page - 1) * pageSize}&sort=published_desc`;

  newsContainer.innerHTML = '<p class="loading">Loading...</p>';

  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error('Unable to fetch news data. Please ensure the country code and category are correct.');
    }

    const data = await response.json();
    const articles = data.data;

    if (!articles || articles.length === 0) {
      newsContainer.innerHTML = '<p>No news found for the selected criteria.</p>';
      return;
    }

    newsContainer.innerHTML = articles
      .map(article => `
        <div class="news-card">
          <img src="${article.image || 'https://via.placeholder.com/800x400'}" alt="News Image" />
          <h2>${article.title}</h2>
          <p>${article.description || 'No description available.'}</p>
          <a href="${article.url}" target="_blank">Read More</a>
        </div>
      `)
      .join('');

    pagination.innerHTML = `
      <button onclick="fetchNews(${page - 1})" ${page === 1 ? 'disabled' : ''}>Previous</button>
      <button onclick="fetchNews(${page + 1})">Next</button>
    `;
  } catch (error) {
    newsContainer.innerHTML = `<p>Error fetching news: ${error.message}</p>`;
  }
}

function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
  document.querySelector('.news-app').classList.toggle('dark-mode');
}
