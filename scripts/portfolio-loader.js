class PortfolioLoader {
    constructor() {
        this.jsonPath = './data/portfolio.json';
        this.jsonLoader = new JSONLoader();
    }

    async loadPortfolioData() {
        try {
            const data = await this.jsonLoader.loadJSON(this.jsonPath);
            this.populateContent(data);
        } catch (error) {
            console.error('Error loading portfolio data:', error);
            this.handleError();
        }
    }

    populateContent(data) {
        const title = data.title || '';
        const skillsTitle = data.skills?.title || '';
        const skillCategories = data.skills?.categories || [];
        const experienceTitle = data.experience?.title || '';
        const experienceItems = data.experience?.items || [];
        const hobbiesTitle = data.hobbies?.title || '';
        const hobbiesItems = data.hobbies?.items || [];

        this.populateTitle(title);
        this.populateSkills(skillsTitle, skillCategories);
        this.populateExperience(experienceTitle, experienceItems);
        this.populateHobbies(hobbiesTitle, hobbiesItems);
    }

    populateTitle(title) {
        DOMPopulator.populateElement('portfolio-title', title);
    }

    populateSkills(title, categories) {
        DOMPopulator.populateElement('portfolio-skills-title', title);
        
        this.populateFromJSONArray('portfolio-skills-container', categories, (category) => {
            const name = category.name || '';
            const tags = category.tags || [];
            const tagsHtml = this.createTagsHTML(tags);
            
            const categoryElement = document.createElement('div');
            categoryElement.className = 'skill-category';
            categoryElement.innerHTML = `
                <h4>${name}</h4>
                <div class="skill-tags">${tagsHtml}</div>
            `;
            
            return categoryElement;
        });
    }

    populateExperience(title, items) {
        DOMPopulator.populateElement('portfolio-experience-title', title);
        
        this.populateFromJSONArray('portfolio-experience-container', items, (item) => {
            const period = item.period || '';
            const role = item.role || '';
            const company = item.company || '';
            const description = item.description || '';
            const highlights = item.highlights || [];
            const highlightsHtml = this.createHighlightsHTML(highlights);
            
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
            
            return itemElement;
        });
    }

    populateHobbies(title, items) {
        DOMPopulator.populateElement('portfolio-hobbies-title', title);
        
        this.populateFromJSONArray('portfolio-hobbies-container', items, (item) => {
            const icon = item.icon || '';
            const title = item.title || '';
            const description = item.description || '';
            
            const itemElement = document.createElement('div');
            itemElement.className = 'hobby-card';
            itemElement.innerHTML = `
                <i class="${icon}" aria-hidden="true"></i>
                <h4>${title}</h4>
                <p>${description}</p>
            `;
            
            return itemElement;
        });
    }

    populateFromJSONArray(containerSelector, items, renderer, className = '') {
        const container = DOMPopulator.clearContainer(containerSelector);
        if (!container) return null;

        items.forEach(item => {
            const element = renderer(item);
            if (element) {
                if (className) {
                    element.className = className;
                }
                container.appendChild(element);
            }
        });

        return container;
    }

    createTagsHTML(tags) {
        return tags.map(tag => `<span class="skill-tag">${tag}</span>`).join('');
    }

    createHighlightsHTML(highlights) {
        return highlights.map(highlight => `<span>${highlight}</span>`).join('');
    }

    handleError() {
        console.warn('Using fallback content for portfolio section');
        DOMPopulator.populateElement('portfolio-title', 'Portfolio');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const portfolioLoader = new PortfolioLoader();
    portfolioLoader.loadPortfolioData();
});