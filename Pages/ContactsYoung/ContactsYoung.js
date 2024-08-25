import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-firestore.js";
import { getStorage, ref, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-storage.js";

document.addEventListener('DOMContentLoaded', () => {
    const auth = getAuth();
    const db = getFirestore();
    const storage = getStorage();
    const profilesContainer = document.querySelector('.contacts-profile-cards');

    profilesContainer.innerHTML = ''; // Clear any static content

    onAuthStateChanged(auth, (user) => {
        if (user) {
            const userRef = doc(db, "users", user.uid);
            getDoc(userRef).then((docSnap) => {
                if (docSnap.exists()) {
                    const userData = docSnap.data();
                    const contactsIds = [
                        ...(Array.isArray(userData.FriendRequests) ? userData.FriendRequests : []),
                        ...(Array.isArray(userData.Friends) ? userData.Friends : [])
                    ];
                    contactsIds.forEach(contactId => {
                        const contactRef = doc(db, "users", contactId);
                        getDoc(contactRef).then(contactSnap => {
                            if (contactSnap.exists()) {
                                const contactData = contactSnap.data();
                                contactData.uid = contactSnap.id; // Ensure UID is set correctly
                                createProfileCard(contactData, profilesContainer);
                            }
                        });
                    });
                }
            });
        }
    });

    function createProfileCard(userData, container) {
        const card = document.createElement('a');
        card.className = 'contacts-profile-card';
        card.href = `https://bridgen.vercel.app/Pages/ElderCard/ElderCard.html?uid=${userData.uid}`; // Correct link

        const img = document.createElement('img');
        img.className = 'contacts-profile-img';
        img.alt = 'Profile Image';

        if (userData.uid) {
            // Fetch and set profile picture
            const storageRef = ref(storage, `profile_pictures/${userData.uid}`);
            getDownloadURL(storageRef)
                .then((url) => {
                    img.src = url;
                })
                .catch((error) => {
                    console.error("Error getting profile picture:", error);
                    img.src = '/public/icons/default_profile_pic.jpg'; // Default image if error
                });
        } else {
            img.src = '/public/icons/default_profile_pic.jpg'; // Default image if UID is undefined
            console.error("UID is undefined, cannot fetch profile picture");
        }

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
