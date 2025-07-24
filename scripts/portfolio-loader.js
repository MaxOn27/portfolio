class PortfolioLoader {
    constructor() {
        this.xmlPath = './data/portfolio.xml';
    }

    async loadPortfolioData() {
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
            console.error('Error loading portfolio data:', error);
            this.handleError();
        }
    }

    populateContent(xmlDoc) {
        const title = xmlDoc.querySelector('portfolio > title')?.textContent || '';
        
        const skillsTitle = xmlDoc.querySelector('skills title')?.textContent || '';
        const skillCategories = xmlDoc.querySelectorAll('skills categories category');
        
        const experienceTitle = xmlDoc.querySelector('experience title')?.textContent || '';
        const experienceItems = xmlDoc.querySelectorAll('experience items item');
        
        const hobbiesTitle = xmlDoc.querySelector('hobbies title')?.textContent || '';
        const hobbiesItems = xmlDoc.querySelectorAll('hobbies items item');

        this.populateTitle(title);
        this.populateSkills(skillsTitle, skillCategories);
        this.populateExperience(experienceTitle, experienceItems);
        this.populateHobbies(hobbiesTitle, hobbiesItems);
    }

    populateTitle(title) {
        const titleElement = document.getElementById('portfolio-title');
        if (titleElement) titleElement.textContent = title;
    }

    populateSkills(title, categories) {
        const titleElement = document.getElementById('portfolio-skills-title');
        const containerElement = document.getElementById('portfolio-skills-container');

        if (titleElement) titleElement.textContent = title;
        if (!containerElement) return;

        containerElement.innerHTML = '';
        
        categories.forEach(category => {
            const name = category.querySelector('name')?.textContent || '';
            const tags = category.querySelectorAll('tags tag');
            
            let tagsHtml = '';
            tags.forEach(tag => {
                tagsHtml += `<span class="skill-tag">${tag.textContent}</span>`;
            });
            
            const categoryElement = document.createElement('div');
            categoryElement.className = 'skill-category';
            categoryElement.innerHTML = `
                <h4>${name}</h4>
                <div class="skill-tags">${tagsHtml}</div>
            `;
            
            containerElement.appendChild(categoryElement);
        });
    }

    populateExperience(title, items) {
        const titleElement = document.getElementById('portfolio-experience-title');
        const containerElement = document.getElementById('portfolio-experience-container');

        if (titleElement) titleElement.textContent = title;
        if (!containerElement) return;

        containerElement.innerHTML = '';
        
        items.forEach(item => {
            const period = item.querySelector('period')?.textContent || '';
            const role = item.querySelector('role')?.textContent || '';
            const company = item.querySelector('company')?.textContent || '';
            const description = item.querySelector('description')?.textContent || '';
            const highlights = item.querySelectorAll('highlights highlight');
            
            let highlightsHtml = '';
            highlights.forEach(highlight => {
                highlightsHtml += `<span>${highlight.textContent}</span>`;
            });
            
            const itemElement = document.createElement('div');
            itemElement.className = 'experience-item';
            itemElement.innerHTML = `
                <div class="experience-period">${period}</div>
                <div class="experience-content">
                    <h4>${role}</h4>
                    <p class="experience-company">${company}</p>
                    <p class="experience-description">${description}</p>
                    <div class="experience-highlights">${highlightsHtml}</div>
                </div>
            `;
            
            containerElement.appendChild(itemElement);
        });
    }

    populateHobbies(title, items) {
        const titleElement = document.getElementById('portfolio-hobbies-title');
        const containerElement = document.getElementById('portfolio-hobbies-container');

        if (titleElement) titleElement.textContent = title;
        if (!containerElement) return;

        containerElement.innerHTML = '';
        
        items.forEach(item => {
            const icon = item.querySelector('icon')?.textContent || '';
            const title = item.querySelector('title')?.textContent || '';
            const description = item.querySelector('description')?.textContent || '';
            
            const itemElement = document.createElement('div');
            itemElement.className = 'hobby-card';
            itemElement.innerHTML = `
                <i class="${icon}" aria-hidden="true"></i>
                <h4>${title}</h4>
                <p>${description}</p>
            `;
            
            containerElement.appendChild(itemElement);
        });
    }

    handleError() {
        console.warn('Using fallback content for portfolio section');
        
        const titleElement = document.getElementById('portfolio-title');
        if (titleElement) titleElement.textContent = 'Portfolio';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const portfolioLoader = new PortfolioLoader();
    portfolioLoader.loadPortfolioData();
});