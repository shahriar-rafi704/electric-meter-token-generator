const smsInput = document.getElementById('smsInput');
const generateBtn = document.getElementById('generateBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const otpDisplay = document.getElementById('otpDisplay');

// Variables to store OTPs and current index
let otps = [];
let currentIndex = 0; // Initialize to 0

// Function to extract and store OTPs from SMS input
function extractOTP() {
    // Get the SMS input value
    const sms = smsInput.value.trim();
    
    // Split SMS into OTPs
    const otpStrings = sms.match(/\d{4}-\d{4}-\d{4}-\d{4}-\d{4}/g); // Extract OTP-like strings
    otps = otpStrings ? otpStrings.map(otp => otp.replace(/-/g, '')) : []; // Remove dashes and store in otps array
}

// Function to display the next OTP
function displayNextOTP() {
    if (currentIndex < otps.length - 1) { // Check if currentIndex is within bounds
        currentIndex++; // Increment index to display the next OTP
        const formattedOTP = otps[currentIndex].match(/.{1,4}/g).join('-'); // Insert dashes between every four digits
        otpDisplay.innerText = formattedOTP;
    }
    // Disable or enable navigation buttons based on the current index
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex === otps.length - 1;
}

// Function to display the previous OTP
function displayPreviousOTP() {
    if (currentIndex > 0) { // Check if currentIndex is within bounds
        currentIndex--; // Decrement index to display the previous OTP
        const formattedOTP = otps[currentIndex].match(/.{1,4}/g).join('-'); // Insert dashes between every four digits
        otpDisplay.innerText = formattedOTP;
    }
    // Disable or enable navigation buttons based on the current index
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex === otps.length - 1;
}

// Event listener for the Generate OTP button
generateBtn.addEventListener('click', () => {
    extractOTP();
    currentIndex = 0; // Reset index to 0 after generating OTPs
    if (otps.length > 0) { // Ensure there are OTPs to display
        const formattedOTP = otps[currentIndex].match(/.{1,4}/g).join('-'); // Insert dashes between every four digits
        otpDisplay.innerText = formattedOTP;
        nextBtn.disabled = otps.length === 1; // Disable nextBtn if only one OTP
    }
    prevBtn.disabled = true; // Disable prevBtn initially
});

// Event listener for the Previous button
prevBtn.addEventListener('click', () => {
    displayPreviousOTP();
});

// Event listener for the Next button
nextBtn.addEventListener('click', () => {
    displayNextOTP();
});