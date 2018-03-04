import React, { Component } from 'react'
import { Route, HashRouter, Redirect, Switch } from 'react-router-dom'
import navConfig from './config'
import App from 'src/views/App'

const Home = () => <h1>this is home</h1>
const navs = Object.values(navConfig)

class Router extends Component {
    render() {
        return (
            <HashRouter>
                <App>
                    {/* 保证只有一个路由被匹配到 */}
                    <Switch>
                        {
                            navs.map(navItem => <Route
                                exact
                                key={navItem.label}
                                path={navItem.path}
                                component={navItem.component} />)
                        }
                        <Redirect to={navConfig.posts.path} />
                    </Switch>
                </App>
            </HashRouter>
        )
    }
}


export default Router