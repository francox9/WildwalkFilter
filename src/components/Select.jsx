// import withData from "./withData";
import { h, Component } from 'preact';
/**
 *
 * @argument {Array<Object>} props.options
 * @argument {boolean} props.multiple
 */
class Select extends Component {
    constructor() {
        super()
        this.state = {
            value: ''
        }
    }
    render() {
        const {multiple, criteria, options} = this.props
        const {value} = this.state
        const onUpdate = (e) => {
            this.props.onUpdate({[criteria]: e.target.value})
        }
        return (
            <label>
                <span>{criteria}</span>
                <br/>
                <select value={value} multiple={multiple} onChange={onUpdate}>
                    {options.map(op => <option value={op.value}>{op.text}</option>)}
                </select>
            </label>
        )
    }
}

export default (Select)
