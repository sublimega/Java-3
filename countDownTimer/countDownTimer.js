const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const giveaway = document.querySelector(".giveaway");
const deadline = document.querySelector(".deadline");
const items = document.querySelectorAll(".deadline_format h4 ");

let futureDate = new Date(2024, 3, 30, 11, 30, 0);
// console.log(futureDate);

const year = futureDate.getFullYear();
const hours = futureDate.getHours();
const minutes = futureDate.getMinutes();

let month = futureDate.getMonth();
month = months[month];

const date = futureDate.getDate();

let day = futureDate.getDay();
day = weekdays[day];

giveaway.textContent = `giveaway ends on ${day}, ${date} ${month} ${year} ${hours}:${minutes}am`;

//Setting the countDown timer

// Getting the remaining time by subtracting the future time from
// the current time by using a function key as shown below;

//future Time
const futureTime = futureDate.getTime();
// console.log(futureTime);

function getRemaingTime() {
  //getting the current/today's Time
  const today = new Date().getTime();
  //   console.log(today);
  //calculating the remaining time by subtracting today's time from future time
  const t = futureTime - today;
  console.log(t);

  //getting how many days, hours, minutes and seconds are in the milliseconds gotten above.
  //NB: 1s = 1000ms
  //    1min = 60s
  //    1hr = 60mins
  //   1d = 24hrs

  //getting how many milliseconds are in one day
  const oneDay = 24 * 60 * 60 * 1000;
  const oneHour = 60 * 60 * 1000;
  const oneMinute = 60 * 1000;
  // to calculate the actual value of t by days, hours, minutes and seconds
  let days = t / oneDay;
  //to get the integer of the days
  days = Math.floor(days);
  // console.log(days)
  let hours = Math.floor((t % oneDay) / oneHour);
  //   console.log(hours);
  let minutes = Math.floor((t % oneHour) / oneMinute);
  let seconds = Math.floor((t % oneMinute) / 1000);
  //   console.log(seconds)

  //placing the values above in an array
  const values = [days, hours, minutes, seconds];

  // function that puts a zero in front of any number that is less than 10 in the countdown
  function format(item) {
    if (item < 10) {
      return (item = `0${item}`);
    }
    return item;
  }

  //function that puts the value calculated into the items array.
  items.forEach(function (item, index) {
    item.innerHTML = format(values[index]);
  });

  if (t < 0) {
    clearInterval(countdown);
    deadline.innerHTML = `h4 class="expired">Sorry, this giveaway has expired</h4>`;
  }
}

//function that enables the countdown clock to keep changing without refreshing the webpage.
let countdown = setInterval(getRemaingTime, 1000);

//function to clear the interval when the time elapses.

getRemaingTime();
