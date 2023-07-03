const API_URL = 'http://localhost:3000/api';
function handleLogIn() {
  fetch(API_URL + '/jwt-login', {
    method: 'POST',
    body: JSON.stringify({ email: 'pepe@pepe.com', password: '123' }),
    headers: { 'Content-Type': 'application/json' },
  })
    .then((res) => res.json())
    .then((json) => {
      alert('me loguie!');
      //console.log(json.payload);
      //localStorage.setItem('token', json.payload);
    })
    .catch((e) => {
      console.log(e);
    });
}

function handleFetchProfile() {
  /* const token = localStorage.getItem('token'); */
  fetch(API_URL + '/jwt-profile')
    .then((res) => res.json())
    .then((json) => {
      console.log(json);
    });
}
