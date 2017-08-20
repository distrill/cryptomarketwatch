import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { tickerUpdate } from './../../socket/client';
import * as actions from './../actions';
import CoinOverview from './coin_overview';

class CompareExchanges extends Component {
  constructor(props) {
    super(props);
    tickerUpdate(props.actions.updateCoinData);
  }

  render() {
    const { coins } = this.props;
    return (
      <div>
        {coins && Object.keys(coins).map(coin => <CoinOverview name={coin} />)}
      </div>
    );
  }
}

CompareExchanges.propTypes = {
  actions: PropTypes.objectOf(PropTypes.func).isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  coins: PropTypes.object.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}

function mapStateToProps(state) {
  return {
    coins: state.coins,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CompareExchanges);
