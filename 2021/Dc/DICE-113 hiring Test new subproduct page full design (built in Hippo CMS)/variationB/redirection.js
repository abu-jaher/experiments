// Get the current page URL
var currentURL = window.location.href;

// Define a mapping of old URLs to new URLs
var urlMappings = {
    "https://www.dice.com/hiring/employer-brand": "https://www.dice.com/hiring/new/employer-brand",
    "https://www.dice.com/hiring/sourcing-services": "https://www.dice.com/hiring/new/sourcing-services",
    "https://www.dice.com/hiring/virtual-career-events": "https://www.dice.com/hiring/new/virtual-career-events",
    "https://www.dice.com/hiring/post-jobs": "https://www.dice.com/hiring/new/post-jobs",
    "https://www.dice.com/hiring/source-talent": "https://www.dice.com/hiring/new/find-candidates",
    "https://www.dice.com/hiring/employer-resource-library": "https://www.dice.com/hiring/new/reports"
};

// Check if the current URL is in the URL mappings
if (currentURL in urlMappings) {
    // Redirect to the corresponding new URL
    window.location.href = urlMappings[currentURL];
}