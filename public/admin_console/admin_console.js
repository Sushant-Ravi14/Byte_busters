//         // Tailwind Configuration - Same as main page
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
                'success-green': '#10B981',
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            },
            keyframes: {
                'glow': {
                    '0%, 100%': { boxShadow: '0 0 5px rgba(0, 240, 255, 0.4)' },
                    '50%': { boxShadow: '0 0 15px rgba(0, 240, 255, 0.6)' },
                }
            },
            animation: {
                'neon-glow': 'glow 3s ease-in-out infinite',
            }
        }
    }
}
   

const provisionBtn = document.getElementById('provision-btn');
const messageBox = document.getElementById('message-box');
const generatedPasswordSpan = document.getElementById('generated-password');
let currentPassword = '';

// New elements for the manager field
const roleSelect = document.getElementById('role');
const managerFieldContainer = document.getElementById('manager-field-container');
const managerSelect = document.getElementById('manager');

/**
 * Generates a 12-character random hexadecimal password.
 * Hexadecimal is base 16 (0-9, A-F).
 */
window.generatePassword = () => {
    // Using Math.random().toString(16) for simplicity in a static environment
    // It generates a random number and converts it to a hex string.
    currentPassword = Math.random().toString(16).substring(2, 14); 
    
    // Ensure it is exactly 12 chars (in case the random number was too short)
    while (currentPassword.length < 12) {
        currentPassword += Math.random().toString(16).substring(2, 14);
        currentPassword = currentPassword.substring(0, 12);
    }

    generatedPasswordSpan.textContent = currentPassword.toUpperCase();
    messageBox.classList.add('hidden');
};

/**
 * Toggles the visibility and required status of the manager field based on the selected role.
 */
const toggleManagerField = () => {
    if (roleSelect.value === 'Manager') {
        managerFieldContainer.classList.add('hidden');
        managerSelect.required = false;
        managerSelect.disabled = true; // NEW: Disable the select element
    } else {
        managerFieldContainer.classList.remove('hidden');
        managerSelect.required = true;
        managerSelect.disabled = false; // NEW: Enable the select element
    }
};

/**
 * Handles the employee provisioning and simulated email sending.
 */
window.provisionEmployee = (event) => {
    event.preventDefault();
    
    const fullName = document.getElementById('full-name').value;
    const email = document.getElementById('email').value;
    const role = document.getElementById('role').value;
    const manager = document.getElementById('manager').value;

// Check if a password has been generated
if (currentPassword === '') {
    messageBox.textContent = 'Error: Please generate a temporary password first.';
    messageBox.classList.remove('hidden');
    messageBox.classList.remove('bg-neon-teal/20', 'text-neon-teal');
    messageBox.classList.add('bg-red-900/50', 'text-red-400', 'border-red-500');
    return;
}

// Display loading state
provisionBtn.textContent = 'Processing...';
provisionBtn.disabled = true;

// Simulate the secure provisioning and email process
setTimeout(() => {
    provisionBtn.textContent = 'Send Password & Provision Account';
    provisionBtn.disabled = false;
    
    // Construct the success message
    messageBox.textContent = `
        ✅ Success! Account provisioned for ${fullName} (${email}). 
        Role: ${role}. Initial Hex Password: ${currentPassword.toUpperCase()}.
        A notification email with the password has been *simulated* and sent. 
        The employee can now login and change their password.
    `;
    
    // Update message box styling for success
    messageBox.classList.remove('hidden', 'bg-red-900/50', 'text-red-400', 'border-red-500');
    messageBox.classList.add('bg-success-green/20', 'text-success-green', 'border-success-green');

        // Reset form fields and password display after successful action
        document.getElementById('employee-form').reset();
        generatedPasswordSpan.textContent = '********';
        currentPassword = '';
        
        // Reset the manager field state after successful submission
        toggleManagerField();
    }, 2000); // 2 seconds delay
};

// Generate an initial password on load for easy testing
document.addEventListener('DOMContentLoaded', () => {
    generatePassword();
    toggleManagerField(); // Run on initial load to set the correct state
});

// Listen for changes on the role dropdown
roleSelect.addEventListener('change', toggleManagerField);