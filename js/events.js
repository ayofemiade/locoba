// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navMenu = document.getElementById('navMenu');

mobileMenuBtn.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Event Modal
/*
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
*/
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

// Calendar Navigation and Display
document.addEventListener('DOMContentLoaded', () => {
  const prevMonthBtn = document.getElementById('prevMonth');
  const nextMonthBtn = document.getElementById('nextMonth');
  const calendarTitle = document.querySelector('.calendar-title');
  const calendarGrid = document.querySelector('.calendar-grid');
  const calendarList = document.querySelector('.calendar-list');

  const months = [
    'January', 'February', 'March', 'April', 
    'May', 'June', 'July', 'August',
    'September', 'October', 'November', 'December'
  ];

  // Current date info
  const currentDate = new Date();
  let currentYear = 2025;
  let currentMonthIndex = 6; // july as starting point

  // Special events for the year
  const events = [
    { date: '2025-07-31', title: 'Founders Day', time: 'All Day' },
    { date: '2025-08-15', title: 'Elders Forum and Cocktail', time: '6:00 PM' },
    { date: '2025-08-16', title: 'Annual General Meeting (AGM', time: '10:00 AM' },
  
  ];

  // Function to determine the number of days in a month
  function getDaysInMonth(month, year) {
    // Month is 0-indexed in JavaScript's Date object
    return new Date(year, month + 1, 0).getDate();
  }

  // Function to determine the first day of the month (0 = Sunday, 1 = Monday, etc.)
  function getFirstDayOfMonth(month, year) {
    return new Date(year, month, 1).getDay();
  }

  // Function to render the calendar
  function renderCalendar(month, year) {
    // Update the calendar title
    calendarTitle.textContent = `${months[month]} ${year}`;
    
    // Clear the grid
    calendarGrid.innerHTML = '';
    
    // Add day headers
    const dayHeaders = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    dayHeaders.forEach(day => {
      const dayHeader = document.createElement('div');
      dayHeader.className = 'day-header';
      dayHeader.textContent = day;
      calendarGrid.appendChild(dayHeader);
    });
    
    // Get the number of days in the month and the first day of the month
    const daysInMonth = getDaysInMonth(month, year);
    const firstDay = getFirstDayOfMonth(month, year);
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      const emptyDay = document.createElement('div');
      emptyDay.className = 'calendar-day empty';
      calendarGrid.appendChild(emptyDay);
    }
    
    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dayCell = document.createElement('div');
      dayCell.className = 'calendar-day';
      
      const dayNumber = document.createElement('div');
      dayNumber.className = 'day-number';
      dayNumber.textContent = day;
      dayCell.appendChild(dayNumber);
      
      // Check if there are any events on this day
      const dayStr = day.toString().padStart(2, '0');
      const monthStr = (month + 1).toString().padStart(2, '0');
      const dateStr = `${year}-${monthStr}-${dayStr}`;
      
      const dayEvents = events.filter(event => event.date === dateStr);
      
      if (dayEvents.length > 0) {
        dayCell.classList.add('has-events');
        
        const eventIndicator = document.createElement('div');
        eventIndicator.className = 'event-indicator';
        
        // Add event details
        dayEvents.forEach(event => {
          const eventDiv = document.createElement('div');
          eventDiv.className = 'event-title';
          eventDiv.textContent = event.title;
          eventIndicator.appendChild(eventDiv);
        });
        
        dayCell.appendChild(eventIndicator);
      }
      
      calendarGrid.appendChild(dayCell);
    }
    
    // Render the list view for mobile
    renderListView(month, year);
  }
  
  // Function to render the list view (for mobile)
  function renderListView(month, year) {
    // Clear the list
    calendarList.innerHTML = '';
    
    // Get all events for the current month
    const monthStr = (month + 1).toString().padStart(2, '0');
    const monthEvents = events.filter(event => event.date.startsWith(`${year}-${monthStr}`));
    
    // Sort events by date
    monthEvents.sort((a, b) => new Date(a.date) - new Date(b.date));
    
    // Add each event to the list
    monthEvents.forEach(event => {
      const listItem = document.createElement('div');
      listItem.className = 'calendar-list-item';
      
      const dateObj = new Date(event.date);
      const dayOfMonth = dateObj.getDate();
      
      const listDate = document.createElement('div');
      listDate.className = 'calendar-list-date';
      listDate.textContent = `${months[month].substring(0, 3)} ${dayOfMonth}`;
      
      const listEvents = document.createElement('div');
      listEvents.className = 'calendar-list-events';
      
      const listEvent = document.createElement('div');
      listEvent.className = 'calendar-list-event';
      listEvent.textContent = `${event.title} (${event.time})`;
      
      listEvents.appendChild(listEvent);
      listItem.appendChild(listDate);
      listItem.appendChild(listEvents);
      
      calendarList.appendChild(listItem);
    });
  }

  // Handle month navigation
  prevMonthBtn.addEventListener('click', () => {
    currentMonthIndex--;
    if (currentMonthIndex < 0) {
      currentMonthIndex = 11;
      currentYear--;
    }
    renderCalendar(currentMonthIndex, currentYear);
  });

  nextMonthBtn.addEventListener('click', () => {
    currentMonthIndex++;
    if (currentMonthIndex > 11) {
      currentMonthIndex = 0;
      currentYear++;
    }
    renderCalendar(currentMonthIndex, currentYear);
  });

  // Initial render
  renderCalendar(currentMonthIndex, currentYear);
});