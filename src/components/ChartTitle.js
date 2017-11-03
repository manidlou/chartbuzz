import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';

class ChartTitle extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.onChange(this.props.name, e.target.value);
  }

  render() {
    return (
      <div>
        <TextField
          hintText="chart title.."
          floatingLabelText="chart title"
          onChange={this.handleChange}/>
      </div>
    );
  }
}

ChartTitle.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

export default ChartTitle;
