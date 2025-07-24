class MeLoader {
    constructor() {
        this.xmlPath = './data/me.xml';
    }

    async loadMeData() {
        try {
            const response = await fetch(this.xmlPath);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const xmlText = await response.text();
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xmlText, 'text/xml');
            
            // Check for parsing errors
            const parseError = xmlDoc.querySelector('parsererror');
            if (parseError) {
                throw new Error('XML parsing error: ' + parseError.textContent);
            }
            
            this.populateContent(xmlDoc);
        } catch (error) {
            console.error('Error loading me data:', error);
            this.handleError();
        }
    }

    populateContent(xmlDoc) {
        // Extract data from XML
        const name = xmlDoc.querySelector('personal name')?.textContent || '';
        const title = xmlDoc.querySelector('personal title')?.textContent || '';
        const avatar = xmlDoc.querySelector('personal avatar')?.textContent || '';
        const aboutLabel = xmlDoc.querySelector('about label')?.textContent || '';
        const description = xmlDoc.querySelector('about description')?.textContent || '';
	    console.log (name)

        // Populate HTML elements
        const nameElement = document.getElementById('me-name');
        const titleElement = document.getElementById('me-title');
        const avatarElement = document.getElementById('me-avatar');
        const aboutLabelElement = document.getElementById('me-about-label');
        const descriptionElement = document.getElementById('me-description');

        if (nameElement) nameElement.textContent = `I'M ${name}.`;
        if (titleElement) titleElement.textContent = `${title}.`;
        if (avatarElement) {
            avatarElement.src = avatar;
            avatarElement.alt = `Professional headshot of ${name}`;
        }
        if (aboutLabelElement) aboutLabelElement.textContent = aboutLabel;
        if (descriptionElement) descriptionElement.textContent = description;
    }

    handleError() {
        console.warn('Using fallback content for me section');
        
        // Set fallback content
        const nameElement = document.getElementById('me-name');
        const titleElement = document.getElementById('me-title');
        const avatarElement = document.getElementById('me-avatar');
        const aboutLabelElement = document.getElementById('me-about-label');
        const descriptionElement = document.getElementById('me-description');

        if (nameElement) nameElement.textContent = 'I\'M MAKSYM TYZHNENKO.';
        if (titleElement) titleElement.textContent = 'FULL-STACK ENGINEER.';
        if (avatarElement) {
            avatarElement.src = './assets/avatar.jpeg';
            avatarElement.alt = 'Professional headshot of Maksym Tyzhnenko';
        }
        if (aboutLabelElement) aboutLabelElement.textContent = 'About';
        if (descriptionElement) descriptionElement.textContent = 'Passionate engineer with 3+ years\' experience from Chernivtsi, Ukraine. Actively seeking new roles, challenges, and opportunities to grow — valued for rapid learning, clean code, and a collaborative spirit.';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const meLoader = new MeLoader();
    meLoader.loadMeData();
});