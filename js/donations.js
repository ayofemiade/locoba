  // Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const navMenu = document.getElementById('navMenu');
  
  mobileMenuBtn.addEventListener('click', () => {
      navMenu.classList.toggle('active');
  });
  
  // Handle Other Amount Selection
  const amountRadios = document.querySelectorAll('input[name="amount"]');
  const otherAmountGroup = document.getElementById('otherAmountGroup');
  
  amountRadios.forEach(radio => {
      radio.addEventListener('change', function() {
          if (this.value === 'other') {
              otherAmountGroup.style.display = 'block';
          } else {
              otherAmountGroup.style.display = 'none';
          }
      });
  });
  
  // Set donation amount when clicking on tier buttons
  function setAmount(amount) {
      // Clear all radio selections
      amountRadios.forEach(radio => {
          radio.checked = false;
      });
      
      // Set the correct radio
      switch(amount) {
          case 50:
              document.getElementById('amount50').checked = true;
              break;
          case 100:
              document.getElementById('amount100').checked = true;
              break;
          case 500:
              document.getElementById('amount500').checked = true;
              break;
          default:
              document.getElementById('amountOther').checked = true;
              document.getElementById('otherAmount').value = amount;
              otherAmountGroup.style.display = 'block';
      }
      
      // Smooth scroll to the form
      document.querySelector('#donate-form').scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
      });
  }
  
  // Form submission handling
  const donationForm = document.getElementById('donationForm');
  
  donationForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Basic form validation would go here
      
      // Display a success message (in a real implementation, you would integrate with Stripe or Paystack API)
      alert('Thank you for your generous donation to Loyola Old Boys Association!');
      
      // Reset the form
      donationForm.reset();
      otherAmountGroup.style.display = 'none';
  });
  
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
          if (this.getAttribute('href').startsWith('#') && this.getAttribute('href') !== '#') {
              e.preventDefault();
              
              const targetId = this.getAttribute('href');
              const targetElement = document.querySelector(targetId);
              
              if (targetElement) {
                  window.scrollTo({
                      top: targetElement.offsetTop - 80,
                      behavior: 'smooth'
                  });
                  
                  // Close mobile menu if open
                  navMenu.classList.remove('active');
              }
          }
      });
  });