import { h, Component } from 'preact';
// import withData from './withData'
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

export default (TextInput)
