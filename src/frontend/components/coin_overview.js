import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ReactTable from 'react-table';

function getDisplayCell(exchange) {
  return (
    <div className={`color-${exchange}`}>
      {exchange}
    </div>
  );
}

const CoinOverview = ({ name, coins }) => {
  const coinData = coins[name];
  const columns = [
    {
      Header: 'exchange',
      accessor: 'exchange',
      Cell: row => getDisplayCell(row.value),
    },
    {
      Header: 'price',
      accessor: 'price',
    },
  ];
  return (
    <div className="coin-overview">
      <h3 className="overview-header">
        {name}
      </h3>
      <ReactTable
        data={coinData}
        columns={columns}
        showPagination={false}
        pageSize={coinData.length}
        defaultSorted={[
          {
            id: 'price',
            asc: true,
          },
        ]}
      />
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
