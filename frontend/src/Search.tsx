import React from 'react';
import { InstantSearch, SearchBox, Hits, Highlight, Index } from 'react-instantsearch-dom';
import algoliasearch from 'algoliasearch'
import { IDParams } from './common';
import './Search.css'
import Table from 'react-bootstrap/Table'

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
                <Table className="table">
                  <thead>
                    <tr>
                      <th>County</th>
                      <th>State</th>
                      <th>Median Income</th>
                      <th>Total Population</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><Hits hitComponent={HitCo0}></Hits></td>
                      <td>{HitCo("state")}</td>
                      <td>{HitCo("median_income")}</td>
                      <td>{HitCo("total_pop")}</td>
                    </tr>
                  </tbody>
                </Table>
              </Index>
              <Index indexName="dev_PD">
                <h2>Police Depts</h2>
                <Table>
                  <thead>
                    <tr>
                      <th>ORI</th>
                      <th>Name</th>
                      <th>Population</th>
                      <th>No. Male Officers</th>
                      <th>No. Female Officers</th>
                      <th>No. Civilians</th>
                      <th>Department Type</th>
                      <th>Division Name</th>
                      <th>Region Name</th>
                      <th>Density per 1000</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{HitPo("ori")}</td>
                      <td><Hits hitComponent={HitPo0}></Hits></td>
                      <td>{HitPo("pop")}</td>
                      <td>{HitPo("density_per_1000")}</td>
                      <td>{HitPo("dept_type")}</td>
                      <td>{HitPo("div_name")}</td>
                      <td>{HitPo("num_civilians")}</td>
                      <td>{HitPo("num_female_officers")}</td>
                      <td>{HitPo("num_male_officers")}</td>
                      <td>{HitPo("reg_name")}</td>
                    </tr>
                  </tbody>
                </Table>
              </Index>
              <Index indexName="dev_CRIMES">
                <h2>Crimes</h2>
                <Table>
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
                    <tr>
                      <td>{HitCr("ori")}</td>
                      <td><Hits hitComponent={HitCr0}></Hits></td>
                      <td>{HitCr("o_white")}</td>
                      <td>{HitCr("o_black")}</td>
                      <td>{HitCr("o_pacific")}</td>
                      <td>{HitCr("o_native")}</td>
                      <td>{HitCr("o_asian")}</td>
                      <td>{HitCr("v_white")}</td>
                      <td>{HitCr("v_black")}</td>
                      <td>{HitCr("v_pacific")}</td>
                      <td>{HitCr("v_native")}</td>
                      <td>{HitCr("v_asian")}</td>
                    </tr>
                  </tbody>
                </Table>
              </Index>
          </div>
        </InstantSearch>
      </div>
    )
  }
}

function HitCo(attribute: string) {
  const Hit = ({ hit }: any) => <Highlight hit={hit} attribute={attribute} />;
  return <Hits hitComponent={Hit} />
}

function HitCo0(props: any) {
  return (
    <a href={"/counties/" + props.hit.id}><Highlight attribute="name" hit={props.hit} /></a>
  );
}

function HitPo(attribute: string) {
  const Hit = ({ hit }: any) => <Highlight hit={hit} attribute={attribute} />;
  return <Hits hitComponent={Hit} />
}

function HitPo0(props: any) {
  return (
    <a href={"/policedepartments/" + props.hit.id}><Highlight attribute="name" hit={props.hit} /></a>
  );
}

function HitCr(attribute: string) {
  const Hit = ({ hit }: any) => <Highlight hit={hit} attribute={attribute} />;
  return <Hits hitComponent={Hit} />
}

function HitCr0(props: any) {
  return (
    <a href={"/crimes/" + props.hit.id}><Highlight attribute="type" hit={props.hit} /></a>
  );
}

export default Search;