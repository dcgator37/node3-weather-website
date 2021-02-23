//jshint esversion: 8

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

// messageOne.textContent = 'From javascript';

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const location = search.value;

  messageOne.textContent = 'Loading...';
  messageTwo.textContent = '';

  fetch("/weather?address=" + encodeURIComponent(location)).then((res) => {
    res.json().then((data) => {
      if (data.error) {
          messageOne.textContent = data.error;
      } else {
        // console.log(data.location);
        // console.log(data.forecast);
        messageOne.textContent = data.location;
        messageTwo.textContent = data.forecast;
      }
    });
  });

});
