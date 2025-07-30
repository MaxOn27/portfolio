class PortfolioLoader {
    constructor() {
        this.xmlPath = './data/portfolio.xml';
        this.xmlLoader = new XMLLoader();
    }

    async loadPortfolioData() {
        try {
            const xmlDoc = await this.xmlLoader.loadXML(this.xmlPath);
            this.populateContent(xmlDoc);
        } catch (error) {
            console.error('Error loading portfolio data:', error);
            this.handleError();
        }
    }

    populateContent(xmlDoc) {
        const title = this.xmlLoader.extractText(xmlDoc, 'portfolio > title');
        const skillsTitle = this.xmlLoader.extractText(xmlDoc, 'skills title');
        const skillCategories = this.xmlLoader.extractMultiple(xmlDoc, 'skills categories category');
        const experienceTitle = this.xmlLoader.extractText(xmlDoc, 'experience title');
        const experienceItems = this.xmlLoader.extractMultiple(xmlDoc, 'experience items item');
        const hobbiesTitle = this.xmlLoader.extractText(xmlDoc, 'hobbies title');
        const hobbiesItems = this.xmlLoader.extractMultiple(xmlDoc, 'hobbies items item');

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
        
        DOMPopulator.populateFromXMLNodes('portfolio-skills-container', categories, (category) => {
            const name = this.xmlLoader.extractText(category, 'name');
            const tags = XMLContentUtils.extractTags(category);
            const tagsHtml = XMLContentUtils.createTagsHTML(tags);
            
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
        
        DOMPopulator.populateFromXMLNodes('portfolio-experience-container', items, (item) => {
            const period = this.xmlLoader.extractText(item, 'period');
            const role = this.xmlLoader.extractText(item, 'role');
            const company = this.xmlLoader.extractText(item, 'company');
            const description = this.xmlLoader.extractText(item, 'description');
            const highlights = XMLContentUtils.extractHighlights(item);
            const highlightsHtml = XMLContentUtils.createHighlightsHTML(highlights);
            
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
        
        DOMPopulator.populateFromXMLNodes('portfolio-hobbies-container', items, (item) => {
            const icon = this.xmlLoader.extractText(item, 'icon');
            const title = this.xmlLoader.extractText(item, 'title');
            const description = this.xmlLoader.extractText(item, 'description');
            
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

    handleError() {
        XMLContentUtils.handleXMLError('portfolio', {
            'portfolio-title': 'Portfolio'
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const portfolioLoader = new PortfolioLoader();
    portfolioLoader.loadPortfolioData();
});