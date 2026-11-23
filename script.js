
/* =========================================
   HEALIS PHARMACY & CLINIC
   Main JavaScript
========================================= */


/* 1. MOBILE NAVIGATION */

const menuToggle = document.querySelector("#menu-toggle");
const navbar = document.querySelector("#navbar");
const navLinks = document.querySelectorAll(".nav-link");

menuToggle.addEventListener("click", function () {

    navbar.classList.toggle("active");

    const isOpen = navbar.classList.contains("active");

    menuToggle.setAttribute("aria-expanded", isOpen);

    menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu"
    );

    menuToggle.innerHTML = isOpen
        ? '<i class="fa-solid fa-xmark"></i>'
        : '<i class="fa-solid fa-bars"></i>';

});


// Close mobile menu when a navigation link is clicked

navLinks.forEach(function (link) {

    link.addEventListener("click", function () {

        navbar.classList.remove("active");

        menuToggle.setAttribute("aria-expanded", "false");

        menuToggle.setAttribute(
            "aria-label",
            "Open navigation menu"
        );

        menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';

    });

});


// Close mobile menu when clicking outside

document.addEventListener("click", function (event) {

    const clickedInsideMenu = navbar.contains(event.target);
    const clickedToggle = menuToggle.contains(event.target);

    if (!clickedInsideMenu && !clickedToggle) {

        navbar.classList.remove("active");

        menuToggle.setAttribute("aria-expanded", "false");

        menuToggle.setAttribute(
            "aria-label",
            "Open navigation menu"
        );

        menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';

    }

});



/* 2. HEADER SCROLL EFFECT */

const header = document.querySelector("#header");

window.addEventListener("scroll", function () {

    if (window.scrollY > 50) {

        header.style.boxShadow = "0 5px 25px rgba(0,0,0,0.08)";

    } else {

        header.style.boxShadow = "none";

    }

});



/* 3. ACTIVE NAVIGATION LINK */

const sections = document.querySelectorAll("section[id]");

function updateActiveLink() {

    let currentSection = "";

    sections.forEach(function (section) {

        const sectionTop = section.offsetTop - 120;
        const sectionHeight = section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {

            currentSection = section.getAttribute("id");

        }

    });


    navLinks.forEach(function (link) {

        link.classList.remove("active");

        if (
            link.getAttribute("href") === "#" + currentSection
        ) {

            link.classList.add("active");

        }

    });

}

window.addEventListener("scroll", updateActiveLink);



/* 4. CURRENT YEAR IN FOOTER */

const currentYear = document.querySelector("#current-year");

currentYear.textContent = new Date().getFullYear();



/* 5. APPOINTMENT DATE VALIDATION */

const appointmentDate = document.querySelector("#appointment-date");

const today = new Date();

const localToday = new Date(
    today.getTime() - today.getTimezoneOffset() * 60000
).toISOString().split("T")[0];

appointmentDate.setAttribute("min", localToday);



/* 6. APPOINTMENT FORM */

const appointmentForm = document.querySelector("#appointment-form");

appointmentForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const fullName = document.querySelector("#full-name").value.trim();

    const phone = document.querySelector("#phone").value.trim();

    const email = document.querySelector("#email").value.trim();

    const department = document.querySelector("#department").value;

    const selectedDate = document.querySelector("#appointment-date").value;


    // Basic validation

    if (
        !fullName ||
        !phone ||
        !department ||
        !selectedDate
    ) {

        alert("Please complete all required fields.");

        return;

    }


    // Prevent past appointment dates

    if (selectedDate < localToday) {

        alert("Please select today or a future date.");

        return;

    }


    // Basic Kenyan phone number validation

    const phonePattern = /^(?:\+254|254|0)7\d{8}$/;

    if (!phonePattern.test(phone.replace(/\s+/g, ""))) {

        alert("Please enter a valid Kenyan mobile number.");

        return;

    }


    // Demonstration confirmation

    alert(
        "Thank you, " + fullName + "!\n\n" +
        "Your appointment request has been validated.\n\n" +
        "Service: " + department + "\n" +
        "Preferred Date: " + selectedDate + "\n\n" +
        "IMPORTANT: This is a website demonstration. " +
        "Your request has NOT been sent to Healis."
    );


    appointmentForm.reset();

    appointmentDate.setAttribute("min", localToday);

});



/* 7. WHATSAPP INTEGRATION */

const whatsappButton = document.querySelector("#whatsapp-btn");

// Replace with the actual business WhatsApp number.
// Use international format without + or spaces.

const whatsappNumber = "254700000000";

const whatsappMessage =
    "Hello Healis Pharmacy & Clinic. I would like to make an enquiry about your services.";

whatsappButton.href =
    "https://wa.me/" +
    whatsappNumber +
    "?text=" +
    encodeURIComponent(whatsappMessage);

whatsappButton.target = "_blank";

whatsappButton.rel = "noopener noreferrer";



/* 8. SMOOTH SCROLL FOR INTERNAL LINKS */

const internalLinks = document.querySelectorAll('a[href^="#"]');

internalLinks.forEach(function (link) {

    link.addEventListener("click", function (event) {

        const targetId = link.getAttribute("href");

        if (targetId === "#") return;

        const targetSection = document.querySelector(targetId);

        if (targetSection) {

            event.preventDefault();

            targetSection.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }

    });

});



/* 9. SCROLL REVEAL ANIMATIONS */

const revealElements = document.querySelectorAll(
    ".service-card, .why-card, .doctor-card, " +
    ".contact-card, .about-content, .about-image, " +
    ".pharmacy-content, .pharmacy-image, " +
    ".clinic-content, .clinic-image"
);

revealElements.forEach(function (element) {

    element.style.opacity = "0";
    element.style.transform = "translateY(30px)";
    element.style.transition =
        "opacity 0.7s ease, transform 0.7s ease";

});


const revealObserver = new IntersectionObserver(

    function (entries, observer) {

        entries.forEach(function (entry) {

            if (entry.isIntersecting) {

                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";

                observer.unobserve(entry.target);

            }

        });

    },

    {
        threshold: 0.12
    }

);


revealElements.forEach(function (element) {

    revealObserver.observe(element);

});



/* 10. PREVENT EMPTY SOCIAL LINKS FROM JUMPING */

const socialLinks = document.querySelectorAll(
    '.social-links a[href="#"]'
);

socialLinks.forEach(function (link) {

    link.addEventListener("click", function (event) {

        event.preventDefault();

    });

});


/* =========================================
   HEALIS JAVASCRIPT COMPLETE
========================================= */
