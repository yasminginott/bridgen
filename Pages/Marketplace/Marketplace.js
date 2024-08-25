import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-firestore.js";
import { getStorage, ref, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-storage.js";

document.addEventListener('DOMContentLoaded', async () => {
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
    const db = getFirestore(app);
    const storage = getStorage(app);
    
    const profilesContainer = document.querySelector('.profile-cards');
    const filters = document.querySelectorAll('.filter-button');
    const searchBar = document.querySelector('.search-bar');

    // Fetch all documents from the 'users' collection
    profilesContainer.innerHTML = ''; // Clear any static content before fetching
    const querySnapshot = await getDocs(collection(db, "users"));
    querySnapshot.forEach(doc => {
        const userData = doc.data();
        userData.uid = doc.id; // Set UID from document ID
        if (userData.experienced === "true") {
            createProfileCard(userData, profilesContainer, storage);
        }
    });

    function updateDisplay() {
        const activeFilter = document.querySelector('.filter-button.active').getAttribute('data-filter').trim().toLowerCase();
        const searchQuery = searchBar.value.trim().toLowerCase();
        const cards = document.querySelectorAll('.profile-card');

        cards.forEach(card => {
            let isVisible = true; // Start with visible

            if (activeFilter !== 'all') {
                const cardText = card.textContent.toLowerCase();
                isVisible = cardText.includes({
                    'ספרדית': 'ספרדית',
                    'סריגה': 'סריגה',
                    'ברידג\'': 'ברידג\'',
                    'אנגלית': 'אנגלית'
                }[activeFilter]);
            }

            if (searchQuery) {
                isVisible = isVisible && card.textContent.toLowerCase().includes(searchQuery);
            }

            card.style.display = isVisible ? '' : 'none';
        });
    }

    filters.forEach(filter => {
        filter.addEventListener('click', function() {
            filters.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            updateDisplay();
        });
    });

    searchBar.addEventListener('input', updateDisplay);

    function createProfileCard(userData, container, storage) {
        const link = document.createElement('a');
        link.href = `https://bridgen.vercel.app/Pages/ElderCard/ElderCard.html?uid=${userData.uid}`;
        link.className = 'profile-link';
        link.setAttribute('target', '_blank');

        const card = document.createElement('div');
        card.className = 'profile-card';

        const img = document.createElement('img');
        img.className = 'profile-img';
        img.alt = 'Profile Image';

        const storageRef = ref(storage, `profile_pictures/${userData.uid}`);
        getDownloadURL(storageRef)
            .then((url) => {
                img.src = url;
            })
            .catch((error) => {
                console.error("Error getting profile picture:", error);
                img.src = '/public/icons/default_profile_pic.jpg'; // Default image if error
            });

        const skillsContent = userData.skills?.map(skill => {
            return `<span class="skill" data-category="${skill.category}">${skill.subCategory}</span>`;
        }).join(', ') || 'No skills listed.';

        card.innerHTML = `
            <h2>${userData.fullName}, ${userData.age}</h2>
            <p>${userData.neighborhood}</p>
            <p><strong>יכול/ה ללמד אתכם:</strong></p>
            <p class="skills-list">${skillsContent}</p>
        `;
        card.prepend(img);
        link.appendChild(card);
        container.appendChild(link);
    }
});
