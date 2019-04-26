import { h, Component } from 'preact';
/**
 * 
 */
class TextInput extends Component {
    constructor() {
        super()
        this.state = {
            value: ''
        }
    }
    render() {
        const {criteria} = this.props
        const {value} = this.state
        const onUpdate = (e) => {
            this.props.onUpdate({[criteria]: e.target.value})
        }

        return (
            <label>
                <span>{criteria}</span>
                <br/>
                <input type="text" value={value} onKeyUp={onUpdate}/>
            </label>
        )
    }
}
// const TextInput = props => {
    
// }

export default TextInput
