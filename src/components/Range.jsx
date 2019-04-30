import { h, Component } from 'preact';
import Select from './Select.jsx'

/**
 * 
 * Value is array of 2 items
 */
class Range extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        const {criteria, value: [minValue, maxValue], options} = this.props

        

        const onUpdate = isMin => d => {
            debugger
            const val = d[criteria]
            this.props.onUpdate({[criteria]: isMin ? [val, maxValue] : [minValue, val] })
        }

        return (
            <div>
                <Select {...this.props} value={minValue} onUpdate={ onUpdate(true) }></Select>
                <Select {...this.props} value={maxValue} onUpdate={ onUpdate(false) }></Select>
            </div>
        )
    }
}

export default Range
