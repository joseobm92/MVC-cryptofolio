const signupFormHandler = async (event) => {
    event.preventDefault();
  
    const username = document.querySelector('#usernameInput').value.trim();
  console.log(username)
    const password = document.querySelector('#passwordInput').value.trim();
    console.log(password)
    if (username && password) {
      const response = await fetch('/api/user', {
        method: 'POST',
        body: JSON.stringify({
          username,
          password
        }),
        headers: {
          'Content-Type': 'application/json'
        },
      });
  
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert(response.statusText);
      }
    }
  };
  
  document
    .querySelector('.btn-create')
    .addEventListener('click', signupFormHandler);