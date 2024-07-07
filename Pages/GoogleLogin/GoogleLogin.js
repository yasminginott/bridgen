document.getElementById('signup-btn').addEventListener('click', function() {
    window.location.href = 'signup.html'; // Adjust the path if necessary
  });
  
  document.getElementById('login-btn').addEventListener('click', function() {
    window.location.href = 'login.html'; // Adjust the path if necessary
  });
  
  document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form from submitting the traditional way
    const email = event.target.querySelector('input[type="email"]').value;
    const password = event.target.querySelector('input[type="password"]').value;
    console.log('Email:', email, 'Password:', password);
    // You can add actual login logic here, such as sending a request to a server
  });
  
  document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form from submitting the traditional way
    const fullName = event.target.querySelector('input[placeholder="שם מלא"]').value;
    const age = event.target.querySelector('input[placeholder="גיל"]').value;
    const neighborhood = event.target.querySelector('input[placeholder="שכונה"]').value;
    const phone = event.target.querySelector('input[placeholder="מספר טלפון"]').value;
    const image = event.target.querySelector('input[type="file"]').files[0];
    const about = event.target.querySelector('textarea[placeholder="הסבר קצר על עצמי"]').value;
  
    console.log('Full Name:', fullName, 'Age:', age, 'Neighborhood:', neighborhood, 'Phone:', phone, 'Image:', image, 'About:', about);
    // You can add actual signup logic here, such as sending a request to a server
  });
  
  document.getElementById('login_button1').addEventListener('click', function() {
    window.location.href = '/Pages/Marketplace/Marketplace.html'; });
