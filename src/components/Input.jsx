import { h, Component } from 'preact';
// import withData from './withData'
/**
 * 
 */
class TextInput extends Component {
    constructor() {
        super()
    }
    render() {
        const {criteria, value} = this.props
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
