const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('post-id')) {
      const id = event.target.getAttribute('post-id');
      const response = await fetch(`/api/post/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to delete post');
      }
    }
  };
  document
  .querySelector('#delete-btn').addEventListener('click', delButtonHandler);