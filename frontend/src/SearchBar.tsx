import React from 'react';
import { Link } from 'react-router-dom'

// Search bar on all pages
const SearchBar = ({ query, onChange} : 
    {query: string, onChange: any}) => {
    const BarStyling = {width:"20rem", background:"#F2F1F9", 
    border:"none", padding:"0.5rem"};
    return (
        <form>
            <input style={BarStyling} placeholder="Search here..." 
            value={query} onChange={onChange} />
            {/* On press, go to search page */}
            <Link to={'/search/' + query}>
                <button>Search</button>
            </Link>    
        </form>
    );
}

export default SearchBar;