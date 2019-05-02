import { h, Component } from 'preact';
import { observable, action } from 'mobx';
import { observer, Provider, inject, connect } from 'mobx-preact';

// import withData from './withData'
/**
 * 
 */

@inject('store')
@observer
class TextInput extends Component {
    constructor() {
        super()
    }
    render({store}) {
        const {criteria, title} = this.props
        const value = store.criterias[criteria]

        // console.log(value)
        const onUpdate = (e) => {
            store.updateFilter({
                [criteria]: e.target.value
            })

            // this.props.onUpdate({[criteria]: e.target.value})
        }

        return (
            <label>
                <span>{store.count} {title}</span>
                <br/>
                <input type="text" value={value} onKeyUp={onUpdate}/>
            </label>
        )
    }
}

export default (TextInput)
