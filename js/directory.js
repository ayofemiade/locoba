        // Mobile Menu Toggle
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const navMenu = document.getElementById('navMenu');
        
        mobileMenuBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
        
        // Search functionality
        const searchForm = document.querySelector('.search-form');
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // In a real application, this would send the search criteria to the server
            // For demo purposes, we'll just show an alert
            alert('Search functionality would be implemented here with backend processing.');
        });
        
        // Smooth Scrolling for Anchor Links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    e.preventDefault();
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu if open
                    navMenu.classList.remove('active');
                }
            });
        });
        
        // Pagination functionality (for demo)
        document.querySelectorAll('.pagination-item').forEach(item => {
            item.addEventListener('click', function(e) {
                e.preventDefault();
                document.querySelectorAll('.pagination-item').forEach(el => {
                    el.classList.remove('active');
                });
                this.classList.add('active');
                
                // In a real application, this would load the corresponding page of results
                window.scrollTo({
                    top: document.querySelector('.directory-results').offsetTop - 80,
                    behavior: 'smooth'
                });
            });
        });