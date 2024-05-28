const moment = require("moment");
const now = new Date();
const rmj = require('render-markdown-js');
const path = require('path');
const fs = require('fs');

module.exports = function (eleventyConfig) {

    eleventyConfig.setTemplateFormats("njk,html,md");
    
    eleventyConfig.addPassthroughCopy('src');
    eleventyConfig.addPassthroughCopy('assets');
    eleventyConfig.addPassthroughCopy('admin');

    eleventyConfig.addFilter('read', function (relativePath) {
        // Construct the absolute path to the file
        const absolutePath = path.join(__dirname, relativePath);
    
        // Use the 'fs' module to read the file synchronously
        return fs.readFileSync(absolutePath, 'utf-8');
    });

    eleventyConfig.addNunjucksFilter("rmj", function(content) {
        return rmj(content);
    });

    eleventyConfig.addNunjucksFilter("limit", function (array, limit) {
        return array.slice(0, limit);
    });

    eleventyConfig.addNunjucksFilter("limitPart", function(array, limit1, limit2) {
        return array.slice(limit1, limit2);
    });

    eleventyConfig.addFilter("dateFormat", function(date, format) {
        return moment(date).format(format);
    });

    eleventyConfig.addCollection('podcastsHighlighted', (collectionApi) => {
        return collectionApi.getFilteredByTag('podcasts').filter((item) => {
            return item.data.highlight == true;
        });
    });

    // Filtros avanzados
    eleventyConfig.addFilter("countdatasets", function(collections, category) {
        // Filtrar los conjuntos por la categoría dada
        let filteredConjuntos = collections.conjuntos.filter(item => item.data.categorias === category);
        // Retornar el número de conjuntos en la categoría, o 0 si no hay
        return filteredConjuntos.length || 0;
    });
}