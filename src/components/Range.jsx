import { h, Component } from 'preact';
import Select from './Select.jsx'
import { observer, inject } from 'mobx-preact';

/**
 * 
 * Value is array of 2 items
 */
@inject('store')
@observer
class Range extends Component {
    constructor(props) {
        super(props)
    }
    render({store}) {
        const {criteria, options} = this.props
        const value = store.criterias[criteria]
        const minVal = value ? value[0] : '',
            maxVal = value? value[1]: ''

        const minCriteria = 'min ' + criteria, 
            maxCriteria = 'max ' + criteria

        const onUpdate = d => {
            let val
            if (val = d[minCriteria]) {
                store.updateFilter({
                    [criteria]: [val, maxVal]
                })
                // this.props.onUpdate({[criteria]: [val, maxValue]})
            }
            if (val = d[maxCriteria]) {
                // this.props.onUpdate({[criteria]: [minValue, val]})
                store.updateFilter({
                    [criteria]: [minVal, val]
                })
            }
        }

        return (
            <div>
                <Select  {...this.props} title={minCriteria} criteria={minCriteria} value={minVal} onUpdate={ onUpdate }></Select>
                <Select {...this.props} title={maxCriteria} criteria={maxCriteria}  value={maxVal} onUpdate={ onUpdate }></Select>
            </div>
        )
    }
}

export default Range
