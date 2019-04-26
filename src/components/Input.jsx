import { h } from 'preact';
/**
 * 
 */
const TextInput = props => {
    const {criteria} = props
    return (
        <input type="text" onKeyUp={e => props.onUpdate({[criteria]: e.target.value})}/>
    )
}

export default TextInput
