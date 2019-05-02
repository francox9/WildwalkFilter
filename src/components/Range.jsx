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
        const {criteria, options, title} = this.props
        const value = store.criterias[criteria]

        const 
            minVal = value ? value[0] : '',
             maxVal = value? value[1]: '',
            minCriteria = 'Min ' + criteria,  
             maxCriteria = 'Max ' + criteria,
            minTitle = "Min " + title, 
             maxTitle = "Max " + title;

        const onUpdate = d => {
            let val
            if (val = d[minCriteria]) {
                store.updateFilter({
                    [criteria]: [val, maxVal]
                })
            }
            if (val = d[maxCriteria]) {
                store.updateFilter({
                    [criteria]: [minVal, val]
                })
            }
        }

        return (
            <div>
                <Select  {...this.props} title={minTitle} criteria={minCriteria} value={minVal} onUpdate={ onUpdate }></Select>
                <Select {...this.props} title={maxTitle} criteria={maxCriteria}  value={maxVal} onUpdate={ onUpdate }></Select>
            </div>
        )
    }
}

export default Range
