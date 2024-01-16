document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const title = document.getElementById("newPostTitle").value;
    const body = document.getElementById("newPostBody").value;

    const newPost = {
      post_title: title,
      post_body: body,
    };

    fetch("/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPost),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Blog post submitted:", data);

        alert("Blog post submitted successfully!");
      })
      .catch((error) => {
        console.error("Error submitting blog post:", error);

        alert("Error submitting blog post. Please try again later.");
      });
  });
});
