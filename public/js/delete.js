const delButtonHandler = async (event) => {

    console.log(event.target.classList[0]);

      const symbol = event.target.classList[0];
      const response = await fetch(`/api/watchlist/${symbol}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        document.location.replace('/watchlist');
      } else {
        alert('Failed to delete cryptocurrency');
      }
};



  console.log(document.querySelectorAll('.delete-btn'));
  document.querySelectorAll('.delete-btn').forEach(
    btn => {btn.addEventListener('click', delButtonHandler)
});