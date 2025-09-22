class MeLoader {
    constructor() {
        this.jsonPath = './data/me.json';
        this.jsonLoader = new JSONLoader();
    }

    async loadMeData() {
        try {
            const data = await this.jsonLoader.loadJSON(this.jsonPath);
            this.populateContent(data);
        } catch (error) {
            console.error('Error loading me data:', error);
            this.handleError();
        }
    }

    populateContent(data) {
        // Extract data from JSON
        const name = data.personal?.name || '';
        const title = data.personal?.title || '';
        const avatar = data.personal?.avatar || '';
        const aboutLabel = data.about?.label || '';
        const description = data.about?.description || '';

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

        console.warn('Using fallback content for me section');
        Object.entries(fallbackContent).forEach(([selector, content]) => {
            DOMPopulator.populateElement(selector, content);
        });
        
        DOMPopulator.populateAttribute('me-avatar', 'src', './assets/avatar.jpeg');
        DOMPopulator.populateAttribute('me-avatar', 'alt', 'Professional headshot of Maksym Tyzhnenko');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const meLoader = new MeLoader();
    meLoader.loadMeData();
});