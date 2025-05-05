 // Mobile Menu Toggle
 const mobileMenuBtn = document.getElementById('mobileMenuBtn');
 const navMenu = document.getElementById('navMenu');
 
 mobileMenuBtn.addEventListener('click', () => {
     navMenu.classList.toggle('active');
 });
 
 // Form Validation
 const form = document.getElementById('membershipForm');
 
 form.addEventListener('submit', function(e) {
     e.preventDefault();
     
     let isValid = true;
     const requiredFields = form.querySelectorAll('[required]');
     
     requiredFields.forEach(field => {
         const formGroup = field.closest('.form-group');
         
         if (!field.value.trim()) {
             formGroup.classList.add('error');
             isValid = false;
         } else {
             formGroup.classList.remove('error');
             
             // Additional validation for email
             if (field.type === 'email') {
                 const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                 if (!emailPattern.test(field.value)) {
                     formGroup.classList.add('error');
                     isValid = false;
                 }
             }
             
             // Additional validation for phone
             if (field.id === 'phone') {
                 const phonePattern = /^[\d\s\-\(\)\+]{10,15}$/;
                 if (!phonePattern.test(field.value)) {
                     formGroup.classList.add('error');
                     isValid = false;
                 }
             }
         }
     });
     
     if (isValid) {
         alert('Your application has been submitted successfully! We will contact you shortly.');
         form.reset();
     }
 });
 
 // Remove error class on input focus
 form.querySelectorAll('input, select, textarea').forEach(element => {
     element.addEventListener('focus', function() {
         const formGroup = this.closest('.form-group');
         formGroup.classList.remove('error');
     });
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