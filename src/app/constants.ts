export const HOME_TYPEWRITER_VERBS = ["structure", "organize", "arrange", "architect", "develop", "imagine", "plan", "write", "create", "author"];
export const HOME_TYPEWRITER_NOUNS = ["universes", "multiverses", "plots", "stories", "ideas", "books", "novels"];

// NOTE This is an override for all other constants!
// Please make sure to always leave this value as true when pushing to git!
export const PRODUCTION = true;

// Cookies
export const SESSION_NAME = 'user';
export const SESSION_EXPIRY_DAYS = 7;
export const SESSION_SECURE = PRODUCTION;

export const LOCAL_API = false;

export const API_HOST = PRODUCTION || (!PRODUCTION && LOCAL_API) ? "https://prj666.mystudentlab.ca" : "http://localhost";
export const API_PORT = PRODUCTION || (!PRODUCTION && LOCAL_API) ? 6915 : 10040;

export const API_ENDPOINT = `${API_HOST}:${API_PORT}/api`;