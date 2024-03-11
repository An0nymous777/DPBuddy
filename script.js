
var navLinks = document.getElementById("navLinks");

function showMenu() {
    navLinks.style.right = "0";
}
function hideMenu() {
    navLinks.style.right = "-200px";
}

// ----------------------------------------------------------------------------------------
var tablinks = document.getElementsByClassName("tab-links");
var tabcontents = document.getElementsByClassName("tab-contents");

function opentab(tabname) {
    for (tablink of tablinks) {
    tablink.classList.remove("active-link");
    }
    for (tabcontent of tabcontents) {
    tabcontent.classList.remove("active-tab");
    }
    event.currentTarget.classList.add("active-link");
    document.getElementById(tabname).classList.add("active-tab");
}


function resetForm() {
    // Get the first form with the name
    // Usually the form name is not repeated
    // but duplicate names are possible in HTML
    // Therefore to work around the issue, enforce the correct index
    var title = document.getElementById('clastifyTitle');
    var consection = document.getElementById('contact-us');
    var thankssection = document.getElementById('thankyouSection');
    consection.style.display = "none";
    thankssection.style.display = "block";
 }
 
function submitForm(){
    var frm = document.getElementById('clastify');
    frm.submit(); // Submit the form
    frm.reset();  // Reset all form data
    return false; // Prevent page refresh
}

function goback() {
    var title = document.getElementById('clastifyTitle');
    var consection = document.getElementById('contact-us');
    var thankssection = document.getElementById('thankyouSection');
    consection.style.display = "block";
    thankssection.style.display = "none";
}


// ----------annoucement--------
const closeModalButtons = document.querySelectorAll('[data-close-button]');
const overlay = document.getElementById('overlay');

overlay.addEventListener('click', () => {
    const modals = document.querySelectorAll('.modal.active')
    modals.forEach(modal => {
        closeModal(modal)
    })
})

closeModalButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modal = button.closest('.modal')
        closeModal(modal)
    })
})

function closeModal(modal){
    
    document.body.style.overflowY = "scroll";
    if (modal==null) return
    modal.classList.remove('active');
    overlay.classList.remove('active');
    confetti();
}

// -------------wait video to load---------------
var video = document.querySelector(".back-video");
var pagebody = document.querySelectorAll(".section");
video.load();
video.addEventListener('loadeddata', function() {
    console.log("work");
    for (const section of pagebody) {
        section.style.opacity = "1";
    }
}, false);
