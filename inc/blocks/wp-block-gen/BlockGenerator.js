/**
 * WP Block Generator
 */

import "./EditGenerator.js";
import "./SaveGenerator.js";

const wp = window.wp;

const { registerBlockType } = wp.blocks;

export default class BlockGenerator {

    constructor(config, pathPrefix = "") {

        if(!config) {
            console.error("BlockGenerator: Unable to find wp-block-gen configuration JSON");
            return;
        }

        this.categoryName = config.category;
        this.startCollapsed = config.startCollapsed;

        this.registerBlocks(config.blocks, pathPrefix);
    }
    
    registerBlocks(blocks, pathPrefix = "", isChild = false) {
        blocks.forEach(blockData => {
            
            var block = require(pathPrefix + blockData.path + "block.json");
            block.path = blockData.path;
            block.isChild = isChild;

            this.registerBlock(block);

            if(typeof block.children != 'undefined' && block.children.length > 0) {
                // Register all children blocks with isChild set to true
                this.registerBlocks(block.children, pathPrefix + block.path, true);
            }
        });
    }
    
    registerBlock(block) {
    
        block.name = block.categ + "/" + block.slug;

        if(typeof block.parent != "undefined") {
            block.parentName = block.categ + '/' + block.parent;
        }
        
        const renderJSX = block.render == "JSX";

        var edit = new EditComponent(block, this.startCollapsed, this.categoryName);
        var save = new SaveGenerator(block);

        registerBlockType(block.name, {
            title: block.title,
            description: block.desc,
            icon: block.icon,
            parent: block.parentName,
            category: block.categ,

            attributes: block.attrs,
    
            edit: () => {     
                return edit;
            },
    
            save: () => { 
                return save;
            }
        });
    }

}