// Function to add the button
function addCopyButton() {
  const urlParams = new URLSearchParams(window.location.search);
  const videoId = urlParams.get("v");

  // If there's no video ID or the button already exists, do nothing
  if (!videoId || document.getElementById("copy-video-id-button")) return;

  // Append the video ID to the page title
  document.title += ` [${videoId}]`;

  // Create a copy button
  const button = document.createElement("button");
  button.id = "copy-video-id-button"; // Unique ID to prevent duplication
  button.innerText = `Copy Video ID: ${videoId}`;
  button.style.position = "fixed";
  button.style.bottom = "20px";
  button.style.right = "20px";
  button.style.zIndex = "1000";
  button.style.padding = "10px 15px";
  button.style.background = "#FF0000";
  button.style.color = "#FFF";
  button.style.border = "none";
  button.style.borderRadius = "5px";
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

  // Append the button to the page
  document.body.appendChild(button);
}

// Function to initialize MutationObserver safely
function initializeObserver() {
  // Ensure document.body exists
  if (!document.body) {
    document.addEventListener('DOMContentLoaded', initializeObserver);
    return;
  }

  // Use MutationObserver to detect page changes
  const observer = new MutationObserver(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('v')) {
      addCopyButton();
    }
  });

  // Start observing the document body for changes
  observer.observe(document.body, { childList: true, subtree: true });

  // Run once initially in case you're already on a video page
  addCopyButton();
}

// Start the observer setup
initializeObserver();
