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
                    ].filter(id => id !== user.uid); // Exclude the user's own profile

                    contactsIds.forEach(contactId => {
                        const contactRef = doc(db, "users", contactId);
                        getDoc(contactRef).then(contactSnap => {
                            if (contactSnap.exists()) {
                                const contactData = contactSnap.data();
                                contactData.uid = contactSnap.id; // Ensure UID is set correctly
                                createProfileCard(contactData, userData, profilesContainer);
                            }
                        });
                    });
                }
            });
        }
    });

    function createProfileCard(contactData, userData, container) {
        const card = document.createElement('a');
        card.className = 'contacts-profile-card no-underline';
        card.href = `https://bridgen.vercel.app/Pages/ElderCard/ElderCard.html?uid=${contactData.uid}`; // Correct link

        const img = document.createElement('img');
        img.className = 'contacts-profile-img';
        img.alt = 'Profile Image';

        if (contactData.uid) {
            const storageRef = ref(storage, `profile_pictures/${contactData.uid}`);
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
        name.textContent = contactData.fullName;

        const location = document.createElement('p');
        location.textContent = contactData.neighborhood;

        const status = document.createElement('p');
        if (userData.Friends.includes(contactData.uid)) {
            status.textContent = 'חבר';
        } else if (userData.FriendRequests.includes(contactData.uid)) {
            status.textContent = 'ממתין לאישור';
        }
        status.className = 'contacts-profile-status';

        card.appendChild(img);
        card.appendChild(name);
        card.appendChild(location);
        card.appendChild(status);

        container.appendChild(card);
    }
});
