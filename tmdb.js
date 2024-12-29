// Function to add a copy button to each video card
function addCopyButtonsToTrailers() {
  // Select all video cards
  const videoCards = document.querySelectorAll(".video.card.default");

  videoCards.forEach((card) => {
    // Check if the button already exists to avoid duplicates
    if (card.querySelector(".copy-trailer-button")) return;

    // Find the YouTube video ID in the card
    const playTrailerLink = card.querySelector(".play_trailer");
    const videoId = playTrailerLink?.getAttribute("data-id");

    if (!videoId) return; // Skip if no video ID is found

    // Create the copy button
    const button = document.createElement("button");
    button.className = "copy-trailer-button";
    button.innerText = "Copy Trailer ID";
    button.style.marginTop = "10px";
    button.style.padding = "8px 12px";
    button.style.background = "#FF0000";
    button.style.color = "#FFF";
    button.style.border = "none";
    button.style.borderRadius = "4px";
    button.style.cursor = "pointer";

    // Add click event to copy the video ID
    button.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(videoId);
        const originalText = button.innerText;
        button.innerText = "Copied!";
        setTimeout(() => {
          button.innerText = originalText;
        }, 1000);
      } catch (err) {
        console.error("Failed to copy: ", err);
      }
    });

    // Append the button to the card
    const infoDiv = card.querySelector(".info.movie");
    if (infoDiv) {
      infoDiv.appendChild(button);
    }
  });
}

// Use a MutationObserver to handle dynamic changes to the DOM
const observer = new MutationObserver(() => {
  addCopyButtonsToTrailers();
});

// Start observing the document body for changes
observer.observe(document.body, { childList: true, subtree: true });

// Run the function once initially to add buttons to existing video cards
addCopyButtonsToTrailers();
