class ContactsLoader {
    constructor() {
        this.xmlPath = './data/contacts.xml';
        this.xmlLoader = new XMLLoader();
    }

    async loadContactsData() {
        try {
            const xmlDoc = await this.xmlLoader.loadXML(this.xmlPath);
            this.populateContent(xmlDoc);
        } catch (error) {
            console.error('Error loading contacts data:', error);
            this.handleError();
        }
    }

    populateContent(xmlDoc) {
        const title = xmlDoc.querySelector('contacts > title')?.textContent || '';
        const description = xmlDoc.querySelector('contacts > description')?.textContent || '';
        const links = xmlDoc.querySelectorAll('contacts links link');

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
            const href = link.querySelector('href')?.textContent || '';
            const target = link.querySelector('target')?.textContent || '';
            const cssClass = link.querySelector('cssClass')?.textContent || '';
            const icon = link.querySelector('icon')?.textContent || '';
            const title = link.querySelector('title')?.textContent || '';
            const description = link.querySelector('description')?.textContent || '';
            
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
        XMLContentUtils.handleXMLError('contacts', {
            'contacts-title': 'Get in touch',
            'contacts-description': 'Feel free to reach out to me through any of the following platforms. I\'m always open to discussing new opportunities, collaborations, or just having a chat about technology!'
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const contactsLoader = new ContactsLoader();
    contactsLoader.loadContactsData();
});