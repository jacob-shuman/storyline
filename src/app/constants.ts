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
export const PRODUCTION = false;

// Cookies
export const SESSION_NAME = 'user';
export const SESSION_EXPIRY_DAYS = 7;
export const SESSION_SECURE = PRODUCTION;

export const LOCAL_API = true;

export const API_HOST = PRODUCTION || (!PRODUCTION && !LOCAL_API) ? 'https://prj666.mystudentlab.ca' : 'http://localhost';
export const API_PORT = PRODUCTION || (!PRODUCTION && !LOCAL_API) ? 6915 : 10040;

export const API_ENDPOINT = `${API_HOST}:${API_PORT}/api`;