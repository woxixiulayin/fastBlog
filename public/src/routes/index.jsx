import React, { Component } from 'react'
import { Route, HashRouter} from 'react-router-dom'
import App from 'src/views/app'

const Home = () => <h1>this is home</h1>

class Router extends Component {
    render() {
        return (
            <HashRouter>
                <App>
                    <Route path="/" component={Home} />
                </App>
            </HashRouter>
        )
    }
}


export default Router