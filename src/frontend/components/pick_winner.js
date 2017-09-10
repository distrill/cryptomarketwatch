import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { update } from './../../socket/client';
import { socket } from './../../../config';
import * as actions from './../actions';

const { UPDATE_WINNER_EVENT } = socket;

class PickWinner extends Component {
  constructor(props) {
    super(props);
    update(UPDATE_WINNER_EVENT, props.actions.updateWinner);
  }

  render() {
    const winner = this.props.winner.toLowerCase();
    return (
      <div className="pick-winner">
        {'polo hype money winner: '}
        <a
          target="_blank"
          href={`http://poloniex.com/exchange#btc_${winner}`}
        >
          {winner}
        </a>
      </div>
    );
  }
}

PickWinner.propTypes = {
  actions: PropTypes.objectOf(PropTypes.func).isRequired,
  winner: PropTypes.string.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}

function mapStateToProps(state) {
  return {
    winner: state.winner,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PickWinner);
