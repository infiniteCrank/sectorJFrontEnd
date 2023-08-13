import React from 'react';

export default class SizePicker extends React.Component {

    static propTypes = {
        label: React.PropTypes.string.isRequired,
        outputLabel: React.PropTypes.string.isRequired,
        selectId: React.PropTypes.string.isRequired,
        sizes: React.PropTypes.arrayOf(React.PropTypes.string).isRequired
    };

    static defaultProps = {
        label: 'Select your t-shirt size',
        outputLabel: 'You size is',
        selectId: 'sizePicker',
        sizes: ['s', 'm', 'l', 'xl']
    };

    static styles = {
        select: {
            marginLeft: '10px'
        }
    };

    state = {
        size: this.props.sizes[0]
    };

    constructor(props) {
        super(props);
    }

    render() {
        let {label, outputLabel, selectId, sizes} = this.props,
            chosenSize = this.state.size;

        return (
            <fildset>
                <label htmlFor={selectId}>{label}</label>
                <select value={chosenSize} id={selectId} onChange={this.setSize.bind(this)}
                        style={SizePicker.styles.select}>
                    {sizes.map((size) => {
                        return <option key={size} value={size}>{size}</option>;
                    })}
                </select>

                <p>{outputLabel} <strong>{chosenSize}</strong></p>
            </fildset>

        );
    }

    /**
     * @desc sets chosen t-shirt size
     * @param {Event} event - onChange event
     */
    setSize(event) {
        this.setState({
            size: event.target.value
        });
    }
}