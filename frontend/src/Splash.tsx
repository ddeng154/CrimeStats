import React from 'react';
import SplashBanner from './SplashBanner';
import Cards from './Cards';

function Splash() {
    return (
        <div>
            <SplashBanner />
            <Cards />
            <iframe title = "map" width="600" height="450" frameBorder="0" style={{border: 0}}
src="https://www.google.com/maps/embed/v1/view?zoom=9&center=30.8039,-90.0747&key=AIzaSyC-QNudTN-ssaDXHh5h3_5dk19wxsatSRg" allowFullScreen></iframe>
        </div>
    );
}

export default Splash;