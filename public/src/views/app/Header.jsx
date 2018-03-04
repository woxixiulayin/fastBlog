import React, { Component } from 'react'
import { navList } from 'src/routes/config'
import { NavLink } from 'react-router-dom'

class Header extends Component {
    render() {
        return (
            <header
             className="text-center relative"
            >
                <nav className="nav clearfix">
                    <div className="links">
                    {navList.map(item => 
                        <NavLink
                          exact
                          key={item.label}
                          to={item.path}
                          activeStyle={{
                              color: 'black'
                          }}
                        >
                            {item.zH}
                        </NavLink>
                    )}
                    <a href="https://github.com/woxixiulayin" target="_blank">github</a>
                    </div>
                </nav>
                <h2>Jackson Liu</h2>
            </header>
        )
    }
}

export default Header
