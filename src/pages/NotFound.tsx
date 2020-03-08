import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

function NotFound():JSX.Element {
    return (
        <Fragment>
            <h1>404 Page Not Found</h1>
            <Link to="/">Go to homepage</Link>
        </Fragment>
    )
}

export default NotFound
