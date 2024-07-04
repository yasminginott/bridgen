document.addEventListener('DOMContentLoaded', () => {
    const filters = document.querySelectorAll('.filter');
    filters.forEach(filter => {
        filter.addEventListener('click', () => {
            filters.forEach(f => f.classList.remove('active'));
            filter.classList.add('active');
            // Add filter logic here
        });
    });
});
