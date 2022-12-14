const searchHandler = async (event) => {
  event.preventDefault();

  // Collect values from the login form
  let name = document.querySelector('#crypto-input').value.trim().toLowerCase();

  console.log("SEARCH BAR")
  console.log(name)

  function clearValue() {
    document.querySelector('#crypto-input').value = " "
  };

  if (name) {
    // Send a POST request to the API endpoint
    const response = await fetch(`/search/${name}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    });

    if (response.ok) {
      // If successful, redirect the browser to the profile page
      document.location.replace(`/search/${name}`);
    } else {
      // alert(response.statusText);
      setTimeout(clearValue, 3000);

      document.querySelector('#crypto-input').value = "Cryptocurrency not found";

    }
  }
};


document
  .querySelector('#search-btn')
  .addEventListener('click', searchHandler);