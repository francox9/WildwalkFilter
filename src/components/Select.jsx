import { h, Component } from "preact";
import { observer, inject } from "mobx-preact";

/**
 *
 * @argument {Array<Object>} props.options
 * @argument {boolean} props.multiple
 */
@inject("store")
@observer
class Select extends Component {
  constructor() {
    super();
  }
  render({ store }) {
    const { criteria, options, title, onUpdate: injectedOnUpdate } = this.props;
    const value = this.props.value || store.criterias[criteria];

    const onUpdate = injectedOnUpdate
      ? e => injectedOnUpdate({ [criteria]: e.target.value })
      : e => {
          store.updateFilter({
            [criteria]: e.target.value
          });
        };
    return (
      <label>
        <span>{title}</span>
        <br />
        <select value={value} onChange={onUpdate}>
          <option value="">Any</option>
          {options.map(op => (
            <option value={op}>{op}</option>
          ))}
        </select>
      </label>
    );
  }
}

export default Select;
