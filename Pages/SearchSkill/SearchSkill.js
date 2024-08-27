document.addEventListener('DOMContentLoaded', function() {

    var firstSelect = document.getElementById('firstSelect');
    var secondSelect = document.getElementById('secondSelect');
    if (firstSelect && secondSelect) {
        firstSelect.addEventListener('change', function() {
            var firstSelectValue = this.value;
            secondSelect.innerHTML = ''; // Clear previous options
            var options = [];
            if (firstSelectValue === 'language') {
                options = [
                    { value: 'english', text: 'אנגלית' },
                    { value: 'spanish', text: 'ספרדית' },
                    { value: 'italian', text: 'איטלקית' },
                    { value: 'french', text: 'צרפתית' },
                    { value: 'russian', text: 'רוסית' },
                    { value: 'arabic', text: 'ערבית' }
                ];
            } else if (firstSelectValue === 'home') {
                options = [
                    { value: 'knitting', text: 'סריגה' },
                    { value: 'sewing', text: 'תפירה' },
                    { value: 'cooking', text: 'בישול' },
                    { value: 'carpentry', text: 'נגרות' }
                ];
            } else if (firstSelectValue === 'games') {
                options = [
                    { value: 'chess', text: 'שחמט' },
                    { value: 'bridge', text: 'ברידג\'' }
                ];
            } else if (firstSelectValue === 'profession') {
                options = [
                    { value: 'psychology', text: 'פסיכולוגיה' },
                    { value: 'medicine', text: 'רפואה' },
                    { value: 'social_work', text: 'עבודה סוציאלית' },
                    { value: 'education', text: 'חינוך' }
                ];
            }
            options.forEach(function(option) {
                var newOption = document.createElement('option');
                newOption.value = option.value;
                newOption.text = option.text;
                secondSelect.appendChild(newOption);
            });
            // Add default option at the beginning
            var defaultOption = document.createElement('option');
            defaultOption.value = '';
            defaultOption.text = 'בחירת נושא';
            defaultOption.disabled = true;
            defaultOption.selected = true;
            secondSelect.insertBefore(defaultOption, secondSelect.firstChild);
        });
    }
});