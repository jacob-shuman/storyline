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

export const LOCAL_API = false;

export const API_HOST = PRODUCTION || (!PRODUCTION && !LOCAL_API) ? 'https://prj666.mystudentlab.ca' : 'http://localhost';
export const API_PORT = PRODUCTION || (!PRODUCTION && !LOCAL_API) ? 6915 : 10040;

export const API_ENDPOINT = `${API_HOST}:${API_PORT}/api`;

// Swal Toasts
export const TOAST = {
    LOGIN_SUCCESS: {
        icon: 'success',
        title: 'Login Successful!',
        position: 'bottom-end',
        showConfirmButton: false,
        showCloseButton: true,
        timer: 3000,
        timerProgressBar: true,
        toast: true,
    },
    UNDER_CONSTRUCTION: {
        title: '🚧 Feature Under Construction! 🚧',
        position: 'bottom-end',
        icon: 'warning',
        showConfirmButton: false,
        showCloseButton: true,
        timer: 3000,
        timerProgressBar: true,
        toast: true,
    },
    SAVE_SUCCESS: {
        title: 'Your changes were saved successfully!',
        position: 'bottom-end',
        icon: 'success',
        showConfirmButton: false,
        showCloseButton: true,
        timer: 3000,
        timerProgressBar: true,
        toast: true,
    },
    SAVE_FAIL: {
        title: 'There was an error saving your changes :(',
        position: 'bottom-end',
        icon: 'error',
        showConfirmButton: false,
        showCloseButton: true,
        timer: 3000,
        timerProgressBar: true,
        toast: true,
    },
    FEEDBACK_SUCCESS: {
        title: 'Your feedback was submitted successfully!',
        position: 'bottom-end',
        icon: 'success',
        showConfirmButton: false,
        showCloseButton: true,
        timer: 3000,
        timerProgressBar: true,
        toast: true,
    },
    FEEDBACK_FAIL: {
        title: 'There was an error submitting your feedback :(',
        position: 'bottom-end',
        icon: 'error',
        showConfirmButton: false,
        showCloseButton: true,
        timer: 3000,
        timerProgressBar: true,
        toast: true,
    },
    CONFIRM_DELETE_PROJECT: {
        title: 'Woah, are you sure about this?',
        text: 'You can\'t undo this!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'BE GONE PROJECT!'
    },
    PROJECT_DELETED: {
        title: 'Its Gone...',
        text: 'Your project has been deleted :(',
        icon: 'success',
        confirmButtonColor: '#3085d6',
    },
    CONFIRM_ARCHIVE_PROJECT: {
        title: 'Woah, are you sure about this?',
        text: 'This can be reversed in the project archive!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yea, Skedaddle!'
    },
    PROJECT_ARCHIVED: {
        title: 'See Ya',
        text: 'Your project has been moved to the archive',
        icon: 'success',
        confirmButtonColor: '#3085d6',
    }
};