document.addEventListener('DOMContentLoaded', function() {
    var editIcon = document.getElementById("edit-button");
    var editableElements = ["elder_name", "elder_location", "elder_description"];
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

  document.getElementById('add_skill_button').addEventListener('click', function() {
    window.location.href = '/Pages/AddSkill/AddSkill.html'; // Replace with your target HTML file name
});

// To retrieve user data later (e.g., for profile page):

// import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-database.js";

// const database = getDatabase();
// const user = auth.currentUser;

// if (user) {
//     const userRef = ref(database, 'users/' + user.uid);
//     get(userRef).then((snapshot) => {
//         if (snapshot.exists()) {
//             const userData = snapshot.val();
//             // Use userData to populate profile page
//         } else {
//             console.log("No data available");
//         }
//     }).catch((error) => {
//         console.error(error);
//     });
// }