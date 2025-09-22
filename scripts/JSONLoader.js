class JSONLoader {
    async loadJSON(jsonPath) {
        try {
            const response = await fetch(jsonPath);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

        return await response.json ();
        } catch (error) {
            console.error(`Error loading JSON from ${jsonPath}:`, error);
            throw error;
        }
    }

    extractValue(data, path) {
        return path.split('.').reduce((obj, key) => obj?.[key], data) || '';
    }

    extractArray(data, path) {
        const result = this.extractValue(data, path);
        return Array.isArray(result) ? result : [];
    }

    extractData(data, config) {
        const result = {};

        for (const [key, path] of Object.entries(config)) {
            if (Array.isArray(path)) {
                result[key] = this.extractArray(data, path[0]);
            } else {
                result[key] = this.extractValue(data, path);
            }
        }

        return result;
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = JSONLoader;
} else if (typeof window !== 'undefined') {
    window.JSONLoader = JSONLoader;
}