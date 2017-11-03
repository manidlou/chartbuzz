import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';
import EditorChart from 'material-ui/svg-icons/editor/show-chart';
// import ContentAdd from 'material-ui/svg-icons/content/add';
import UploadIcon from 'material-ui/svg-icons/file/file-upload';
import DownloadIcon from 'material-ui/svg-icons/file/file-download';
import * as XLSX from 'xlsx';
import html2canvas from 'html2canvas';
import ReactTooltip from 'react-tooltip';

const style = {
  btn: {
    margin: 12
  }
};

/* list of supported file types */
const fileTypes = [
	"xlsx", "xlsb", "xlsm", "xls", "xml", "csv", "txt", "ods", "fods", "uos",
  "sylk", "dif", "dbf", "prn", "qpw", "123", "wb*", "wq*", "html", "htm"
];
const SheetJSFT = fileTypes.map(function(x) { return "." + x; }).join(",");

class Actions extends Component {
  constructor(props) {
    super(props);
    this.inpf = null;
    this.handleImportData = this.handleImportData.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
    this.handleInputClick = this.handleInputClick.bind(this);
  }

  handleImportData(e) {
    const f = e.target.files[0];
    const reader = new FileReader();
		reader.onload = (e) => {
			const bstr = e.target.result;
			const wb = XLSX.read(bstr, {type:'binary'});
			const wsname = wb.SheetNames[0];
			const ws = wb.Sheets[wsname];
			const data = XLSX.utils.sheet_to_json(ws, {header:1});
      this.props.onImportData(data);
		};
    if (f) reader.readAsBinaryString(f);
  }

  handleCreate() {
    this.props.onCreate();
  }

  handleInputClick() {
    this.inpf.click();
  }

  handleSaveChart() {
    html2canvas(document.getElementById("cht"), {
      onrendered: function (canvas) {
        const myImage = canvas.toDataURL("image/png");
        const link = document.createElement("a");

        link.download = 'chartbuzz.png';
        link.href = myImage;
        document.body.appendChild(link);
        link.click();
      }
    });
  }

  render() {
    return (
      <div className="container">
        <div>
          <RaisedButton
            containerElement="label"
            label="import data from file.."
            name="import"
            data-tip
            data-for="import"
            primary={true}
            style={style.btn}
            icon={<UploadIcon />}
            onClick={this.handleInputClick}
            />
          <input
            ref={rf => this.inpf = rf}
            accept={SheetJSFT}
            onChange={this.handleImportData}
            style={{display: 'none'}}
            type="file"
          />
        </div>

        <ReactTooltip id="import" type="error">
        <span>supported file types:</span>
          <div className="container">
            <ul>
              <li>xlsx</li>
              <li>xlsb</li>
              <li>xlsm</li>
              <li>xls</li>
              <li>xml</li>
            </ul>
            <ul>
              <li>csv</li>
              <li>txt</li>
              <li>ods</li>
              <li>fods</li>
              <li>html</li>
            </ul>
          </div>
        </ReactTooltip>

        <div>
        <RaisedButton
          label="create"
          name="create"
          primary={true}
          style={style.btn}
          icon={<EditorChart />}
          onClick={this.handleCreate}
        />
        </div>

        <div>
          <RaisedButton
            containerElement="label"
            label="save chart as image.."
            name="save"
            primary={true}
            style={style.btn}
            icon={<DownloadIcon />}
            onClick={this.handleSaveChart}
            />
        </div>
      </div>
    );
  }
}

Actions.propTypes = {
  onImportData: PropTypes.func.isRequired,
  onCreate: PropTypes.func.isRequired
};

export default Actions;
