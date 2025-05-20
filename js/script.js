   // Mobile Menu Toggle
   const mobileMenuBtn = document.getElementById('mobileMenuBtn');
   const navMenu = document.getElementById('navMenu');
   
   
   mobileMenuBtn.addEventListener('click', () => {
       navMenu.classList.toggle('active');
   });
   
   // Enhanced events slider JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const eventsTrack = document.getElementById('eventsTrack');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    if (!eventsTrack || !prevBtn || !nextBtn) {
        console.error('Slider elements not found');
        return;
    }
    
    let slideIndex = 0;
    const eventCards = document.querySelectorAll('.event-card');
    
    if (eventCards.length === 0) {
        console.error('No event cards found');
        return;
    }
    
    // Function to calculate card width including margins
    function getCardWidth() {
        const card = eventCards[0];
        const style = window.getComputedStyle(card);
        const width = card.offsetWidth;
        const marginLeft = parseInt(style.marginLeft) || 0;
        const marginRight = parseInt(style.marginRight) || 0;
        return width + marginLeft + marginRight;
    }
    
    // Function to determine visible cards based on screen width
    function getVisibleCards() {
        if (window.innerWidth < 768) return 1;
        if (window.innerWidth < 992) return 2;
        return 3;
    }
    
    // Update slider position
    function updateSlider() {
        if (eventsTrack) {
            const cardWidth = getCardWidth();
            eventsTrack.style.transform = `translateX(-${slideIndex * cardWidth}px)`;
        }
    }
    
    // Check and update button states
    function checkButtons() {
        const maxIndex = Math.max(0, eventCards.length - getVisibleCards());
        
        if (prevBtn) {
            prevBtn.disabled = slideIndex <= 0;
            prevBtn.style.opacity = prevBtn.disabled ? '0.5' : '1';
        }
        
        if (nextBtn) {
            nextBtn.disabled = slideIndex >= maxIndex;
            nextBtn.style.opacity = nextBtn.disabled ? '0.5' : '1';
        }
    }
    
    // Event listeners for buttons
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            if (slideIndex > 0) {
                slideIndex--;
                updateSlider();
                checkButtons();
            }
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            const maxIndex = eventCards.length - getVisibleCards();
            if (slideIndex < maxIndex) {
                slideIndex++;
                updateSlider();
                checkButtons();
            }
        });
    }
    
    // Handle window resize
    window.addEventListener('resize', () => {
        // Add debounce to avoid excessive calculations during resize
        clearTimeout(window.resizeTimer);
        window.resizeTimer = setTimeout(() => {
            const maxIndex = Math.max(0, eventCards.length - getVisibleCards());
            slideIndex = Math.min(slideIndex, maxIndex);
            updateSlider();
            checkButtons();
        }, 250);
    });
    
    // Initialize slider
    checkButtons();
    
    // Add touch swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    eventsTrack.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    eventsTrack.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });
    
    function handleSwipe() {
        const swipeThreshold = 50; // Minimum swipe distance in pixels
        
        if (touchEndX < touchStartX - swipeThreshold) {
            // Swipe left -> next slide
            if (slideIndex < eventCards.length - getVisibleCards()) {
                slideIndex++;
                updateSlider();
                checkButtons();
            }
        } else if (touchEndX > touchStartX + swipeThreshold) {
            // Swipe right -> previous slide
            if (slideIndex > 0) {
                slideIndex--;
                updateSlider();
                checkButtons();
            }
        }
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


   // Alumni Modal/Lightbox Functionality
const modal = document.getElementById('alumniModal');
const modalImage = document.getElementById('modalImage');
const modalName = document.getElementById('modalName');
const modalClass = document.getElementById('modalClass');
const modalBio = document.getElementById('modalBio');
const closeModal = document.querySelector('.close-modal');

// Alumni data - in a real application you would fetch this from a database
// This is just a simple example with the alumni shown in the screenshot
const alumniData = [
  {
    id: "lamidi-adesina",
    name: "Lamidi Ona-Olapo Adesina",
    class: "Class of 1959",
    imageSrc: "image/lam.jpeg",
    bio: "A respected educator and former Governor of Oyo State. He championed education, democracy, and leadership throughout his career. His legacy continues to inspire generations of Loyolans. Born on January 20, 1939, he served as the Governor of Oyo State from 1999 to 2003. He was known for his commitment to public education and infrastructure development. Prior to his political career, he was a dedicated teacher and school principal. He passed away on November 11, 2012, leaving behind a legacy of service and integrity."
  },
  {
    id: "oluwarotimi-akeredolu",
    name: "Oluwarotimi Odunayo Akeredolu",
    class: "Class of 1972",
    imageSrc: "image/rotimi.jpeg",
    bio: "A distinguished lawyer, Senior Advocate of Nigeria, and Governor of Ondo State. He championed justice, regional development, and good governance throughout his career. Before becoming governor, he served as the President of the Nigerian Bar Association from 2008 to 2010. Known for his advocacy for constitutional democracy and the rule of law, he has implemented numerous development projects in Ondo State focused on infrastructure, healthcare, and education."
  },
  {
    id: "adeyeye-ogunwusi",
    name: "Adeyeye Enitan Ogunwusi",
    class: "Class of 1991",
    imageSrc: "image/ooni.jpeg",
    bio: "Is the 51st Ooni of Ife, a revered monarch and advocate for youth, culture, and development. A former accountant and entrepreneur, he leads initiatives in education, empowerment, and heritage preservation. Since his coronation, he has been instrumental in promoting Yoruba culture globally while establishing various foundations focusing on youth empowerment, women's development, and entrepreneurship. His innovative approach to traditional leadership has bridged the gap between ancient traditions and modern governance."
  },
  {
    id: "hayford-alile",
    name: "Apostle(Dr.) Hayford Alile",
    class: "Class of 1959",
    imageSrc: "image/hay.jpeg",
    bio: "Was a pioneer of Nigeria's capital markets and a spiritual leader. He served as Director-General of the Nigerian Stock Exchange and global leader of the Saint Joseph Chosen Church of God. During his tenure at the Nigerian Stock Exchange, he modernized Nigeria's capital markets and implemented significant reforms that attracted both domestic and international investors. His combined expertise in finance and spiritual leadership made him a unique and respected figure in Nigerian society. His contributions to Nigeria's economic development and spiritual guidance continue to influence many."
  },
  {
    id: "tonnie-iredia",
    name: "Tonnie Iredia",
    class: "Class of 1968",
    imageSrc: "image/tonn.jpeg",
    bio: "A celebrated media leader and former Director-General of the Nigerian Television Authority (NTA). He pioneered major transformations in Nigerian broadcasting and championed media excellence and policy development. As a respected media scholar, he has authored numerous publications on media ethics, broadcasting policy, and journalism in Nigeria. His leadership at NTA marked a period of significant growth and modernization of Nigeria's public broadcasting. He continues to be an influential voice in media development and policy formulation in Nigeria and across Africa."
  },
  {
    id: "pat-utomi",
    name: "Pat Utomi",
    class: "Class of 1971",
    imageSrc: "image/patrick.png",
    bio: "Is a renowned economist, academic, entrepreneur, and leadership advocate. He founded the Centre for Values in Leadership (CVL) and has advised Nigerian governments on economic development. His journey reflects Loyola's tradition of excellence. Professor Utomi has been a key figure in Nigeria's economic discourse for decades, publishing extensively on political economy, business strategy, and corporate governance. His Centre for Values in Leadership has trained thousands of young Nigerians in leadership and entrepreneurship. He has held positions in both the private sector and academia, bringing practical experience to his theoretical work. His commitment to national development and ethical leadership continues to inspire many across Nigeria."
  }
];

// Find all "View Profile" buttons
document.querySelectorAll('.btn-secondary, .btn').forEach(button => {
  if (button.textContent.trim() === 'View Profile') {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Find which alumni card this button belongs to
      const card = this.closest('.alumni-card');
      if (!card) return;
      
      // Get the alumni name from the card
      const nameElement = card.querySelector('.alumni-name');
      if (!nameElement) return;
      
      const alumniName = nameElement.textContent.trim();
      
      // Find the matching alumni data
      const alumni = alumniData.find(a => a.name === alumniName);
      if (!alumni) return;
      
      // Populate the modal with the alumni data
      modalName.textContent = alumni.name;
      modalClass.textContent = alumni.class;
      modalBio.textContent = alumni.bio;
      modalImage.src = alumni.imageSrc;
      modalImage.alt = alumni.name;
      
      // Show the modal
      modal.style.display = 'block';
      
      // Prevent body scrolling
      document.body.style.overflow = 'hidden';
    });
  }
});

// Close the modal when clicking the close button
closeModal.addEventListener('click', () => {
  modal.style.display = 'none';
  document.body.style.overflow = 'auto'; // Re-enable scrolling
});

// Close the modal when clicking outside the modal content
window.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Re-enable scrolling
  }
});

// Close the modal with ESC key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal.style.display === 'block') {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Re-enable scrolling
  }
});