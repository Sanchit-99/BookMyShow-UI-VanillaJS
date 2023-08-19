const container = document.querySelector(".container")
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');
const seats = document.querySelectorAll(".row .seat:not(.occupied)")

populateUI();
let ticketPrice = +movieSelect.value;
function populateUI(){
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add('selected');
      }
    });
  }

  const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }
}

// Save selected movie index and price
function setMovieData(movieIndex, moviePrice) {
    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('selectedMoviePrice', moviePrice);
  }

function updatePrice(){
    const selectedSeats = document.querySelectorAll('.container .selected')


    const seatIndex = [...selectedSeats].map((seat)=>[...seats].indexOf(seat))
    console.log(seatIndex);

    localStorage.setItem('selectedSeats',JSON.stringify(seatIndex))

    const selectedSeatCount = +selectedSeats.length

    count.innerText=selectedSeatCount
    console.log(selectedSeatCount*ticketPrice);
    total.innerText=selectedSeatCount*ticketPrice

    setMovieData(movieSelect.selectedIndex, movieSelect.value);
    
}   

container.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("occupied")
  ) {
    e.target.classList.toggle('selected')
    updatePrice()
  }
})


movieSelect.addEventListener('change', e => {
    ticketPrice = +e.target.value;
    setMovieData(e.target.selectedIndex, e.target.value);
    updatePrice();
  });

updatePrice()