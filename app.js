const result = document.getElementById('result');
const url = window.location.href;
const pointer = url.indexOf('%');
const secret = url.slice(pointer + 3);
const token = `Bearer ${secret}`;

function myFunction() {
  var x = document.getElementById('password');
  if (x.type === 'password') {
    x.type = 'text';
  } else {
    x.type = 'password';
  }
}

function sendData(e) {
  let password = document.getElementById('password').value;
  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: token,
  };

  axios
    .put(
      'http://167.71.238.21:4000/api/users/resetpassword',
      {
        newPassword: password,
        resetLink: token,
      },
      {
        headers: headers,
      }
    )
    .then(function (response) {
      document.getElementById('submitPassword').reset();
      console.log(response);
      var data = response.data.message;
      console.log('message:', data);
      console.log(pointer);
      console.log('secret=', secret);
      console.log('token', token);
      // console.log('location.href', window.location.href);
      // const url = window.location.href;
      // console.log("url:",url);
      // console.log(url.indexOf("="));
      // console.log(url.slice(43));
      alert(data);
      window.location.replace('http://167.71.238.21/result.html');
    })
    .catch(function (error) {
      console.log('error', error.message);
      console.log(pointer);
      console.log('secret=', secret);
      console.log('token', token);
      alert(error);
    });

  e.preventDefault();
}

document.getElementById('submitPassword').addEventListener('submit', sendData);
