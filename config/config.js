// ===== MAIN CONFIGURATION FILE =====
// This file loads all configuration modules

// Check if individual configs are loaded
if (typeof CONFIG_LAB === 'undefined') {
    console.error('CONFIG_LAB not loaded');
}
if (typeof CONFIG_HOME === 'undefined') {
    console.error('CONFIG_HOME not loaded');
}
if (typeof CONFIG_RESEARCH === 'undefined') {
    console.error('CONFIG_RESEARCH not loaded');
}
if (typeof CONFIG_TEAM === 'undefined') {
    console.error('CONFIG_TEAM not loaded');
}
if (typeof CONFIG_PUBLICATIONS === 'undefined') {
    console.error('CONFIG_PUBLICATIONS not loaded');
}
if (typeof CONFIG_CONTACT === 'undefined') {
    console.error('CONFIG_CONTACT not loaded');
}
if (typeof CONFIG_FOOTER === 'undefined') {
    console.error('CONFIG_FOOTER not loaded');
}

// Load all configuration modules
const CONFIG = {
    // Basic lab information - spread CONFIG_LAB properties directly
    ...(typeof CONFIG_LAB !== 'undefined' ? CONFIG_LAB : {}),
    
    // Page-specific configurations
    home: typeof CONFIG_HOME !== 'undefined' ? CONFIG_HOME : {},
    research: typeof CONFIG_RESEARCH !== 'undefined' ? CONFIG_RESEARCH : {},
    team: typeof CONFIG_TEAM !== 'undefined' ? CONFIG_TEAM : {},
    publications: typeof CONFIG_PUBLICATIONS !== 'undefined' ? CONFIG_PUBLICATIONS : {},
    contact: typeof CONFIG_CONTACT !== 'undefined' ? CONFIG_CONTACT : {},
    
    // Footer configuration
    footer: typeof CONFIG_FOOTER !== 'undefined' ? CONFIG_FOOTER : {}
};

// Make CONFIG globally available
window.CONFIG = CONFIG;

// Debug: Log the CONFIG structure
console.log('CONFIG loaded:', CONFIG);