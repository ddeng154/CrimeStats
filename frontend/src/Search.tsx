import React from 'react';
import { InstantSearch, SearchBox, Hits, Highlight, Index } from 'react-instantsearch-dom';
import algoliasearch from 'algoliasearch'
import { IDParams } from './common';
import './Search.css'
import Table from 'react-bootstrap/table'
import Crime from './Crime';

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
                <Table striped hover>
                  <thead>
                    <tr>
                      <th>ORI</th>
                      <th>Type</th>
                      <th>No. White Offenders</th>
                      <th>No. Black Offenders</th>
                      <th>No. Pacific Offenders</th>
                      <th>No. Native Offenders</th>
                      <th>No. Asian Offenders</th>
                      <th>No. White Victims</th>
                      <th>No. Black Victims</th>
                      <th>No. Pacific Victims</th>
                      <th>No. Native Victims</th>
                      <th>No. Asian Victims</th>
                    </tr>
                  </thead>
                  <tbody>
                    <Hits hitComponent={HitCr} />
                  </tbody>
                </Table>
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

      <tr key={props.hit}>
        <td><a href={"/crimes/" + props.hit.id}><Highlight attribute="type" hit={props.hit} /></a></td>
        <td> <Highlight attribute="o_white" hit={props.hit} />  </td>
        <td> <Highlight attribute="o_black" hit={props.hit} /> </td>
        <td> <Highlight attribute="o_pacific" hit={props.hit} /> </td>
        <td> <Highlight attribute="o_native" hit={props.hit} /> </td>
        <td> <Highlight attribute="o_asian" hit={props.hit} /> </td>
        <td> <Highlight attribute="v_white" hit={props.hit} /> </td>
        <td> <Highlight attribute="v_black" hit={props.hit} /> </td>
        <td> <Highlight attribute="v_pacific" hit={props.hit} /> </td>
        <td> <Highlight attribute="v_native" hit={props.hit} /> </td>
        <td> <Highlight attribute="v_asian" hit={props.hit} /> </td>
      </tr>  

  );
}


export default Search;