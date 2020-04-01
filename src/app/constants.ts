export const VERSION = '0.1.1';
export const PATCH_NOTES = `
</br>
0.1.1
</br>
- More bugs squashed</br>
- Name text fields limited to 50 characters</br>
- Description text fields limited to 500 characters</br>
- Consistent circular buttons</br>
- Characters/Places/Objects/Groups can now be updated!</br>

</br>
0.1.0
</br>
- This handy patch notes popup</br>
- Dark Mode</br>
- New Login/Registration Popups</br>
- Various UI/UX improvements</br>
- Various bugs squashed</br>
`;

export const HOME_TYPEWRITER_VERBS = [
    'structure',
    'organize',
    'arrange',
    'architect',
    'develop',
    'imagine',
    'plan',
    'write',
    'create',
    'author'
];
export const HOME_TYPEWRITER_NOUNS = [
    'universes',
    'multiverses',
    'plots',
    'stories',
    'ideas',
    'books',
    'novels'
];

// Security Questions
export const SECURITY_QUESTIONS = [
    'What was your favourite pets name?',
    'How many fingers am I holding up?',
    'What is your mother\'s maiden name ? ',
    'In what year was your favourite movie filmed?',
    'What was the model of your first car?'
];

// NOTE This is an override for all other constants!
// Please make sure to always leave this value as true when pushing to git!
export const PRODUCTION = true;

// Cookies
export const SESSION_NAME = 'user';
export const SESSION_EXPIRY_DAYS = 7;
export const SESSION_SECURE = PRODUCTION;

export const LOCAL_API = true;

export const API_HOST = PRODUCTION || (!PRODUCTION && !LOCAL_API) ? 'https://prj666.mystudentlab.ca' : 'http://localhost';
export const API_PORT = PRODUCTION || (!PRODUCTION && !LOCAL_API) ? 6915 : 10040;

export const API_ENDPOINT = `${API_HOST}:${API_PORT}/api`;

// Swal Toasts
export const TOAST = {
    BASE: {
        background: 'var(--background)',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
    },
    LOGIN_SUCCESS: {
        icon: 'success',
        title: '<span style="color: var(--text)">Login Successful!</span>',
        position: 'bottom-end',
        background: 'var(--background)',
        showConfirmButton: false,
        showCloseButton: true,
        timer: 3000,
        timerProgressBar: true,
        toast: true,
    },
    UNDER_CONSTRUCTION: {
        title: '<span style="color: var(--text)">🚧 Feature Under Construction! 🚧</span>',
        position: 'bottom-end',
        icon: 'warning',
        background: 'var(--background)',
        showConfirmButton: false,
        showCloseButton: true,
        timer: 3000,
        timerProgressBar: true,
        toast: true,
    },
    SAVE_SUCCESS: {
        title: '<span style="color: var(--text)">Your changes were saved successfully!</span>',
        position: 'bottom-end',
        icon: 'success',
        background: 'var(--background)',
        showConfirmButton: false,
        showCloseButton: true,
        timer: 3000,
        timerProgressBar: true,
        toast: true,
    },
    SAVE_FAIL: {
        title: '<span style="color: var(--text)">There was an error saving your changes</span>',
        position: 'bottom-end',
        icon: 'error',
        background: 'var(--background)',
        showConfirmButton: false,
        showCloseButton: true,
        timer: 3000,
        timerProgressBar: true,
        toast: true,
    },
    SUCCESS: {
        position: 'bottom-end',
        icon: 'success',
        background: 'var(--background)',
        showConfirmButton: false,
        showCloseButton: true,
        timer: 3000,
        timerProgressBar: true,
        toast: true,
    },
    FAIL: {
        position: 'bottom-end',
        icon: 'error',
        background: 'var(--background)',
        showConfirmButton: false,
        showCloseButton: true,
        timer: 3000,
        timerProgressBar: true,
        toast: true,
    },
    FEEDBACK_SUCCESS: {
        title: '<span style="color: var(--text)">Your feedback was submitted successfully</span>',
        position: 'bottom-end',
        icon: 'success',
        background: 'var(--background)',
        showConfirmButton: false,
        showCloseButton: true,
        timer: 3000,
        timerProgressBar: true,
        toast: true,
    },
    FEEDBACK_FAIL: {
        title: '<span style="color: var(--text)">There was an error submitting your feedback</span>',
        position: 'bottom-end',
        icon: 'error',
        background: 'var(--background)',
        showConfirmButton: false,
        showCloseButton: true,
        timer: 3000,
        timerProgressBar: true,
        toast: true,
    },
    CONFIRM_DELETE: {
        title: '<span style="color: var(--text)">Woah, are you sure about this?</span>',
        html: '<span style="color: var(--text-secondary)">You can\'t undo this</span>',
        icon: 'warning',
        background: 'var(--background)',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
    },
    PROJECT_DELETED: {
        title: '<span style="color: var(--text)">Its Gone...</span>',
        html: '<span style="color: var(--text-secondary)">Your project has been deleted</span>',
        icon: 'success',
        background: 'var(--background)',
        confirmButtonColor: '#3085d6',
    },
    CONFIRM_ARCHIVE_PROJECT: {
        title: '<span style="color: var(--text)">Woah, are you sure about this?</span>',
        html: '<span style="color: var(--text-secondary)">This can be reversed in the project archive</span>',
        icon: 'warning',
        background: 'var(--background)',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Confirm'
    },
    PROJECT_ARCHIVED: {
        title: '<span style="color: var(--text)">See Ya</span>',
        html: '<span style="color: var(--text-secondary)">Your project has been moved to the archive</span>',
        icon: 'success',
        background: 'var(--background)',
        confirmButtonColor: '#3085d6',
    },
    CHARACTER_DELETED: {
        title: '<span style="color: var(--text)">Its Gone...</span>',
        html: '<span style="color: var(--text-secondary)">Your character has been deleted</span>',
        icon: 'success',
        background: 'var(--background)',
        confirmButtonColor: '#3085d6',
    },
    PLACE_DELETED: {
        title: '<span style="color: var(--text)">Its Gone...</span>',
        html: '<span style="color: var(--text-secondary)">Your place has been deleted</span>',
        icon: 'success',
        background: 'var(--background)',
        confirmButtonColor: '#3085d6',
    },
    OBJECT_DELETED: {
        title: '<span style="color: var(--text)">Its Gone...</span>',
        html: '<span style="color: var(--text-secondary)">Your object has been deleted</span>',
        icon: 'success',
        background: 'var(--background)',
        confirmButtonColor: '#3085d6',
    },
    GROUP_DELETED: {
        title: '<span style="color: var(--text)">Its Gone...</span>',
        html: '<span style="color: var(--text-secondary)">Your group has been deleted</span>',
        icon: 'success',
        background: 'var(--background)',
        confirmButtonColor: '#3085d6',
    },
};
