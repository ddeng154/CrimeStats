import React from 'react';
import { InstantSearch, SearchBox, Hits, Highlight, Index } from 'react-instantsearch-dom';
import algoliasearch from 'algoliasearch';
import { IDParams } from './common';
import './Search.css'

const client = algoliasearch('ICWNC13X5J', '4c22be32a809130f195c1d42981c39d8');
class Search extends React.Component<IDParams> {
  render() {
    return (
      <div className="ais-InstantSearch">
        <InstantSearch indexName="dev_CRIMESTATS" searchClient={client}>
          <div className="right-panel">
            <SearchBox defaultRefinement={this.props.id}/>
            <Index indexName="dev_CRIMESTATS">
              <h2>Counties</h2>
              <Hits hitComponent={HitCo} />
            </Index>

            <Index indexName="dev_PD">
              <h2>Police Depts</h2>
              <Hits hitComponent={HitPo} />
            </Index>

            <Index indexName="dev_CRIMES">
              <h2>Crimes</h2>
              <Hits hitComponent={HitCr} />
            </Index>
            
          </div>
        </InstantSearch>
      </div>
    )
  }
}

function HitCo(props: any) {
  return (
    <div>
      <div className="hit-name">
        <a href={"/counties/" + props.hit.id}><Highlight attribute="name" hit={props.hit} /></a>
      </div>
      <div className="state">{props.hit.state}</div>
    </div>
  );
}

function HitPo(props: any) {
  return (
    <div>
      <div className="hit-name">
        <a href={"/policedepartments/" + props.hit.ori}><Highlight attribute="name" hit={props.hit} /></a>
      </div>
      <div className="ori">{props.hit.ori}</div>
    </div>
  );
}

function HitCr(props: any) {
  return (
    <div>
      <div className="hit-type">
      <a href={"/crimes/" + props.hit.id}><Highlight attribute="type" hit={props.hit} /></a>
      </div>
      <div className="ori">{props.hit.ori}</div>
    </div>
  );
}


export default Search;