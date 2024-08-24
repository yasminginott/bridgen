import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-firestore.js";

document.addEventListener('DOMContentLoaded', () => {
    const auth = getAuth();
    const db = getFirestore();
    const profilesContainer = document.querySelector('.contacts-profile-cards');

    profilesContainer.innerHTML = ''; // Clear any static content

    onAuthStateChanged(auth, (user) => {
        if (user) {
            console.log("Logged-in user:", user.uid); // Log the logged-in user's ID
            const userRef = doc(db, "users", user.uid);
            getDoc(userRef).then((docSnap) => {
                if (docSnap.exists()) {
                    const userData = docSnap.data();
                    console.log(`User Data for ${user.uid}:`, userData); // Log user data

                    // Combine FriendRequests and Friends arrays safely
                    const contactsIds = [
                        ...(Array.isArray(userData.FriendRequests) ? userData.FriendRequests : []),
                        ...(Array.isArray(userData.Friends) ? userData.Friends : [])
                    ];

                    // Remove duplicates if any
                    const uniqueContactsIds = Array.from(new Set(contactsIds));

                    // Fetch and display each contact's profile card
                    uniqueContactsIds.forEach(contactId => {
                        const contactRef = doc(db, "users", contactId);
                        getDoc(contactRef).then(contactSnap => {
                            if (contactSnap.exists()) {
                                createProfileCard(contactSnap.data(), profilesContainer);
                            } else {
                                console.log(`No data found for contact ID: ${contactId}`);
                            }
                        }).catch(error => {
                            console.error(`Error fetching contact data for ID ${contactId}:`, error);
                        });
                    });
                } else {
                    console.log("No user data available.");
                }
            }).catch(error => {
                console.error("Error fetching user data:", error);
            });
        } else {
            console.log("No user is signed in.");
            // Optionally handle unauthenticated state
        }
    });

    function createProfileCard(userData, container) {
        const card = document.createElement('div');
        card.className = 'contacts-profile-card';

        const img = document.createElement('img');
        img.className = 'contacts-profile-img';
        img.src = userData.profilePicture || '/public/icons/default_profile_pic.jpg';
        img.alt = 'Profile Image';

        const name = document.createElement('h2');
        name.textContent = userData.fullName;

        const location = document.createElement('p');
        location.textContent = userData.neighborhood;

        card.appendChild(img);
        card.appendChild(name);
        card.appendChild(location);

        container.appendChild(card);
    }
});
