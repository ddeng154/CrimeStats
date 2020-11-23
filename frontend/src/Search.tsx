import React from "react";
import { InstantSearch, SearchBox } from "react-instantsearch-dom";
import { Hits, Highlight, Index } from "react-instantsearch-dom";
import algoliasearch from "algoliasearch";
import { IDParams } from "./common";
import "./Search.css";
import Table from "react-bootstrap/Table";

const client = algoliasearch("LSQOXVD3TV", "dfd1f2e4060fa24f93d82149ca0920f0");
const policeFields = ['ORI', 'Name', 'Population', 'No. Male Officers', 
  'No. Female Officers', 'No. Civilians', 'Department Type', 'Division Name', 'Region Name', 'Density per 1000']
function headerColsPolice() {
  return policeFields.map(policeField => (
  <th>
    {policeField}
  </th>
  ));
}

const crimeFields = ['ORI', 'Type', 'No. White Offenders', 'No. Black Offenders', 'No. Pacific Offenders', 'No. Native Offenders', 'No. Asian Offenders',
'No. White Victims', 'No. Black Victims', 'No. Pacific Victims', 'No. Native Victims', 'No. Asian Victims']
function headerColsCrime() {
  return crimeFields.map(crimeField => (
  <th>
    {crimeField}
  </th>
  ));
}
{/* <td>{HitCr("o_white")}</td>
                    <td>{HitCr("o_black")}</td>
                    <td>{HitCr("o_pacific")}</td>
                    <td>{HitCr("o_native")}</td>
                    <td>{HitCr("o_asian")}</td>
                    <td>{HitCr("v_white")}</td>
                    <td>{HitCr("v_black")}</td>
                    <td>{HitCr("v_pacific")}</td>
                    <td>{HitCr("v_native")}</td>
                    <td>{HitCr("v_asian")}</td> */}
const crimeVals = ['o_white', 'o_black', 'o_pacific', 'o_native', 'o_asian', 'v_white', 'v_black', 'v_pacific', 'v_native', 'v_asian']
function tableValsCrime() {
  return crimeVals.map(crimeVal => (
  <th>
    {HitCr(crimeVal)}
  </th>
  ));
}
// Search page
class Search extends React.Component<IDParams> {
  render() {
    return (
      
      <div className="ais-InstantSearch">
        {/* Algolia Instant search wrapper */}
        <InstantSearch indexName="dev_CRIMESTATS" searchClient={client}>
          <div className="right-panel">
            {/* Search box for queries, takes in the prop id */}
            <SearchBox defaultRefinement={this.props.id} />
            {/* Searches counties database */}
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
                    {/* Search matches displayed here */}
                    <td>
                      <Hits hitComponent={HitCo0}></Hits>
                    </td>
                    <td>{HitCo("state")}</td>
                    <td>{HitCo("median_income")}</td>
                    <td>{HitCo("total_pop")}</td>
                  </tr>
                </tbody>
              </Table>
            </Index>
            {/* Searches police department database */}
            
            <Index indexName="dev_PD">
              <h2>Police Depts</h2>
              <Table className="table">
                <thead>
                  <tr>
                    {headerColsPolice()}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{HitPo("ori")}</td>
                    <td>
                      <Hits hitComponent={HitPo0}></Hits>
                    </td>
                    <td>{HitPo("pop")}</td>
                    <td className="longer">{HitPo("num_male_officers")}</td>
                    <td className="longer">{HitPo("num_female_officers")}</td>
                    <td className="longer">{HitPo("num_civilians")}</td>
                    <td className="longer">{HitPo("dept_type")}</td>
                    <td>{HitPo("div_name")}</td>
                    <td>{HitPo("reg_name")}</td>
                    <td className="longer">{HitPo("density_per_1000")}</td>
                  </tr>
                </tbody>
              </Table>
            </Index>
            {/* Searches crimes database */}
            <Index indexName="dev_CRIMES">
              <h2>Crimes</h2>
              <Table className="table">
                <thead>
                  <tr>
                    {headerColsCrime()}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{HitCr("ori")}</td>
                    <td className="shorter">
                      <Hits hitComponent={HitCr0}></Hits>
                    </td>
                    {tableValsCrime()}
                  </tr>
                </tbody>
              </Table>
            </Index>
          </div>
        </InstantSearch>
      </div>
    );
  }
}

// Functions that highlights and passes in attribute to find
function HitCo(attribute: string) {
  const Hit = ({ hit }: any) => <Highlight hit={hit} attribute={attribute} />;
  return <Hits hitComponent={Hit} />;
}

function HitCo0(props: any) {
  return (
    <a href={"/counties/" + props.hit.id}>
      <Highlight attribute="name" hit={props.hit} />
    </a>
  );
}

function HitPo(attribute: string) {
  const Hit = ({ hit }: any) => <Highlight hit={hit} attribute={attribute} />;
  return <Hits hitComponent={Hit} />;
}

function HitPo0(props: any) {
  return (
    <a href={"/policedepartments/" + props.hit.ori}>
      <Highlight attribute="name" hit={props.hit} />
    </a>
  );
}

function HitCr(attribute: string) {
  const Hit = ({ hit }: any) => <Highlight hit={hit} attribute={attribute} />;
  return <Hits hitComponent={Hit} />;
}

function HitCr0(props: any) {
  return (
    <a href={"/crimes/" + props.hit.id}>
      <Highlight attribute="type" hit={props.hit} />
    </a>
  );
}

export default Search;
