import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';

const style = {
  margin: 12
};

class AxisLabels extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    if (e.target && e.target.name) {
      this.props.onChange(this.props.name, {[e.target.name]: e.target.value});
    }
  }

  render() {
    return (
      <div className="container">
        <div>
          <TextField
            hintText="x axis label.."
            floatingLabelText="X axis label"
            name="xlabel"
            style={style}
            value={this.props.xlabel}
            onChange={this.handleChange}/>
        </div>
        <div>
          <TextField
            hintText="y axis label.."
            floatingLabelText="Y axis label"
            name="ylabel"
            style={style}
            value={this.props.ylabel}
            onChange={this.handleChange}/>
        </div>
      </div>
    );
  }
}

AxisLabels.propTypes = {
  name: PropTypes.string.isRequired,
  xlabel: PropTypes.string.isRequired,
  ylabel: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

export default AxisLabels;
