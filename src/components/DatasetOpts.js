import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import Checkbox from 'material-ui/Checkbox';
import DoneIcon from 'material-ui/svg-icons/action/done';
import HighlightOff from 'material-ui/svg-icons/action/highlight-off';
import { CirclePicker } from 'react-color';

const style = {
  paper: {
    width: 300,
    height: 270,
    marginTop: 12,
    textAlign: 'center',
    display: 'inline-block',
  },
  checkboxDiv: {
    maxWidth: 220,
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  checkbox: {
    marginTop: 20,
  },
  checkboxLabel: {
    color: '#34495e'
  }
}

const bgCols = {
  '#f44336': 'rgba(244,67,54, 0.2)',
  '#e91e63': 'rgba(244,67,54, 0.2)',
  '#673ab7': 'rgba(103,58,183, 0.2)',
  '#9c27b0': 'rgba(156,39,176, 0.2)',
  '#3f51b5': 'rgba(63,81,181, 0.2)',
  '#2196f3': 'rgba(33,150,243, 0.2)',
  '#03a9f4': 'rgba(3,169,244, 0.2)',
  '#00bcd4': 'rgba(0,188,212, 0.2)',
  '#009688': 'rgba(0,150,136, 0.2)',
  '#4caf50': 'rgba(76,175,80, 0.2)',
  '#8bc34a': 'rgba(139,195,74, 0.2)',
  '#cddc39': 'rgba(205,220,57, 0.2)',
  '#ffeb3b': 'rgba(255,235,59, 0.2)',
  '#ffc107': 'rgba(255,193,7, 0.2)',
  '#ff9800': 'rgba(255,152,0, 0.2)',
  '#ff5722': 'rgba(255,87,34, 0.2)',
  '#795548': 'rgba(121,85,72, 0.2)',
  '#607d8b': 'rgba(96,125,139, 0.2)'
}

class DatasetOpts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartType: props.chartType,
      borderColor: this.props.row.borderColor,
      bgColor: this.props.row.bgColor,
      fill: props.chartType === 'Line' ? false : true
    };

    this.handleChange = this.handleChange.bind(this);
    this.colorPicked = this.colorPicked.bind(this);
    this.updateCheck = this.updateCheck.bind(this);
  }

  handleChange(e) {
    const value = e.target.value;
    const name = e.target.name;
    this.setState({
      [name]: value
    });

    if (e.target.value) {
      this.props.onChangeRow('label', this.props.id, e.target.value);
    }
  }

  colorPicked(col) {
    this.setState({ borderColor: col.hex, bgColor: bgCols[col.hex] });
    this.props.onChangeRow('color', this.props.id, { borderColor: col.hex, bgColor: bgCols[col.hex] });
  }

  updateCheck(e) {
    this.setState({fill: !this.state.fill});
    this.props.onChangeRow('fill', this.props.id, e.target.checked);
  }

  render() {
    const inps = (
      <div>
        <TextField
          hintText="dataset label.."
          floatingLabelText="dataset label"
          name="datasetLabel"
          value={this.props.row.label}
          onChange={this.handleChange}
        />
        <br />

    {this.state.chartType === 'Line' ? (
      <div style={style.checkboxDiv}>
          <Checkbox
            label="fill area under the line"
            checked={this.state.fill}
            checkedIcon={<DoneIcon />}
            uncheckedIcon={<HighlightOff />}
            style={style.checkbox}
            labelStyle={style.checkboxLabel}
            iconStyle={style.checkboxInp}
            onCheck={this.updateCheck}
          />
      </div>
    ) : null}

    <div className="colpicker">
    <CirclePicker
      color={this.state.borderColor}
      onChangeComplete={this.colorPicked}
    />
    </div>
    </div>
  );

    return (
      <div>
      <Paper children={inps} style={style.paper} zDepth={1} />
      </div>
    );
  }
}

DatasetOpts.propTypes = {
  id: PropTypes.number.isRequired,
  row: PropTypes.object.isRequired,
  chartType: PropTypes.string.isRequired,
  onChangeRow: PropTypes.func.isRequired
};

export default DatasetOpts;
