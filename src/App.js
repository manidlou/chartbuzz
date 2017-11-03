import React, { Component } from 'react';
import logo from './logo.png';
import titleLogo from './logo2.png';
import './App.css';

import {Line, Bar, HorizontalBar, Radar} from 'react-chartjs-2';
import Rnd from 'react-rnd';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import DataTable from './components/DataTable';
import ChartType from './components/ChartType';
import ChartTitle from './components/ChartTitle';
import AxisLabels from './components/AxisLabels';
import Actions from './components/Actions';

const chartWidth = 800;
const chartHeight = 400;

const colors = [
  {borderColor: '#009688', bgColor: 'rgba(0,150,136, 0.2)'},
  {borderColor: '#ff5722', bgColor: 'rgba(255,87,34, 0.2)'},
  {borderColor: '#2196f3', bgColor: 'rgba(33,150,243, 0.2)'},
  {borderColor: '#9c27b0', bgColor: 'rgba(156,39,176, 0.2)'},
  {borderColor: '#ff9800', bgColor: 'rgba(255,152,0, 0.2)'},
  {borderColor: '#673ab7', bgColor: 'rgba(103,58,183, 0.2)'},
  {borderColor: '#3f51b5', bgColor: 'rgba(63,81,181, 0.2)'},
  {borderColor: '#607d8b', bgColor: 'rgba(96,125,139, 0.2)'},
  {borderColor: '#00bcd4', bgColor: 'rgba(0,188,212, 0.2)'},
  {borderColor: '#4caf50', bgColor: 'rgba(76,175,80, 0.2)'},
  {borderColor: '#8bc34a', bgColor: 'rgba(139,195,74, 0.2)'},
  {borderColor: '#795548', bgColor: 'rgba(121,85,72, 0.2)'},
  {borderColor: '#ffeb3b', bgColor: 'rgba(255,235,59, 0.2)'},
  {borderColor: '#ffc107', bgColor: 'rgba(255,193,7, 0.2)'},
  {borderColor: '#e91e63', bgColor: 'rgba(244,67,54, 0.2)'},
  {borderColor: '#cddc39', bgColor: 'rgba(205,220,57, 0.2)'},
  {borderColor: '#03a9f4', bgColor: 'rgba(3,169,244, 0.2)'}
];

