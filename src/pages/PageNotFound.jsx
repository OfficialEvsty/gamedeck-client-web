import React from 'react';
import {Link} from "react-router-dom";
import CatEyes from "../components/catEyes";


function PageNotFound() {
    return (

        <html>
            <body>
                <CatEyes />
            404 Page not found.
            <span>
                <Link to="/">Back Home</Link>
            </span>
            </body>
        </html>
    )
}

export default PageNotFound;