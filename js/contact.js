 // Mobile Menu Toggle
 const mobileMenuBtn = document.getElementById('mobileMenuBtn');
 const navMenu = document.getElementById('navMenu');
 
 mobileMenuBtn.addEventListener('click', () => {
     navMenu.classList.toggle('active');
 });
 
 // Form Submission Handler
 const contactForm = document.getElementById('contactForm');
 
 contactForm.addEventListener('submit', (e) => {
     e.preventDefault();
     
     // Form validation and submission logic would go here
     // This is a placeholder for demonstration purposes
     
     // Get form values
     const name = document.getElementById('name').value;
     const email = document.getElementById('email').value;
     const message = document.getElementById('message').value;
     
     // Simple validation
     if (name && email && message) {
         // Form submission logic would go here
         alert('Thank you for your message! We will get back to you soon.');
         contactForm.reset();
     } else {
         alert('Please fill in all required fields.');
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