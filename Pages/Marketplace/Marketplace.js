document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded and parsed'); // Debugging statement

    const filters = document.querySelectorAll('.filter-button');
    const cards = document.querySelectorAll('.profile-card');
    const searchBar = document.querySelector('.search-bar');

    filters.forEach(filter => {
        filter.addEventListener('click', () => {
            console.log('Filter button clicked:', filter.textContent); // Debugging statement

            const filterValue = filter.getAttribute('data-filter');
            console.log('Filter value:', filterValue); // Debugging statement

            filters.forEach(f => f.classList.remove('active'));
            filter.classList.add('active');

            filterCards(filterValue, searchBar.value);
        });
    });

    searchBar.addEventListener('input', () => {
        const activeFilter = document.querySelector('.filter-button.active').getAttribute('data-filter');
        filterCards(activeFilter, searchBar.value);
    });

    function filterCards(filterValue, searchValue) {
        cards.forEach(card => {
            const cardCategory = card.getAttribute('data-category');
            const cardText = card.textContent.toLowerCase();
            const matchesFilter = filterValue === 'all' || cardCategory === filterValue;
            const matchesSearch = cardText.includes(searchValue.toLowerCase());

            if (matchesFilter && matchesSearch) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }
});
