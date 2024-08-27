<script type="module">
    import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
    import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-auth.js";
    import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-firestore.js";

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

    document.addEventListener('DOMContentLoaded', () => {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                const userRef = doc(db, "users", user.uid);
                const userSnap = await getDoc(userRef);
                const userData = userSnap.data();

                const backArrow = document.getElementById('backArrow');
                if (userData.experienced === "true") {
                    backArrow.href = `https://bridgen.vercel.app/Pages/ElderCard/ElderCard.html?uid=${user.uid}`;
                } else {
                    backArrow.href = `https://bridgen.vercel.app/Pages/YoungCard/YoungCard.html?uid=${user.uid}`;
                }

                setupFormSubmission(user);
            } else {
                window.location.href = '/Pages/EnteryScreen/EnteryScreen.html';
            }
        });
    });

    // Rest of your JavaScript for handling form submissions and other interactions
</script>
