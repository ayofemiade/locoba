   // Mobile Menu Toggle
   const mobileMenuBtn = document.getElementById('mobileMenuBtn');
   const navMenu = document.getElementById('navMenu');
   
   mobileMenuBtn.addEventListener('click', () => {
       navMenu.classList.toggle('active');
   });
   
   // Events Slider
   const eventsTrack = document.getElementById('eventsTrack');
   const prevBtn = document.getElementById('prevBtn');
   const nextBtn = document.getElementById('nextBtn');
   
   let slideIndex = 0;
   const eventCards = document.querySelectorAll('.event-card');
   const cardWidth = eventCards[0].offsetWidth + 32; // Including margins
   const maxIndex = eventCards.length - getVisibleCards();
   
   function getVisibleCards() {
       if (window.innerWidth < 768) return 1;
       if (window.innerWidth < 992) return 2;
       return 3;
   }
   
   function updateSlider() {
       eventsTrack.style.transform = `translateX(-${slideIndex * cardWidth}px)`;
   }
   
   function checkButtons() {
       prevBtn.disabled = slideIndex <= 0;
       prevBtn.style.opacity = prevBtn.disabled ? '0.5' : '1';
       
       nextBtn.disabled = slideIndex >= maxIndex;
       nextBtn.style.opacity = nextBtn.disabled ? '0.5' : '1';
   }
   
   prevBtn.addEventListener('click', () => {
       if (slideIndex > 0) {
           slideIndex--;
           updateSlider();
           checkButtons();
       }
   });
   
   nextBtn.addEventListener('click', () => {
       if (slideIndex < maxIndex) {
           slideIndex++;
           updateSlider();
           checkButtons();
       }
   });
   
   // Initialize
   checkButtons();
   
   // Handle window resize
   window.addEventListener('resize', () => {
       const newMaxIndex = eventCards.length - getVisibleCards();
       slideIndex = Math.min(slideIndex, newMaxIndex);
       updateSlider();
       checkButtons();
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