const dsProps = ['i', 'label', 'borderColor', 'bgColor', 'fill'];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartTitle: '',
      chartType: 'Line',
      axisLabels: {
        xlabel: '',
        ylabel: ''
      },
      tableData: {
        cols: [],
        rows: []
      },
      labels: '',
      numDatasets: 0,
      chartData: {},
      chartOpts: {},
      showChart: false,
      showTableHint: 0,
      showChartHint: 0,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleChangeRow = this.handleChangeRow.bind(this);
    this.handleChangeRowData = this.handleChangeRowData.bind(this);
    this.importData = this.importData.bind(this);
    this.createChart = this.createChart.bind(this);
    this.handleChartOpts = this.handleChartOpts.bind(this);
  }

  handleChartOpts(chartType) {
    let defaultOpts = {
      title: {
        display: true,
        text: this.state.chartTitle
      },
      responsive: true
    };

    const opts = Object.assign({}, this.state.chartOpts, defaultOpts);

    if (chartType === 'Line' || chartType === 'Bar' || chartType === 'HorizontalBar') {
      Object.assign(opts, {
        scales: {
          yAxes: [{
            scaleLabel: {
              display: true,
              labelString: this.state.axisLabels.ylabel
            }
          }],
          xAxes: [{
            scaleLabel: {
              display: true,
              labelString: this.state.axisLabels.xlabel
            }
          }]
        }
      });
    }

    if (chartType === 'Radar') {
      if (opts.scales) delete opts.scales;
    }
    return opts;
  }

  handleInputChange(name, val) {
    if (name === 'chartType') {
      const labels = this.state.axisLabels;
      Object.assign(labels, {
        xlabel: val === 'HorizontalBar' ? this.state.axisLabels.ylabel :
                (this.state.chartType === 'HorizontalBar' ? this.state.axisLabels.ylabel :
                this.state.axisLabels.xlabel),
        ylabel: val === 'HorizontalBar' ? this.state.axisLabels.xlabel :
                (this.state.chartType === 'HorizontalBar' ? this.state.axisLabels.xlabel :
                this.state.axisLabels.ylabel)
      });

      const opts = this.handleChartOpts(val);

      this.setState({
        [name]: val,
        axisLabels: labels,
        chartOpts: opts
      });
    } else if (name === 'axisLabels') {
      this.setState({
        [name]: Object.assign(this.state.axisLabels, val)
      });
    } else {
      this.setState({
        [name]: val
      });
    }
  }

  importData(dat) {
    const cols = dat[0];
    cols.unshift('i');
    const rows = dat.slice(1, dat.length);
    const rowsData = [];
    for (var i = 0; i < rows.length; i += 1) {
      const row = rows[i];
      row.unshift('i');
      let rowData = Object.assign({}, {
        i: i,
        label: i.toString(),
        borderColor: colors[i].borderColor,
        bgColor: colors[i].bgColor,
        fill: this.state.chartType === 'Line' ? false : true
      });
      for (var j = 1; j < cols.length; j += 1) {
        Object.assign(rowData, {[cols[j]]: parseInt(row[j], 10)});
      }
      rowsData.push(rowData);
    }

    this.setState({
      tableData: {
        cols: cols,
        rows: rowsData
      },
      showTableHint: ++this.state.showTableHint
    });
  }

  handleChangeRow(name, rowId, dat) {
    const rows = this.state.tableData.rows;
    if (rows[rowId]) {
      if (name === 'color') {
        Object.assign(rows[rowId], {
          borderColor: dat.borderColor,
          bgColor: dat.bgColor
        });
      } else if (name === 'fill') {
        Object.assign(rows[rowId], {
          fill: dat
        });
      } else if (name === 'label') {
        Object.assign(rows[rowId], {
          label: dat
        });
      }

      this.setState({
        tableData: {
          cols: this.state.tableData.cols,
          rows: rows
        }
      });
    }
  }

  handleChangeRowData(row) {
    const rows = this.state.tableData.rows;
    const cols = this.state.tableData.cols;
    if (rows[row.i]) {
      for (var i = 1; i < cols.length; i += 1) {
        Object.assign(rows[row.i], {[cols[i]]: parseInt(row[cols[i]], 10)});
      }

      this.setState({
        tableData: {
          cols: cols,
          rows: rows
        }
      });
    }
  }

  createChart() {
    const datasets = [];
    this.state.tableData.rows.forEach(r => {
      const dat = [];
      if (r) {
        Object.keys(r).filter(k => dsProps.indexOf(k) < 0).forEach(k => dat.push(r[k]));
        datasets.push({label: r.label, fill: r.fill, borderColor: r.borderColor, backgroundColor: r.bgColor, data: dat});
      }
    });

    const dat = {
      labels: this.state.tableData.cols.filter(c => c !== 'i'),
      datasets: datasets
    };
    const opts = this.handleChartOpts(this.state.chartType);

    this.setState({
      showChart: true,
      chartData: dat,
      chartOpts: opts,
      showChartHint: ++this.state.showChartHint
    });
  }

  render() {
    let chart;
    if (this.state.showChart) {
      if (this.state.chartType === 'Line') chart = <Line data={this.state.chartData} options={this.state.chartOpts} width={chartWidth} height={chartHeight}/>
      if (this.state.chartType === 'Bar') chart = <Bar data={this.state.chartData} options={this.state.chartOpts} width={chartWidth} height={chartHeight}/>
      if (this.state.chartType === 'HorizontalBar') chart = <HorizontalBar data={this.state.chartData} options={this.state.chartOpts} width={chartWidth} height={chartHeight}/>
      if (this.state.chartType === 'Radar') chart = <Radar data={this.state.chartData} options={this.state.chartOpts} width={chartWidth} height={chartHeight}/>
    }

    if (this.state.showTableHint === 1) {
      toast("You can freely resize your table by dragging the right side of it!", {
        onClose: () => this.setState({showTableHint: ++this.state.showTableHint})
      });
    }

    if (this.state.showChartHint === 1) {
      toast("You can freely drag and resize your chart!", {
        onClose: () => this.setState({showChartHint: ++this.state.showChartHint})
      });
    }

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <img src={titleLogo} className="App-title" alt="logo2" />
        </header>

        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeButton={false}
          pauseOnHover={false}
          closeOnClick
        />

        <ChartType
          name="chartType"
          chartType={this.state.chartType}
          onChange={this.handleInputChange}
        />

        <ChartTitle name="chartTitle" onChange={this.handleInputChange}/>

        {(this.state.chartType === 'Line' ||
          this.state.chartType === 'Bar' ||
          this.state.chartType === 'HorizontalBar') ?
            <AxisLabels
              name="axisLabels"
              xlabel={this.state.axisLabels.xlabel}
              ylabel={this.state.axisLabels.ylabel}
              onChange={this.handleInputChange}
            /> : null
        }

        <Actions onImportData={this.importData} onCreate={this.createChart} />

        <div className="container">
          <Rnd
            disableDragging={true}
            default={{
              x: 20,
              y: 0,
              width: 800,
              height: 400
            }}
          >
          {
            this.state.tableData.cols.length > 0 ?
            (<div className="tableDiv">
              <DataTable
                chartType={this.state.chartType}
                cols={this.state.tableData.cols}
                rows={this.state.tableData.rows}
                onChangeRow={this.handleChangeRow}
                onChangeRowData={this.handleChangeRowData}
              />
            </div>) :
            null
          }
          </Rnd>
          <Rnd
            default={{
              x: 860,
              y: 0,
              width: 800,
              height: 400
            }}
          >
          {
            this.state.showChart ?
            (<div id="cht" className="chartDiv">
              {chart}
            </div>) :
            null
          }
          </Rnd>
        </div>
      </div>
    );
  }
}

export default App;
