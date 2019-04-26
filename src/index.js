import { h, render } from 'preact';
import _ from 'lodash'
import Select from './components/Select.jsx'
import TextInput from './components/Input.jsx'

import filter, {areas} from './filter'
import './style.scss'

const debounceTime = 300
const handle = (e) => {
    filter(e, true)
}
const debouncedHandle = _.debounce(handle, debounceTime)


render((
    <div id="foo">
        <TextInput criteria="title" onUpdate={debouncedHandle}/>
        <Select criteria="area" onUpdate={debouncedHandle} options={areas.map(a => ({value: a, text: a}))} multiple={true}/>
    </div>
), document.querySelector('.wt-boxes-container'));
