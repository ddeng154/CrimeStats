import React from 'react';
import { InstantSearch, SearchBox, Hits } from 'react-instantsearch-dom';
import algoliasearch from 'algoliasearch'

const client = algoliasearch('ICWNC13X5J', '4c22be32a809130f195c1d42981c39d8');
const players = client.initIndex('players');
const teams = client.initIndex('teams');

function Search() {
    return (
        <div className="ais-InstantSearch">
        <h1>React InstantSearch e-commerce demo</h1>
        <InstantSearch indexName="demo_ecommerce" searchClient={client}>
          <div className="right-panel">
            <SearchBox />
          </div>
        </InstantSearch>
      </div>
    )
}



export default Search;