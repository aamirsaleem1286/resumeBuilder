// Get form elements and profile elements
var resumeForm = document.getElementById('resume-form');
var nameInput = document.getElementById('name');
var emailInput = document.getElementById('email');
var degreeSelect = document.getElementById('degree');
var universityInput = document.getElementById('university');
var profilePictureInput = document.getElementById('profile-picture');
var experienceInput = document.getElementById('experience');
var formMessage = document.getElementById('form-message');
var profileContainer = document.getElementById('profile');
var profileImg = document.getElementById('profile-img');
var profileName = document.getElementById('profile-name');
var profileEmail = document.getElementById('profile-email');
var profileDegree = document.getElementById('profile-degree');
var profileUniversity = document.getElementById('profile-university');
var profileSkills = document.getElementById('profile-skills');
var profileExperience = document.getElementById('profile-experience');
// Function to get form data and return it as ResumeData
function getFormData() {
    var name = nameInput.value;
    var email = emailInput.value;
    var degree = degreeSelect.value;
    var university = universityInput.value;
    // Get selected skills from checkboxes
    var skillCheckboxes = document.querySelectorAll('#skills input[type="checkbox"]:checked');
    var skills = Array.from(skillCheckboxes).map(function (checkbox) { return checkbox.value; }).join(', ');
    var experience = experienceInput.value;
    return {
        name: name,
        email: email,
        degree: degree,
        university: university,
        skills: skills,
        experience: experience,
    };
}
// Function to generate the resume based on the form data
function generateResume(data) {
    // Populate the resume fields with form data
    document.getElementById('resume-name').textContent = data.name;
    document.getElementById('resume-email').textContent = data.email;
    document.getElementById('resume-degree').textContent = data.degree;
    document.getElementById('resume-university').textContent = data.university;
    document.getElementById('resume-skills').textContent = data.skills;
    document.getElementById('resume-experience').textContent = data.experience;
}
// Function to handle the profile picture upload
function handleProfilePictureUpload() {
    var _a;
    var file = (_a = profilePictureInput.files) === null || _a === void 0 ? void 0 : _a[0];
    if (file) {
        var reader = new FileReader();
        reader.onload = function (event) {
            var _a;
            if ((_a = event.target) === null || _a === void 0 ? void 0 : _a.result) {
                profileImg.src = event.target.result;
            }
        };
        reader.readAsDataURL(file);
    }
}
// Add event listener for profile picture input
profilePictureInput === null || profilePictureInput === void 0 ? void 0 : profilePictureInput.addEventListener('change', handleProfilePictureUpload);
// Form submit event listener
resumeForm.addEventListener('submit', function (event) {
    event.preventDefault();
    if (validateForm()) {
        var formData = getFormData();
        generateResume(formData);
        document.getElementById('resume-output').style.display = 'block';
    }
    else {
        formMessage.textContent = 'Please fill in all required fields correctly!';
    }
});
// Function to validate the form data
function validateForm() {
    var name = nameInput.value;
    var email = emailInput.value;
    var degree = degreeSelect.value;
    var university = universityInput.value;
    if (!name || !email || !degree || !university) {
        return false;
    }
    // Basic email validation
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}
