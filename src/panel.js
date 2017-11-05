'use strict';

import React from 'react';

class Assignment2 extends React.Component {
  constructor () {
    super();

    this.state = {
      yieldValue: ''
    };

    this.yieldOnChange = (event) => this._yieldOnChange(event);
    this.percentOnChange = (key, event) => this._percentOnChange(key, event);
    this.interestHandler = (event) => this._priorityOnChange(event, 'interest');
    this.principalHandler = (event) => this._priorityOnChange(event, 'principal');
  }

  componentWillReceiveProps (nextProps) {
    if(nextProps.priorityValues) {
      this.setState({
        interest: nextProps.priorityValues[0],
        principal: nextProps.priorityValues[1]
      });
    }
  }

  _yieldOnChange (event) {
    let value = parseInt(event.target.value) || 0,
        yieldValue = this.state.yieldValue;

    if (value > -1 && value < 100) {
      yieldValue = value;
    } else {
      yieldValue = '';
    }

    this.setState({
      yieldValue: yieldValue
    });
  }

  _priorityOnChange (event, type) {
    let state = {},
        value = parseInt(event.target.value) || 0;

    state[type] = value;
    this.setState(state);
  }

  getPriority () {
    return [this.state.interest, this.state.principal];
  }

  _percentOnChange (event) {
    this.props.percentOnChange(this.props.id, event.target.value);
  }

  render () {
    let id = this.props.id;

    return (
      <div id={`panelBox${id}`} key={`panelBox${id}`} className="panel-container">
        <div className="row input-form">
          <div className="form-header">{`A${id}`}</div>
          <form className={`col s12 form${id}`} action="" name={`form${id}`} id={`form${id}`}>
            <div className="input-field">
              <label>Percent</label>
              <input className="input-box percent" type="number" value={this.props.percentValue} onChange={this.percentOnChange}/>
            </div>
            <div className="input-field">
              <label>Yield</label>
              <input className="input-box yield" type="number" value={this.state.yieldValue} onChange={this.yieldOnChange}/>
            </div>
            <div className="input-field">
              <label>Interest Priority</label>
              <input className="input-box priority" type="number" value={this.state.interest} onChange={this.interestHandler} id={`interestId${id}`} />
            </div>
            <div className="input-field">
              <label>Principal Priority</label>
              <input className="input-box priority" type="number" value={this.state.principal} onChange={this.principalHandler} id={`principalId${id}`} />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

Assignment2.displayName = 'Assignment2';

export default Assignment2;