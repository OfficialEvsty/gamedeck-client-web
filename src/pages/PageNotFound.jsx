import React from 'react';
import {Link} from "react-router-dom";
import CatEyes from "../components/catEyes";


function PageNotFound() {
    return (

        <html>
            <body>
                <CatEyes />
                <div className="h1 bold">
                    <span className="text-frame">
                        404 PAGE NOT FOUND
                    </span>
                </div>
                <span className="h1">
                    <Link to="/">Back Home</Link>
                </span>
            </body>
        </html>
    )
}

export default PageNotFound;