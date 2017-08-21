import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const CoinOverview = ({ name, coins }) => {
  const coinData = coins[name];
  return (
    <div>
      {name}: {JSON.stringify(coinData)}
    </div>
  );
};

CoinOverview.propTypes = {
  name: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  coins: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    coins: state.coins,
  };
}

export default connect(mapStateToProps)(CoinOverview);
