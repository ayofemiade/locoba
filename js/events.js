// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navMenu = document.getElementById('navMenu');

mobileMenuBtn.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Event Modal
const eventModal = document.getElementById('eventModal');
const closeModal = document.getElementById('closeModal');
const rsvpButtons = document.querySelectorAll('[data-event]');

// Open modal on RSVP button click
rsvpButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Get event details (in a real app, this would come from a database)
        const eventId = button.getAttribute('data-event');
        const eventCard = button.closest('.event-card');
        
        // Update modal content
        document.querySelector('.modal-title').textContent = eventCard.querySelector('.event-title').textContent;
        document.querySelector('.modal-subtitle').textContent = eventCard.querySelector('.event-category').textContent;
        document.getElementById('modalDate').textContent = eventCard.querySelector('.event-date').textContent;
        document.getElementById('modalTime').textContent = eventCard.querySelector('.event-time').textContent.replace('Time: ', '');
        document.getElementById('modalLocation').textContent = eventCard.querySelector('.event-location').textContent.replace('Location: ', '');
        document.getElementById('modalDescription').textContent = eventCard.querySelector('.event-description').textContent;
        
        // Show modal
        eventModal.classList.add('active');
    });
});

// Close modal
closeModal.addEventListener('click', () => {
    eventModal.classList.remove('active');
});

// Close modal if clicked outside
window.addEventListener('click', (e) => {
    if (e.target === eventModal) {
        eventModal.classList.remove('active');
    }
});

// Gallery Filter
const galleryFilterButtons = document.querySelectorAll('.gallery-filter button');
const galleryItems = document.querySelectorAll('.gallery-item');

galleryFilterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Update active button
        galleryFilterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        // Filter gallery items
        const filter = button.getAttribute('data-filter');
        
        galleryItems.forEach(item => {
            if (filter === 'all' || item.getAttribute('data-category') === filter) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// Initialize Simple Lightbox for gallery
new SimpleLightbox('.gallery-item', {
    captionsData: 'title',
    captionDelay: 250
});

// Event Filter Form
const eventFilterForm = document.getElementById('eventFilterForm');
const eventCards = document.querySelectorAll('.event-card');

eventFilterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const searchTerm = eventFilterForm.querySelector('input[type="text"]').value.toLowerCase();
    const eventType = document.getElementById('eventTypeFilter').value;
    const eventLocation = document.getElementById('eventLocationFilter').value;
    const eventDate = document.getElementById('eventDateFilter').value;
    
    eventCards.forEach(card => {
        let visible = true;
        
        // Filter by search term
        if (searchTerm) {
            const eventTitle = card.querySelector('.event-title').textContent.toLowerCase();
            if (!eventTitle.includes(searchTerm)) {
                visible = false;
            }
        }
        
        // Filter by event type
        if (eventType && card.getAttribute('data-type') !== eventType) {
            visible = false;
        }
        
        // Filter by location
        if (eventLocation && card.getAttribute('data-location') !== eventLocation) {
            visible = false;
        }
        
        // Filter by date (simplified - in a real app, would need proper date comparison)
        if (eventDate) {
            // This is a simplified check - would need actual date parsing in a real app
            const cardDate = card.querySelector('.event-date').textContent;
            if (!cardDate.includes(eventDate)) {
                visible = false;
            }
        }
        
        card.style.display = visible ? 'block' : 'none';
    });
});

// Load More Gallery Items (simulated)
const loadMoreBtn = document.getElementById('loadMoreGallery');
let galleryLoaded = false;

loadMoreBtn.addEventListener('click', () => {
    if (!galleryLoaded) {
        // In a real app, this would load more items from server
        // For demo, we'll just show a message
        loadMoreBtn.textContent = 'No More Items';
        loadMoreBtn.disabled = true;
        galleryLoaded = true;
    }
});

// Calendar Navigation (simplified)
const prevMonthBtn = document.getElementById('prevMonth');
const nextMonthBtn = document.getElementById('nextMonth');
const calendarTitle = document.querySelector('.calendar-title');

const months = [
    'January', 'February', 'March', 'April', 
    'May', 'June', 'July', 'August',
    'September', 'October', 'November', 'December'
];

let currentMonthIndex = 3; // April

prevMonthBtn.addEventListener('click', () => {
    currentMonthIndex = (currentMonthIndex - 1 + 12) % 12;
    calendarTitle.textContent = `${months[currentMonthIndex]} 2025`;
});

nextMonthBtn.addEventListener('click', () => {
    currentMonthIndex = (currentMonthIndex + 1) % 12;
    calendarTitle.textContent = `${months[currentMonthIndex]} 2025`;
});