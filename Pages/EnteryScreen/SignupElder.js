document.getElementById('continue_register').addEventListener('click', function(event) {
    event.preventDefault(); // מניעת ברירת המחדל של שליחת הטופס
    window.location.href = '/Pages/AddSkill/AddSkill.html'; // ניתוב לעמוד אחר
});