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

        const minCriteria = 'min ' + criteria, 
            maxCriteria = 'max ' + criteria

        const onUpdate = d => {
            let val
            if (val = d[minCriteria]) {
                this.props.onUpdate({[criteria]: [val, maxValue]})
            }
            if (val = d[maxCriteria]) {
                this.props.onUpdate({[criteria]: [minValue, val]})
            }
        }

        return (
            <div>
                <Select {...this.props} criteria={minCriteria} value={minValue} onUpdate={ onUpdate }></Select>
                <Select {...this.props} criteria={maxCriteria}  value={maxValue} onUpdate={ onUpdate }></Select>
            </div>
        )
    }
}

export default Range
