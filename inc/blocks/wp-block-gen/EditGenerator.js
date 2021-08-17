/**
 * Edit Generator
 */

import "./Inputs.js";

const defaultTitleType = 'h4';

class EditGenerator {

    constructor(block, collapsed, categoryName) {
        this.block = block;
        this.collapsed = collapsed;
        this.categoryName = categoryName;

        this.editRender = new EditComponent(block, collapsed, categoryName);
    }
}

const wp = window.wp;

const { Component } = wp.element;

const el = wp.element.createElement;


/**
 * Create Edit React Component for Gutenberg Editor
 */

class EditComponent extends Component {

    constructor(block, collapsed, categoryName) {
        this.block = block;
        this.collapsed = collapsed;
        this.categoryName = categoryName;
    }
    
    render() {

        const { 
            attributes, 
            setAttributes, 
            className, 
            clientId,
            name
        } = this.props;

        
        var editElements = [];
        
        if(typeof this.block.edit != 'undefined') {
            this.block.edit.forEach(element => {
                editElements.push(generateElement(element));
            })
        }

        const editView = 
            el (
                'div',
                {
                    className: className
                },
                editElements
            );

        return el(
            'div',
            null,
            [
                <h2>{this.block.title}</h2>,
                editView
            ]
        );
    }

    generateElement(element) {
        switch(element.tag) {
            case 'title':
                return <CustomTitle element = { element } />

            case 'input':
                if(typeof element.attr == "undefined" || element.attr.length == 0
                || typeof element.type == "undefined") 
                    return null;

                const { 
                    attributes, 
                    setAttributes
                } = this.props;

                if(typeof attributes[attr] != 'undefined')
                    element.value = attributes[attr];

                return <GenerateInput 
                    element = {element}
                    setAttributes = {setAttributes}
                    />
        }
    }

    CustomTitle(props) {

        var { element } = props;
        
        if(element.tag != "title") return null;

        if(typeof element.type == 'undefined')
            element.type = defaultTitleType;

        return <Fragment>
                <element.type class="hr-title">
                    { element.title }
                </element.type>
                
                {element.useHR && 
                    <hr />
                }
            </Fragment>;
    }
}