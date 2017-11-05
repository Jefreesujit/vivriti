'use strict';

import React from 'react';
import axios from 'axios';
import csvData from '../data/data.csv';

class Assignment1 extends React.Component {
  constructor () {
    super();
  }

 // to get the file from api request, currently hardcoded to fetch from .csv file.
  componentDidMount () {
    // axios.get('/data/psl-classification')
    //   .then((response) => {
    //     this.getContent(response.data);
    //   })
    //   .catch((err) => {
    //     console.log('failed to fetch data', err);
    //   });
  }

  getContent (data) {
    let flags = {}, // logic to filter out duplicate entries
        newData = data.filter((record) => {
        if (flags[record.LoanPurpose] && flags[record.IndustryType]) {
            return false;
        } else {
          flags[record.LoanPurpose] = true;
          flags[record.IndustryType] = true;
          return true;
        }
    });

    return newData.map((record, index) => {
      return (
        <tr key={`row-${index+1}`}>
          <td className="data">{record.LoanPurpose}</td>
          <td className="data">{record.IndustryType}</td>
        </tr>
      );
    });
  }

  render () {
    return (
      <div className="assignment-1">
        <div className="description">
          Select the PSL classification of the given industry type, loan purpose attributes
        </div>
        <div className="container">
          <div className="main-section">
            <div className="table-container" id="tableContainer">
              <table>
                <thead className="table-header">
                  <tr>
                    <th className="title">Loan Purpose</th>
                    <th className="title">Industry Type</th>
                  </tr>
                </thead>
                <tbody className="table-content" id="tableContent">
                  {this.getContent(csvData)}
                </tbody>
              </table>
            </div>
            <div id="inputContent" className="input-container">
              <div className="row input-form">
                <div className="form-header">PSL</div>
                <form className="col s12 form1" action="" name="form1" id="form1">
                  <input className="input-box" type="text" id="input-id-1" required placeholder="MSME" />
                  <input className="input-box" type="text" id="input-id-2" placeholder="AGRI" />
                  <input className="input-box" type="text" id="input-id-3" placeholder="MSME" />
                  <input className="input-box" type="text" id="input-id-4" placeholder="MSME" />
                </form>
              </div>
            </div>
          </div>
          <div className="row action-section">
            <button id="continue_btn" className="primary-btn">Continue</button>
            <button id="back_btn" className="primary-btn">Back</button>
            <button id="abort_btn" className="primary-btn">Abort</button>
          </div>
        </div>
      </div>
    );
  }
}

Assignment1.displayName = 'Assignment1';

export default Assignment1;
