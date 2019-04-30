import { h, Component } from 'preact';
// import withData from "./withData";

/**
 *
 * @argument {Array<Object>} props.options
 * @argument {boolean} props.multiple
 */
class Select extends Component {
    constructor() {
        super()
    }
    render() {
        const {multiple, criteria, options, value} = this.props
        const onUpdate = (e) => {
            this.props.onUpdate({[criteria]: [e.target.value]})
        }
        return (
            <label>
                <span>{criteria}</span>
                <br/>
                <select value={value} multiple={multiple} onChange={onUpdate}>
                    <option value="">Any</option>
                    {options.map(op => <option value={op.value}>{op.text}</option>)}
                </select>
            </label>
        )
    }
}

export default (Select)
