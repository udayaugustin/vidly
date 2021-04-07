import React, { Component } from "react";

class Select extends Component {
  render() {
    const { name, label, data, ...rest } = this.props;
    return (
      <div>
        <label htmlFor={name} className="form-label">
          {label}
        </label>
        <div>
          <select
            {...rest}
            name={name}
            id={name}
            className="form-select form-select-lg mb-3"
            aria-label=".form-select-lg example"
          >
            <option value="">Select</option>
            {data.map((item) => (
              <option key={item._id} value={item._id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    );
  }
}

export default Select;
