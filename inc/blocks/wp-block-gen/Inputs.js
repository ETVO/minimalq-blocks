function GenerateInput(props) {
    var {
        element, 
        setAttributes
    } = props;

    if(element.tag != 'input') return null;
    
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    var InputComponent = 'Input' + capitalizeFirstLetter(element.type);
    
    if(InputComponent != null) {
        return <InputComponent
            element = { element } 
            setAttributes = {setAttributes} />;
    }
}

function InputText(props) {
    var {
        element,
        setAttributes
    } = props;
}

function InputNumber(props) {
    var {
        element,
        setAttributes
    } = props;
}

function InputRange(props) {
    var {
        element,
        setAttributes
    } = props;
}

function InputRich(props) {
    var {
        element,
        setAttributes
    } = props;
}

function InputTextarea(props) {
    var {
        element,
        setAttributes
    } = props;
}

function InputImage(props) {
    var {
        element,
        setAttributes
    } = props;
}

function InputGallery(props) {
    var {
        element,
        setAttributes
    } = props;
}

function InputUrl(props) {
    var {
        element,
        setAttributes
    } = props;
}

function InputCheck(props) {
    var {
        element,
        setAttributes
    } = props;
}

function InputSelect(props) {
    var {
        element,
        setAttributes
    } = props;
}

function InputInner(props) {
    var {
        element,
        setAttributes
    } = props;
}

function InputTemplate(props) {
    var {
        element,
        setAttributes
    } = props;
}

function InputIcon(props) {
    var {
        element,
        setAttributes
    } = props;
}