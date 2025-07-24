class ContactsLoader {
    constructor() {
        this.xmlPath = './data/contacts.xml';
    }

    async loadContactsData() {
        try {
            const response = await fetch(this.xmlPath);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const xmlText = await response.text();
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xmlText, 'text/xml');
            
            const parseError = xmlDoc.querySelector('parsererror');
            if (parseError) {
                throw new Error('XML parsing error: ' + parseError.textContent);
            }
            
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
        const titleElement = document.getElementById('contacts-title');
        if (titleElement) titleElement.textContent = title;
    }

    populateDescription(description) {
        const descriptionElement = document.getElementById('contacts-description');
        if (descriptionElement) descriptionElement.textContent = description;
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
        console.warn('Using fallback content for contacts section');
        
        const titleElement = document.getElementById('contacts-title');
        if (titleElement) titleElement.textContent = 'Get in touch';
        
        const descriptionElement = document.getElementById('contacts-description');
        if (descriptionElement) {
            descriptionElement.textContent = 'Feel free to reach out to me through any of the following platforms. I\'m always open to discussing new opportunities, collaborations, or just having a chat about technology!';
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const contactsLoader = new ContactsLoader();
    contactsLoader.loadContactsData();
});