import React from 'react';
import { Link } from 'react-router-dom'

const SearchBar = ({ query, onChange, onSubmit} : {query: string, onChange: any, onSubmit: any}) => {
    const BarStyling = {width:"20rem", background:"#F2F1F9", border:"none", padding:"0.5rem"};
    return (
        <form onSubmit = {onSubmit}>
            <input style={BarStyling} placeholder="Search here..." value={query} onChange={onChange} />
            <Link to={'/search/' + query}>
                <button>Search</button>
            </Link>    
        </form>
    );
}

export default SearchBar;