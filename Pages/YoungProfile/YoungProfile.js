import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-auth.js";
import { getFirestore, doc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-firestore.js";
import { getStorage, ref, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-storage.js";

document.addEventListener('DOMContentLoaded', function() {
    // Initialize Firebase
    const firebaseConfig = {
        apiKey: "AIzaSyCzNqsSP6qQjFVpv7N_2cxIAFLUOpSs_U8",
        authDomain: "bridgen-988cb.firebaseapp.com",
        projectId: "bridgen-988cb",
        storageBucket: "bridgen-988cb.appspot.com",
        messagingSenderId: "1092821735169",
        appId: "1:1092821735169:web:5ffcb2524743959f8a2d00"
    };

    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const db = getFirestore(app);
    const storage = getStorage(app);

    const editIcon = document.getElementById("edit-button");
    const editableElements = ["young_name", "young_age", "young_location", "young_description"];
    let isEditing = false;
    let currentUserData = null;
    let currentUserId = null;

    const saveButton = document.createElement("button");
    saveButton.textContent = "שמור";
    saveButton.style.display = "none";
    saveButton.id = "save-button";
    editIcon.parentNode.insertBefore(saveButton, editIcon.nextSibling);

    function fetchAndDisplayUserData(userId) {
        console.log("Fetching data for user ID:", userId);
        const docRef = doc(db, "users", userId);
        getDoc(docRef).then((docSnap) => {
            if (docSnap.exists()) {
                const userData = docSnap.data();
                console.log("Fetched user data:", userData);
                
                // Update HTML elements with data from Firebase
                document.getElementById('young_name').textContent = userData.fullName || "No Name";
                const ageElement = document.getElementById('young_age');
                const ageSeparator = document.querySelector('.age-separator');
                
                if (userData.age) {
                    ageElement.textContent = userData.age;
                    ageSeparator.style.display = 'inline'; // Show the comma
                } else {
                    ageElement.textContent = "";
                    ageSeparator.style.display = 'none'; // Hide the comma
                }
                document.getElementById('young_location').textContent = userData.neighborhood || "No Location";
                document.getElementById('young_description').textContent = userData.aboutMe || "No Description";
    
                // Fetch and set profile picture
                const storageRef = ref(storage, `profile_pictures/${userId}`);
                getDownloadURL(storageRef)
                    .then((url) => {
                        document.querySelector('.profile-img').src = url;
                        console.log("Profile picture URL:", url);
                    })
                    .catch((error) => {
                        console.error("Error getting profile picture:", error);
                        // Set a default image if there's an error
                        document.querySelector('.profile-img').src = '/public/icons/default_profile_pic.jpg';
                    });
                    displaySkills(userData.skills_to_learn);
            } else {
                console.log("No such document!");
            }
        }).catch((error) => {
            console.error("Error fetching user data:", error);
        });
    }

    function displaySkills(skills) {
      const buttonContainer = document.querySelector('.button-container');
      buttonContainer.innerHTML = ''; // Clear existing buttons
  
      if (skills && skills.length > 0) {
          skills.forEach(skill => {
              const button = document.createElement('button');
              button.className = 'skill_button';
              button.textContent = skill.subCategory;
              button.setAttribute('data-category', skill.category);
              button.setAttribute('data-description', skill.description);
              button.addEventListener('click', showSkillPopup);
              buttonContainer.appendChild(button);
          });
      } else {
          console.log("No skills found");
      }
  }

  function showSkillPopup(event) {
      const button = event.currentTarget;
      const subCategory = button.textContent;
      const description = button.getAttribute('data-description');
  
      // Create popup element
      const popup = document.createElement('div');
      popup.className = 'skill-popup';
      popup.innerHTML = `
          <div class="popup-content">
              <h3>${subCategory}</h3>
              <p>${description}</p>
              <button class="close-popup">סגור</button>
          </div>
      `;
  
      // Add popup to the body
      document.body.appendChild(popup);
  
      // Add event listener to close button
      popup.querySelector('.close-popup').addEventListener('click', () => {
          document.body.removeChild(popup);
      });
  
      // Close popup when clicking outside
      popup.addEventListener('click', (e) => {
          if (e.target === popup) {
              document.body.removeChild(popup);
          }
      });
  }

    onAuthStateChanged(auth, (user) => {
        if (user) {
            console.log("User is signed in:", user.uid);
            currentUserId = user.uid;
            // currentUserId = 'Qn7eTxuHvZeD5a165jvTvqWwTnp2';
            fetchAndDisplayUserData(currentUserId);
        } else {
            console.log("No user is signed in.");
            window.location.href = '/Pages/GoogleLogin/GoogleLogin.html';
        }
    });

    editIcon.addEventListener("click", function() {
        isEditing = !isEditing;
        
        editableElements.forEach(function(id) {
            const element = document.getElementById(id);
            element.contentEditable = isEditing;
            element.classList.toggle("editable", isEditing);
        });

        editIcon.classList.toggle("editing");
        saveButton.style.display = isEditing ? "inline" : "none";
    });

    saveButton.addEventListener("click", function() {
        isEditing = false;
        
        const updatedData = {
            fullName: document.getElementById('young_name').textContent,
            age: document.getElementById('young_age').textContent || null, // Use null if age is empty
            neighborhood: document.getElementById('young_location').textContent,
            aboutMe: document.getElementById('young_description').textContent
        };
    
        const userRef = doc(db, "users", currentUserId);
        updateDoc(userRef, updatedData).then(() => {
            console.log("Document successfully updated!");
            // Update the display of the age separator
            const ageSeparator = document.querySelector('.age-separator');
            ageSeparator.style.display = updatedData.age ? 'inline' : 'none';
            
        }).catch((error) => {
            console.error("Error updating document: ", error);
        });
    
        editableElements.forEach(function(id) {
            const element = document.getElementById(id);
            element.contentEditable = false;
            element.classList.remove("editable");
        });
    
        editIcon.classList.remove("editing");
        saveButton.style.display = "none";
    });

    // changed this from "add_skill_button" to "add_search_button
    document.getElementById('add_search_button').addEventListener('click', function() {
        // window.location.href = '/Pages/AddSkill/AddSkill.html';  old version
        window.location.href = '/Pages/SearchSkill/SearchSkill2.html';  // new version
    });

    fetchAndDisplayUserData(currentUserId)
});

