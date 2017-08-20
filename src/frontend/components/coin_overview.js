import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const CoinOverview = ({ name }) => {
  return (
    <div>
      {name}
    </div>
  );
};

CoinOverview.propTypes = {
  name: PropTypes.string.isRequired,
};

export default connect(null, null)(CoinOverview);
