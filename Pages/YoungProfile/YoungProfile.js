document.addEventListener('DOMContentLoaded', function() {
    var editIcon = document.getElementById("edit-button");
    var editableElements = ["young_name", "young_location", "young_description"];
    var isEditing = false;
  
    // Create save button
    var saveButton = document.createElement("button");
    saveButton.textContent = "שמור";
    saveButton.style.display = "none";
    saveButton.id = "save-button";
    editIcon.parentNode.insertBefore(saveButton, editIcon.nextSibling);
  
    editIcon.addEventListener("click", function() {
      isEditing = !isEditing;
      
      
      editableElements.forEach(function(id) {
        var element = document.getElementById(id);
        element.contentEditable = isEditing;
        
        if (isEditing) {
          element.classList.add("editable");
        } else {
          element.classList.remove("editable");
        }
      });
  
      // Toggle icon and button visibility
      editIcon.classList.toggle("editing");
      saveButton.style.display = isEditing ? "inline" : "none";
    });
  
    saveButton.addEventListener("click", function() {
      isEditing = false;
      
      editableElements.forEach(function(id) {
        var element = document.getElementById(id);
        element.contentEditable = false;
        element.classList.remove("editable");
      });
  
      // Toggle icon and button visibility
      editIcon.classList.remove("editing");
      saveButton.style.display = "none";
    });
  });

  document.getElementById('add_search_button').addEventListener('click', function() {
    window.location.href = '/Pages/SearchSkill/SearchSkill.html'; // Replace with your target HTML file name
});
