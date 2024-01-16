document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");
  // const addCommentButton = document.getElementById("add-comment");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const comment = document.getElementById("newComment").value;

    const newComment = {
      comment_body: comment,
    };

    fetch("/api/comments/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newComment),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Comment added:", data);
        alert("Comment Added");
      })
      .catch((error) => {
        console.error("Error adding comment:", error);
        alert("Error adding comment. Please try again later");
      });
  });
});
