 // Mobile Menu Toggle
 const mobileMenuBtn = document.getElementById('mobileMenuBtn');
 const navMenu = document.getElementById('navMenu');
 
 mobileMenuBtn.addEventListener('click', () => {
     navMenu.classList.toggle('active');
 });
 
 // Form Submission Handler
 
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData(contactForm);

  const response = await fetch("https://formspree.io/f/xeogyrky", {
    method: "POST",
    headers: {
      Accept: "application/json"
    },
    body: formData
  });

  if (response.ok) {
    alert("Thank you for your message! We will get back to you soon.");
    contactForm.reset();
  } else {
    alert("Oops! Something went wrong. Please try again.");
  }
});


 
 // Smooth Scrolling for Anchor Links
 document.querySelectorAll('a[href^="#"]').forEach(anchor => {
     anchor.addEventListener('click', function(e) {
         e.preventDefault();
         
         const targetId = this.getAttribute('href');
         if (targetId === '#') return;
         
         const targetElement = document.querySelector(targetId);
         if (targetElement) {
             window.scrollTo({
                 top: targetElement.offsetTop - 80,
                 behavior: 'smooth'
             });
             
             // Close mobile menu if open
             navMenu.classList.remove('active');
         }
     });
 });