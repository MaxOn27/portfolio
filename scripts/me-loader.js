class MeLoader {
    constructor() {
        this.xmlPath = './data/me.xml';
        this.xmlLoader = new XMLLoader();
    }

    async loadMeData() {
        try {
            const xmlDoc = await this.xmlLoader.loadXML(this.xmlPath);
            this.populateContent(xmlDoc);
        } catch (error) {
            console.error('Error loading me data:', error);
            this.handleError();
        }
    }

    populateContent(xmlDoc) {
        // Extract data from XML
        const name = this.xmlLoader.extractText(xmlDoc, 'personal name');
        const title = this.xmlLoader.extractText(xmlDoc, 'personal title');
        const avatar = this.xmlLoader.extractText(xmlDoc, 'personal avatar');
        const aboutLabel = this.xmlLoader.extractText(xmlDoc, 'about label');
        const description = this.xmlLoader.extractText(xmlDoc, 'about description');

        // Populate HTML elements using DOMPopulator
        DOMPopulator.populateElement('me-name', `I'M ${name}.`);
        DOMPopulator.populateElement('me-title', `${title}.`);
        DOMPopulator.populateAttribute('me-avatar', 'src', avatar);
        DOMPopulator.populateAttribute('me-avatar', 'alt', `Professional headshot of ${name}`);
        DOMPopulator.populateElement('me-about-label', aboutLabel);
        DOMPopulator.populateElement('me-description', description);
    }

    handleError() {
        const fallbackContent = {
            'me-name': 'I\'M MAKSYM TYZHNENKO.',
            'me-title': 'FULL-STACK ENGINEER.',
            'me-about-label': 'About',
            'me-description': 'Passionate engineer with 3+ years\' experience from Chernivtsi, Ukraine. Actively seeking new roles, challenges, and opportunities to grow — valued for rapid learning, clean code, and a collaborative spirit.'
        };

        XMLContentUtils.handleXMLError('me', fallbackContent);
        
        DOMPopulator.populateAttribute('me-avatar', 'src', './assets/avatar.jpeg');
        DOMPopulator.populateAttribute('me-avatar', 'alt', 'Professional headshot of Maksym Tyzhnenko');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const meLoader = new MeLoader();
    meLoader.loadMeData();
});