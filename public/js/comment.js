const addComment = async (event) => {
  event.preventDefault();

  const string = window.location.toString();
  const id = string[4];
  const comment = document.getElementById("newComment").value.trim();
  if (post_body) {
    const response = await fetch(`/api/comments/${id}`, {
      method: "POST",
      body: JSON.stringify({ comment }),
      header: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      alert("Comment added");
      document.location.replace(`/api/comments/${id}`);
    } else {
      alert(response.statusText);
    }
  }
};

const addCommentBtn = document.getElementById("add-comment");

addCommentBtn.addEventListener("submit", addComment);
