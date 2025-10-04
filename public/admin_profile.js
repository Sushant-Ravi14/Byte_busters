// Tailwind Configuration for the futuristic theme
tailwind.config = {
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                'space-dark': '#0D1117',
                'space-mid': '#161B22',
                'space-light': '#21262D',
                'neon-teal': '#00F0FF', // Primary Accent
                'neon-violet': '#7F00FF', // Secondary Accent
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            },
            keyframes: {
                'glow': {
                    '0%, 100%': { boxShadow: '0 0 5px rgba(0, 240, 255, 0.4), 0 0 10px rgba(0, 240, 255, 0.2)' },
                    '50%': { boxShadow: '0 0 15px rgba(0, 240, 255, 0.6), 0 0 25px rgba(0, 240, 255, 0.4)' },
                },
                'fade-in': {
                    '0%': { opacity: '0', transform: 'translateY(10px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                'fade-out': {
                    '0%': { opacity: '1', transform: 'translateY(0)' },
                    '100%': { opacity: '0', transform: 'translateY(10px)' },
                }
            },
            animation: {
                'neon-glow': 'glow 3s ease-in-out infinite',
                'fade-in': 'fade-in 0.5s ease-out forwards',
                'fade-out': 'fade-out 0.5s ease-out forwards',
            }
        }
    }
}



document.addEventListener('DOMContentLoaded', () => {
    const editProfileBtn = document.getElementById('edit-profile-btn');
    const cancelEditBtn = document.getElementById('cancel-edit-btn');
    const profileViewSection = document.getElementById('profile-view');
    const profileEditSection = document.getElementById('profile-edit');
    const editProfileForm = document.getElementById('edit-profile-form');

    const profileNameSpan = document.getElementById('profile-name');
    const profileRoleSpan = document.getElementById('profile-role');
    const profileEmailSpan = document.getElementById('profile-email');
    const profileCurrencySpan = document.getElementById('profile-currency');

    const editNameInput = document.getElementById('edit-name');
    const editEmailInput = document.getElementById('edit-email');
    const editRoleInput = document.getElementById('edit-role');
    const editCurrencyInput = document.getElementById('edit-currency');
    

        // Function to show the edit form and hide the profile view
    const showEditForm = () => {
        // Populate the form with current profile data
    editNameInput.value = profileNameSpan.textContent;
    editEmailInput.value = profileEmailSpan.textContent;
    editRoleInput.value = profileRoleSpan.textContent;
    editCurrencyInput.value = profileCurrencySpan.textContent;

    // Animate fade out of the view section
    profileViewSection.classList.remove('animate-fade-in');
    profileViewSection.classList.add('animate-fade-out');

            // After the animation, hide the view and show the edit form
        setTimeout(() => {
            profileViewSection.classList.add('hidden');
            profileViewSection.classList.remove('animate-fade-out');
            profileEditSection.classList.remove('hidden');
            profileEditSection.classList.add('animate-fade-in');
            }, 400); // Duration matches CSS fade-out animation
        };

            // Function to show the profile view and hide the edit form
        const showProfileView = () => {
            // Animate fade out of the edit form
            profileEditSection.classList.remove('animate-fade-in');
            profileEditSection.classList.add('animate-fade-out');
                
        // After the animation, hide the form and show the view
        setTimeout(() => {
            profileEditSection.classList.add('hidden');
            profileEditSection.classList.remove('animate-fade-out');
            profileViewSection.classList.remove('hidden');
            profileViewSection.classList.add('animate-fade-in');
        }, 400); // Duration matches CSS fade-out animation
        };

        // Event listeners
        editProfileBtn.addEventListener('click', showEditForm);
        cancelEditBtn.addEventListener('click', showProfileView);

        editProfileForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // In a real application, you would send this data to a server.
        // For this example, we'll just update the visible text.
        profileNameSpan.textContent = editNameInput.value;
        profileEmailSpan.textContent = editEmailInput.value;
        profileRoleSpan.textContent = editRoleInput.value;
        profileCurrencySpan.textContent = editCurrencyInput.value;



        alert('Profile updated successfully!');
        showProfileView();
    });
});
