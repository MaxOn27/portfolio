class AboutLoader {
    constructor() {
        this.jsonPath = './data/about.json';
        this.jsonLoader = new JSONLoader();
    }

    async loadAboutData() {
        try {
            const data = await this.jsonLoader.loadJSON(this.jsonPath);
            this.populateContent(data);
        } catch (error) {
            console.error('Error loading about data:', error);
            this.handleError();
        }
    }

    populateContent(data) {
        const title = data.title || '';

        const greeting = data.intro?.greeting || '';
        const introDescription = data.intro?.description || '';
        const mission = data.intro?.mission || '';

        const stats = data.intro?.stats || [];

        const educationTitle = data.education?.title || '';
        const educationItems = data.education?.items || [];

        const philosophyTitle = data.philosophy?.title || '';
        const philosophyItems = data.philosophy?.items || [];

        const journeyTitle = data.journey?.title || '';
        const journeyParagraphs = data.journey?.paragraphs || [];

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
            const number = stat.number || '';
            const label = stat.label || '';
            
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
            const period = item.period || '';
            const degree = item.degree || '';
            const institution = item.institution || '';
            const description = item.description || '';
            const highlights = item.highlights || [];

            let highlightsHtml = '';
            highlights.forEach(highlight => {
                highlightsHtml += `<span>${highlight}</span>`;
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
            const icon = item.icon || '';
            const title = item.title || '';
            const description = item.description || '';
            
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
            pElement.textContent = paragraph;
            containerElement.appendChild(pElement);
        });
    }

    handleError() {
        console.warn('Using fallback content for about section');
        DOMPopulator.populateElement('about-title', 'About Me');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const aboutLoader = new AboutLoader();
    aboutLoader.loadAboutData();
});