import { h, Component } from 'preact';
import { observer, inject } from 'mobx-preact';


/**
 *
 * @argument {Array<Object>} props.options
 * @argument {boolean} props.multiple
 */
@inject('store')
@observer
class Select extends Component {
    constructor() {
        super()
    }
    render({store}) {
        const {multiple, criteria, options, value} = this.props
        const onUpdate = (e) => {
            store.updateFilter({
                [criteria]: e.target.value
            })
        }
        return (
            <label>
                <span>{criteria}</span>
                <br/>
                <select value={value} multiple={multiple} onChange={onUpdate}>
                    <option value="">Any</option>
                    {options.map(op => <option value={op}>{op}</option>)}
                </select>
            </label>
        )
    }
}

export default (Select)
