class AboutLoader {
    constructor() {
        this.xmlPath = './data/about.xml';
        this.xmlLoader = new XMLLoader();
    }

    async loadAboutData() {
        try {
            const xmlDoc = await this.xmlLoader.loadXML(this.xmlPath);
            this.populateContent(xmlDoc);
        } catch (error) {
            console.error('Error loading about data:', error);
            this.handleError();
        }
    }

    populateContent(xmlDoc) {
        const title = xmlDoc.querySelector('about > title')?.textContent || '';
        
        const greeting = xmlDoc.querySelector('intro greeting')?.textContent || '';
        const introDescription = xmlDoc.querySelector('intro description')?.textContent || '';
        const mission = xmlDoc.querySelector('intro mission')?.textContent || '';
        
        const stats = xmlDoc.querySelectorAll('intro stats stat');
        
        const educationTitle = xmlDoc.querySelector('education title')?.textContent || '';
        const educationItems = xmlDoc.querySelectorAll('education items item');
        
        const philosophyTitle = xmlDoc.querySelector('philosophy title')?.textContent || '';
        const philosophyItems = xmlDoc.querySelectorAll('philosophy items item');
        
        const journeyTitle = xmlDoc.querySelector('journey title')?.textContent || '';
        const journeyParagraphs = xmlDoc.querySelectorAll('journey paragraphs paragraph');

        this.populateTitle(title);
        this.populateIntro(greeting, introDescription, mission);
        this.populateStats(stats);
        this.populateEducation(educationTitle, educationItems);
        this.populatePhilosophy(philosophyTitle, philosophyItems);
        this.populateJourney(journeyTitle, journeyParagraphs);
    }

    populateTitle(title) {
        DOMPopulator.populateElement('about-title', title);
    }

    populateIntro(greeting, description, mission) {
        DOMPopulator.populateElement('about-greeting', greeting);
        DOMPopulator.populateElement('about-intro-description', description);
        DOMPopulator.populateElement('about-intro-mission', mission);
    }

    populateStats(stats) {
        const statsContainer = document.getElementById('about-stats-container');
        if (!statsContainer) return;

        statsContainer.innerHTML = '';
        
        stats.forEach(stat => {
            const number = stat.querySelector('number')?.textContent || '';
            const label = stat.querySelector('label')?.textContent || '';
            
            const statElement = document.createElement('div');
            statElement.className = 'stat-item';
            statElement.innerHTML = `
                <span class="stat-number">${number}</span>
                <span class="stat-label">${label}</span>
            `;
            
            statsContainer.appendChild(statElement);
        });
    }

    populateEducation(title, items) {
        const titleElement = document.getElementById('about-education-title');
        const containerElement = document.getElementById('about-education-container');

        if (titleElement) titleElement.textContent = title;
        if (!containerElement) return;

        containerElement.innerHTML = '';
        
        items.forEach(item => {
            const period = item.querySelector('period')?.textContent || '';
            const degree = item.querySelector('degree')?.textContent || '';
            const institution = item.querySelector('institution')?.textContent || '';
            const description = item.querySelector('description')?.textContent || '';
            const highlights = item.querySelectorAll('highlights highlight');
            
            let highlightsHtml = '';
            highlights.forEach(highlight => {
                highlightsHtml += `<span>${highlight.textContent}</span>`;
            });
            
            const itemElement = document.createElement('div');
            itemElement.className = 'education-item';
            itemElement.innerHTML = `
                <div class="education-period">${period}</div>
                <div class="education-content">
                    <h4>${degree}</h4>
                    <p class="education-institution">${institution}</p>
                    <p class="education-description">${description}</p>
                    <div class="education-highlights">${highlightsHtml}</div>
                </div>
            `;
            
            containerElement.appendChild(itemElement);
        });
    }

    populatePhilosophy(title, items) {
        const titleElement = document.getElementById('about-philosophy-title');
        const containerElement = document.getElementById('about-philosophy-container');

        if (titleElement) titleElement.textContent = title;
        if (!containerElement) return;

        containerElement.innerHTML = '';
        
        items.forEach(item => {
            const icon = item.querySelector('icon')?.textContent || '';
            const title = item.querySelector('title')?.textContent || '';
            const description = item.querySelector('description')?.textContent || '';
            
            const itemElement = document.createElement('div');
            itemElement.className = 'philosophy-item';
            itemElement.innerHTML = `
                <i class="${icon}" aria-hidden="true"></i>
                <h4>${title}</h4>
                <p>${description}</p>
            `;
            
            containerElement.appendChild(itemElement);
        });
    }

    populateJourney(title, paragraphs) {
        const titleElement = document.getElementById('about-journey-title');
        const containerElement = document.getElementById('about-journey-container');

        if (titleElement) titleElement.textContent = title;
        if (!containerElement) return;

        containerElement.innerHTML = '';
        
        paragraphs.forEach(paragraph => {
            const pElement = document.createElement('p');
            pElement.textContent = paragraph.textContent;
            containerElement.appendChild(pElement);
        });
    }

    handleError() {
        XMLContentUtils.handleXMLError('about', {
            'about-title': 'About Me'
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const aboutLoader = new AboutLoader();
    aboutLoader.loadAboutData();
});