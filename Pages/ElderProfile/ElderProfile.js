import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-auth.js";
import { getFirestore, doc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-firestore.js";
import { getStorage, ref, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-storage.js";

document.addEventListener('DOMContentLoaded', function() {
    const auth = getAuth();
    const db = getFirestore();
    const storage = getStorage();

    const editIcon = document.getElementById("edit-button");
    const editableElements = ["elder_name", "elder_location", "elder_description"];
    let isEditing = false;
    let currentUserData = null;
    let currentUserId = null;

    // Create save button
    const saveButton = document.createElement("button");
    saveButton.textContent = "שמור";
    saveButton.style.display = "none";
    saveButton.id = "save-button";
    editIcon.parentNode.insertBefore(saveButton, editIcon.nextSibling);

    // Fetch and display user data
    function fetchAndDisplayUserData(userId) {
        const docRef = doc(db, "users", userId);
        getDoc(docRef).then((docSnap) => {
            if (docSnap.exists()) {
                currentUserData = docSnap.data();
                document.getElementById('elder_name').textContent = currentUserData.fullName;
                document.getElementById('elder_location').textContent = currentUserData.neighborhood;
                document.getElementById('elder_description').textContent = currentUserData.aboutMe;

                if (currentUserData.profilePicture) {
                    const imageRef = ref(storage, `profile_pictures/${userId}`);
                    getDownloadURL(imageRef).then((url) => {
                        document.querySelector('.profile-img').src = url;
                    }).catch((error) => {
                        console.error("Error getting profile picture:", error);
                    });
                }
            } else {
                console.log("No such document!");
            }
        }).catch((error) => {
            console.error("Error fetching user data:", error);
        });
    }

    // Check authentication state
    onAuthStateChanged(auth, (user) => {
        if (user) {
            currentUserId = user.uid;
            fetchAndDisplayUserData(currentUserId);
        } else {
            console.log("No user is signed in.");
            // Redirect to login page or handle as needed
            window.location.href = '/Pages/GoogleLogin/GoogleLogin.html';
        }
    });

    editIcon.addEventListener("click", function() {
        isEditing = !isEditing;
        
        editableElements.forEach(function(id) {
            const element = document.getElementById(id);
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
        
        const updatedData = {
            fullName: document.getElementById('elder_name').textContent,
            neighborhood: document.getElementById('elder_location').textContent,
            aboutMe: document.getElementById('elder_description').textContent
        };

        const userRef = doc(db, "users", currentUserId);
        updateDoc(userRef, updatedData).then(() => {
            console.log("Document successfully updated!");
        }).catch((error) => {
            console.error("Error updating document: ", error);
        });

        editableElements.forEach(function(id) {
            const element = document.getElementById(id);
            element.contentEditable = false;
            element.classList.remove("editable");
        });

        // Toggle icon and button visibility
        editIcon.classList.remove("editing");
        saveButton.style.display = "none";
    });

    document.getElementById('add_skill_button').addEventListener('click', function() {
        window.location.href = '/Pages/AddSkill/AddSkill.html';
    });
});


//גרסה קודמת
// document.addEventListener('DOMContentLoaded', function() {
//     var editIcon = document.getElementById("edit-button");
//     var editableElements = ["elder_name", "elder_location", "elder_description"];
//     var isEditing = false;
  
//     // Create save button
//     var saveButton = document.createElement("button");
//     saveButton.textContent = "שמור";
//     saveButton.style.display = "none";
//     saveButton.id = "save-button";
//     editIcon.parentNode.insertBefore(saveButton, editIcon.nextSibling);
  
//     editIcon.addEventListener("click", function() {
//       isEditing = !isEditing;
      
      
//       editableElements.forEach(function(id) {
//         var element = document.getElementById(id);
//         element.contentEditable = isEditing;
        
//         if (isEditing) {
//           element.classList.add("editable");
//         } else {
//           element.classList.remove("editable");
//         }
//       });
  
//       // Toggle icon and button visibility
//       editIcon.classList.toggle("editing");
//       saveButton.style.display = isEditing ? "inline" : "none";
//     });
  
//     saveButton.addEventListener("click", function() {
//       isEditing = false;
      
//       editableElements.forEach(function(id) {
//         var element = document.getElementById(id);
//         element.contentEditable = false;
//         element.classList.remove("editable");
//       });
  
//       // Toggle icon and button visibility
//       editIcon.classList.remove("editing");
//       saveButton.style.display = "none";
//     });
//   });

//   document.getElementById('add_skill_button').addEventListener('click', function() {
//     window.location.href = '/Pages/AddSkill/AddSkill.html'; // Replace with your target HTML file name
// });
