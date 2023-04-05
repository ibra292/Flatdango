const API_URL = "http://localhost:3000/films";


function updateMovieDetails(movie) {
  const poster = document.getElementById("poster");
  poster.src = movie.films.poster;

  const title = document.getElementById("title");
  title.innerText = movie.films.title;

  const runtime = document.getElementById("runtime");
  runtime.innerText = `Runtime: ${movie.films.runtime} minutes`;

  const showtime = document.getElementById("showtime");
  showtime.innerText = `Showtime: ${movie.films.showtime}`;

  const availableTickets = document.getElementById("available-tickets");
  const ticketsRemaining = movie.films.capacity - movie.films.tickets_sold;
  availableTickets.innerText = `Tickets Available: ${ticketsRemaining}`;

  const buyTicketButton = document.getElementById("buy-ticket");
  if (ticketsRemaining === 0) {
    buyTicketButton.disabled = true;
  } else {
    buyTicketButton.disabled = false;
    buyTicketButton.addEventListener("click", function() {
      availableTickets.innerText = `Tickets Available: ${ticketsRemaining - 1}`;
    });
  }
}


function updateFilmList(films) {
  const filmsList = document.getElementById("films");

  films.forEach(function(film) {
    const li = document.createElement("li");
    li.classList.add("film", "item");

    const a = document.createElement("a");
    a.innerText = film.title;
    a.href = "#";
    a.addEventListener("click", function() {
      updateMovieDetails(film);
    });

    li.appendChild(a);
    filmsList.appendChild(li);
  });
}


fetch(`${API_URL}/films/1`)
  .then(response => response.json())
  .then(data => updateMovieDetails(data))
  .catch(error => console.error(error));


fetch(`${API_URL}/films`)
  .then(response => response.json())
  .then(data => updateFilmList(data))
  .catch(error => console.error(error));
