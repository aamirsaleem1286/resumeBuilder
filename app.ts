// Get form elements and profile elements
const resumeForm = document.getElementById('resume-form') as HTMLFormElement;
const nameInput = document.getElementById('name') as HTMLInputElement;
const emailInput = document.getElementById('email') as HTMLInputElement;
const degreeSelect = document.getElementById('degree') as HTMLSelectElement;
const universityInput = document.getElementById('university') as HTMLInputElement;
const profilePictureInput = document.getElementById('profile-picture') as HTMLInputElement;
const experienceInput = document.getElementById('experience') as HTMLTextAreaElement;
const formMessage = document.getElementById('form-message') as HTMLParagraphElement;

const profileContainer = document.getElementById('profile') as HTMLDivElement;
const profileImg = document.getElementById('profile-img') as HTMLImageElement;
const profileName = document.getElementById('profile-name') as HTMLHeadingElement;
const profileEmail = document.getElementById('profile-email') as HTMLParagraphElement;
const profileDegree = document.getElementById('profile-degree') as HTMLSpanElement;
const profileUniversity = document.getElementById('profile-university') as HTMLSpanElement;
const profileSkills = document.getElementById('profile-skills') as HTMLSpanElement;
const profileExperience = document.getElementById('profile-experience') as HTMLSpanElement;

// Define the ResumeData interface
interface ResumeData {
    name: string;
    email: string;
    degree: string;
    university: string;
    skills: string;
    experience: string;
}

// Function to get form data and return it as ResumeData
function getFormData(): ResumeData {
    const name = nameInput.value;
    const email = emailInput.value;
    const degree = degreeSelect.value;
    const university = universityInput.value;

    // Get selected skills from checkboxes
    const skillCheckboxes = document.querySelectorAll('#skills input[type="checkbox"]:checked');
    const skills = Array.from(skillCheckboxes).map((checkbox) => (checkbox as HTMLInputElement).value).join(', ');

    const experience = experienceInput.value;

    return {
        name,
        email,
        degree,
        university,
        skills,
        experience,
    };
}

// Function to generate the resume based on the form data
function generateResume(data: ResumeData): void {
    // Populate the resume fields with form data
    (document.getElementById('resume-name') as HTMLSpanElement).textContent = data.name;
    (document.getElementById('resume-email') as HTMLSpanElement).textContent = data.email;
    (document.getElementById('resume-degree') as HTMLSpanElement).textContent = data.degree;
    (document.getElementById('resume-university') as HTMLSpanElement).textContent = data.university;
    (document.getElementById('resume-skills') as HTMLSpanElement).textContent = data.skills;
    (document.getElementById('resume-experience') as HTMLSpanElement).textContent = data.experience;
}

// Function to handle the profile picture upload
function handleProfilePictureUpload(): void {
    const file = profilePictureInput.files?.[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
            if (event.target?.result) {
                profileImg.src = event.target.result as string;
            }
        };
        reader.readAsDataURL(file);
    }
}

// Add event listener for profile picture input
profilePictureInput?.addEventListener('change', handleProfilePictureUpload);

// Form submit event listener
resumeForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if (validateForm()) {
        const formData = getFormData();
        generateResume(formData);
        document.getElementById('resume-output')!.style.display = 'block';
    } else {
        formMessage.textContent = 'Please fill in all required fields correctly!';
    }
});

// Function to validate the form data
function validateForm(): boolean {
    const name = nameInput.value;
    const email = emailInput.value;
    const degree = degreeSelect.value;
    const university = universityInput.value;

    if (!name || !email || !degree || !university) {
        return false;
    }

    // Basic email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}
