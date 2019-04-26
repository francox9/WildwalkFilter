// import withData from "./withData";
import { h } from 'preact';
/**
 *
 * @argument {Array<Object>} props.options
 * @argument {boolean} props.multiple
 */
const Select = props => {
    const {multiple, criteria, options, onUpdate} = props
    return (
        <select multiple={multiple} onChange={e => onUpdate({[criteria]: e.target.value})}>
            {options.map(op => <option value={op.value}>{op.text}</option>)}
        </select>
    )
}

export default (Select)
