import React from 'react';
import { InstantSearch, SearchBox, Hits } from 'react-instantsearch-dom';
import algoliasearch from 'algoliasearch'
import './Search.css'

const client = algoliasearch('ICWNC13X5J', '4c22be32a809130f195c1d42981c39d8');
function Search() {
    return (
      <div className="ais-InstantSearch">
        <InstantSearch indexName="dev_CRIMESTATS" searchClient={client}>
          <div className="right-panel">
            <SearchBox />
            <Hits/>
          </div>
        </InstantSearch>
      </div>
    )
}



export default Search;