'use strict';

import React from 'react';
import classnames from 'classnames';
import Panel from './panel';

class Assignment2 extends React.Component {
  constructor () {
    super();

    this.state = {
      panelCount: 0,
      invInputIsValid: false,
      priorityCount: 0,
      percentValues: {},
      priorityValues: {}
    };

    this.invInputChange = (event) => this._invInputChange(event);
    this.percentOnChange = (key, event) => this._percentOnChange(key, event);
    this.priorityValidation = () => this._priorityValidation();
  }

  _priorityValidation () {
    let priorityValues = {},
        priorityArray = [],
        id = 1;

    for (let key in this.refs) {
      priorityValues[id] = this.refs[key].getPriority();
      let array = this.refs[key].getPriority();
      array.forEach((val, index) => {
        if (val && val <= this.state.priorityCount) {
          if (priorityArray[val]) {
            console.log('duplicate value found');
            priorityValues[id][index] = '';
          } else {
            priorityArray[val] = val;
          }
        } else {
          console.log('the value(s) doesnt exist or doesnt match constraints');
          priorityValues[id][index] = '';
        }
      });
      id +=1;
    }

    this.setState({
      priorityValues
    });
  }

  calculateSum (object, sumPanel) {
    let sum = 0;
    for (let property in object) {
      if (property != sumPanel) {
        sum = sum + (parseInt(object[property]) || 0);
      }
    }

    return sum;
  }

 _percentOnChange (id, value) {
    let sum = 0,
        sumPanel = this.state.panelCount,
        percentValues = Object.assign({}, this.state.percentValues);

    percentValues[id] = (value < 100 && value > -1) ? value : '';

    sum = this.calculateSum(percentValues, sumPanel);

    if (sum > 100) {
      console.log('Invalid input values for Percent fields');
      percentValues[id] = '';
      sum = this.calculateSum(percentValues, sumPanel);
      percentValues[sumPanel] = 100 - sum;
    } else {
      percentValues[sumPanel] = 100 - sum;
    }

    this.setState({
      percentValues: percentValues
    });
  }

  getMainContent (state) {
    let content = [];

    if (state.ivstInputIsValid) {
      for (let i = 0, id = i+1; i < state.panelCount; i++, id++) { 
        content.push(
          <Panel id={id}
                 key={`panel${id}`}
                 ref={`panel${id}`}
                 percentOnChange={this.percentOnChange}
                 priorityValues={state.priorityValues[id]}
                 percentValue={state.percentValues[id]} />
        );
      }
    } else {
      content = null;
    }

    return content;
  }

  _invInputChange (event) {
    let value = parseInt(event.target.value),
        regExp = /^([1-3])$/,
        state = {};

    if(regExp.test(value)) {
      state = {
        invInputVal: value,
        panelCount: value + 1,
        priorityCount: (value + 1) * 2,
        ivstInputIsValid: true,
        percentValues: {},
        priorityValues: {}
      };
    } else {
      state = {
        invInputVal: '',
        panelCount: 0,
        priorityCount: 0,
        ivstInputIsValid: false
      };
    }

    this.setState(state);
  }

  render () {
    let actionClassName = classnames('row', 'action-section', {
      hide: !this.state.ivstInputIsValid
    });

    return (
      <div className="assignment-2">
        <div className="container">
          <div className="top-section">
            <label>Number of Investors</label>
            <input className="input-box" type="text" id="investorInput" value={this.state.invInputVal} required onChange={this.invInputChange}/>
          </div>
          <div className="main-section" id="mainSection" >
            {this.getMainContent(this.state)}
          </div>
          <div className={actionClassName} id="actionSection">
            <button id="continue_btn" onClick={this.priorityValidation} className="primary-btn">Continue</button>
            <button id="abort_btn" className="primary-btn">Abort</button>
          </div>
        </div>
      </div>
    );
  }
}

Assignment2.displayName = 'Assignment2';

export default Assignment2;
