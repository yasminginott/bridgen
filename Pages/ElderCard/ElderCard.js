document.addEventListener('DOMContentLoaded', function() {
    // קריאה לערך מ-localStorage
    var savedSkill = localStorage.getItem('selectedSkill');
    
    if (savedSkill) {
        // השתמשי בערך שנשמר להמשך העבודה שלך בעמוד השני
        console.log('Selected skill from previous page:', savedSkill);
        
        // ניקוי ערך ה-localStorage לאחר שהשתמשת בו
        localStorage.removeItem('selectedSkill');
    }
});