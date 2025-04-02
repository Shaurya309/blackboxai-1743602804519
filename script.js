// Core functionality for SOS Alert System

// Initialize default storage if empty
function initializeStorage() {
    if (!localStorage.getItem('contacts')) {
        localStorage.setItem('contacts', JSON.stringify([]));
    }
    if (!localStorage.getItem('settings')) {
        localStorage.setItem('settings', JSON.stringify({
            defaultMessage: "I need urgent help! Please contact me immediately.",
            primaryContact: null
        }));
    }
}

// Contact management functions
function saveContact(contact) {
    const contacts = JSON.parse(localStorage.getItem('contacts'));
    contacts.push(contact);
    localStorage.setItem('contacts', JSON.stringify(contacts));
}

function deleteContact(index) {
    const contacts = JSON.parse(localStorage.getItem('contacts'));
    contacts.splice(index, 1);
    localStorage.setItem('contacts', JSON.stringify(contacts));
}

function updateContact(index, updatedContact) {
    const contacts = JSON.parse(localStorage.getItem('contacts'));
    contacts[index] = updatedContact;
    localStorage.setItem('contacts', JSON.stringify(contacts));
}

// Settings management
function saveSettings(settings) {
    localStorage.setItem('settings', JSON.stringify(settings));
}

function getSettings() {
    return JSON.parse(localStorage.getItem('settings'));
}

// SOS Trigger functionality
function triggerSOS() {
    const contacts = JSON.parse(localStorage.getItem('contacts'));
    const settings = getSettings();
    
    if (contacts.length === 0) {
        alert('No emergency contacts found! Please add contacts first.');
        return;
    }

    // Simulate vibration if supported
    if (navigator.vibrate) {
        navigator.vibrate([1000, 500, 1000]);
    }

    // Simulate sending messages
    const message = settings.defaultMessage;
    const contactNumbers = contacts.map(c => c.phoneNumber).join(', ');
    alert(`SOS Alert sent to: ${contactNumbers}\n\nMessage: ${message}`);
}

// DOM Content Loaded event
document.addEventListener('DOMContentLoaded', () => {
    initializeStorage();
    
    // Update contact count on dashboard
    if (document.getElementById('contact-count')) {
        const contacts = JSON.parse(localStorage.getItem('contacts'));
        document.getElementById('contact-count').textContent = contacts.length;
    }
    
    // Update default message preview
    if (document.getElementById('default-message-preview')) {
        const settings = getSettings();
        document.getElementById('default-message-preview').textContent = settings.defaultMessage;
    }
    
    // SOS Button event listener
    if (document.getElementById('sos-button')) {
        document.getElementById('sos-button').addEventListener('click', () => {
            if (confirm('Are you sure you want to send an SOS alert to all your emergency contacts?')) {
                triggerSOS();
            }
        });
    }
});

// Form validation helpers
function validatePhoneNumber(phone) {
    return /^\d{10}$/.test(phone);
}

function validateMessage(message) {
    return message.length >= 10;
}