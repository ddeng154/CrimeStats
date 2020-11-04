import React from 'react';
import { InstantSearch, SearchBox, Hits, Highlight, Index } from 'react-instantsearch-dom';
import algoliasearch from 'algoliasearch'
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
            <div className="column">
              <Index indexName="dev_CRIMESTATS">
                <table>
                  <th>Counties</th>        
                  <td><Hits hitComponent={HitCo} /> </td>
                </table>
              </Index>
            </div>
            <div className="column">
              <Index indexName="dev_PD">
                <h2>Police Depts</h2>
                <Hits hitComponent={HitPo} />
              </Index>
            </div>
            <div className="column">
              <Index indexName="dev_CRIMES">
                <h2>Crimes</h2>
                <Hits hitComponent={HitCr} />
              </Index>
            </div>
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
      <div className="hit-state">
        <Highlight attribute="state" hit={props.hit} />
      </div>
      <div className="hit-median_income">
        <Highlight attribute="median_income" hit={props.hit} />
      </div>
      <div className="hit-total_pop">
        <Highlight attribute="total_pop" hit={props.hit} />
      </div>
      
      <table>
        <tr>
          <td><Highlight attribute="state" hit={props.hit.state} /></td>
        </tr>
      </table>
    </div>
  );
}

function HitPo(props: any) {
  return (
    <div>
      <div className="hit-name">
        <a href={"/policedepartments/" + props.hit.ori}><Highlight attribute="name" hit={props.hit} /></a>
      </div>
      <div className="hit-ori">
        <Highlight attribute="ori" hit={props.hit} />
      </div>
      <div className="hit-pop">
        <Highlight attribute="pop" hit={props.hit} />
      </div>
      <div className="hit-density_per_1000">
        <Highlight attribute="density_per_1000" hit={props.hit} />
      </div>
      <div className="hit-dept_type">
        <Highlight attribute="dept_type" hit={props.hit} />
      </div>
      <div className="hit-div_name">
        <Highlight attribute="div_name" hit={props.hit} />
      </div>
      <div className="hit-num_civilians">
        <Highlight attribute="num_civilians" hit={props.hit} />
      </div>
      <div className="hit-num_female_officers">
        <Highlight attribute="num_female_officers" hit={props.hit} />
      </div>
      <div className="hit-num_male_officers">
        <Highlight attribute="num_male_officers" hit={props.hit} />
      </div>
      <div className="hit-reg_name">
        <Highlight attribute="reg_name" hit={props.hit} />
      </div>
    </div>
  );
}

function HitCr(props: any) {
  return (
    <div>
      <div className="hit-name">
        <a href={"/crimes/" + props.hit.id}><Highlight attribute="type" hit={props.hit} /></a>
      </div>
      <div className="hit-ori">
        <Highlight attribute="ori" hit={props.hit} />
      </div>
      <div className="hit-type">
        <Highlight attribute="type" hit={props.hit} />
      </div>
      <div className="hit-id">
        <Highlight attribute="id" hit={props.hit} />
      </div>
      <div className="hit-o_asian">
        <Highlight attribute="o_asian" hit={props.hit} />
      </div>
      <div className="hit-o_black">
        <Highlight attribute="o_black" hit={props.hit} />
      </div>
      <div className="hit-o_native">
        <Highlight attribute="o_native" hit={props.hit} />
      </div>
      <div className="hit-o_pacific">
        <Highlight attribute="o_pacific" hit={props.hit} />
      </div>
      <div className="hit-o_white">
        <Highlight attribute="o_white" hit={props.hit} />
      </div>
      <div className="hit-v_asian">
        <Highlight attribute="v_asian" hit={props.hit} />
      </div>
      <div className="hit-v_black">
        <Highlight attribute="v_black" hit={props.hit} />
      </div>
      <div className="hit-v_native">
        <Highlight attribute="v_native" hit={props.hit} />
      </div>
      <div className="hit-v_pacific">
        <Highlight attribute="v_pacific" hit={props.hit} />
      </div>
      <div className="hit-v_white">
        <Highlight attribute="v_white" hit={props.hit} />
      </div>
    </div>
  );
}


export default Search;