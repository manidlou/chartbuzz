import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {DropDownMenu, MenuItem} from 'material-ui';

const style = {
  color: '#16A085',
  customWidth: {
    width: 200,
    margin: 12
  }
};

const chartTypes = ['Line', 'Bar', 'HorizontalBar', 'Radar', 'Doughnut', 'Pie', 'Polar'];

class ChartType extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e, i, val) {
    this.props.onChange(this.props.name, val);
  }

  render() {
    const chTypes = chartTypes.map(chType => <MenuItem key={chType} value={chType} primaryText={chType} />)
    return (
      <div>
        <DropDownMenu autoWidth={false} style={style.customWidth}
          selectedMenuItemStyle={style} value={this.props.chartType}
          onChange={this.handleChange}>
          {chTypes}
        </DropDownMenu>
      </div>
    );
  }
}

ChartType.propTypes = {
  name: PropTypes.string.isRequired,
  chartType: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

export default ChartType;
