class ContactsLoader {
    constructor() {
        this.jsonPath = './data/contacts.json';
        this.jsonLoader = new JSONLoader();
    }

    async loadContactsData() {
        try {
            const data = await this.jsonLoader.loadJSON(this.jsonPath);
            this.populateContent(data);
        } catch (error) {
            console.error('Error loading contacts data:', error);
            this.handleError();
        }
    }

    populateContent(data) {
        const title = data.title || '';
        const description = data.description || '';
        const links = data.links || [];

        this.populateTitle(title);
        this.populateDescription(description);
        this.populateLinks(links);
    }

    populateTitle(title) {
        DOMPopulator.populateElement('contacts-title', title);
    }

    populateDescription(description) {
        DOMPopulator.populateElement('contacts-description', description);
    }

    populateLinks(links) {
        const containerElement = document.getElementById('contacts-links-container');
        if (!containerElement) return;

        containerElement.innerHTML = '';
        
        links.forEach(link => {
            const href = link.href || '';
            const target = link.target || '';
            const cssClass = link.cssClass || '';
            const icon = link.icon || '';
            const title = link.title || '';
            const description = link.description || '';
            
            const linkElement = document.createElement('a');
            linkElement.href = href;
            if (target) linkElement.target = target;
            linkElement.className = cssClass;
            
            linkElement.innerHTML = `
                <i class="${icon}" aria-hidden="true"></i>
                <div class="contact-info">
                    <h3>${title}</h3>
                    <span>${description}</span>
                </div>
            `;
            
            containerElement.appendChild(linkElement);
        });
    }

    handleError() {
        console.warn('Using fallback content for contacts section');
        DOMPopulator.populateElement('contacts-title', 'Get in touch');
        DOMPopulator.populateElement('contacts-description', 'Feel free to reach out to me through any of the following platforms. I\'m always open to discussing new opportunities, collaborations, or just having a chat about technology!');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const contactsLoader = new ContactsLoader();
    contactsLoader.loadContactsData();
});