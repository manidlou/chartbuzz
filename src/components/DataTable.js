import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AddIcon from 'material-ui/svg-icons/content/add';
import RemoveIcon from 'material-ui/svg-icons/content/remove';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import '../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import DatasetOpts from './DatasetOpts';

const style = {
  icon: {
    height: 20
  },
  paper: {
    width: 600,
    height: 400,
    marginTop: 12,
    textAlign: 'center',
    display: 'inline-block',
  }
};

class DataTable extends Component {
  constructor(props) {
    super(props);

    this.onAfterSaveCell = this.onAfterSaveCell.bind(this);

    this.cellEditMode = {
      mode: 'click',
      // beforeSaveCell: this.onBeforeSaveCell, // a hook for before saving cell
      afterSaveCell: this.onAfterSaveCell  // a hook for after saving cell
    };

    this.handleChange = this.handleChange.bind(this);
    this.expandComponent = this.expandComponent.bind(this);
    this.expandColumnComponent = this.expandColumnComponent.bind(this);
    this.isExpandableRow = this.isExpandableRow.bind(this);
    this.onBeforeSaveCell = this.onBeforeSaveCell.bind(this);
  }

  onAfterSaveCell(row) {
    this.props.onChangeRowData(row);
  }

  onBeforeSaveCell(row) {
    // You can do any validation on here for editing value,
    // return false for reject the editing
    return true;
  }

  handleChange(name, rowId, dat) {
    this.props.onChangeRow(name, rowId, dat);
  }

  isExpandableRow(row) {
    return true;
  }

  expandComponent(row) {
    return (
      <DatasetOpts id={row.i} row={row} chartType={'Line'} onChangeRow={this.handleChange} />
    );
  }

  expandColumnComponent({ isExpandableRow, isExpanded }) {
    let content = '';

    if (isExpandableRow) {
      content = (isExpanded ? <RemoveIcon style={style.icon} /> : <AddIcon style={style.icon} /> );
    } else {
      content = ' ';
    }
    return (
      <div> { content } </div>
    );
  }

  render() {
    const table = (
      <BootstrapTable data={this.props.rows} hover
      options={{expandBy: 'column'}}
      cellEdit={ this.cellEditMode }
      expandableRow={this.isExpandableRow}
      expandComponent={ this.expandComponent }
      expandColumnOptions={{
        expandColumnVisible: true,
        expandColumnComponent: this.expandColumnComponent,
        columnWidth: 40
      }}>
      {
        this.props.cols.map((col, i) =>
          <TableHeaderColumn key={i} expandable={false} isKey={i === 0 ? true : false}
            hidden={i === 0 ? true : false} dataField={col}>{col}</TableHeaderColumn>)
      }
      </BootstrapTable>
    );

    return (
      <div>
        {table}
      </div>
    );
  }
}

DataTable.propTypes = {
  chartType: PropTypes.string.isRequired,
  cols: PropTypes.array.isRequired,
  rows: PropTypes.array.isRequired,
  onChangeRow: PropTypes.func.isRequired,
  onChangeRowData: PropTypes.func.isRequired
};

export default DataTable;
