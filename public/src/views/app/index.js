import React from 'react'
import Header from './Header'
import Body from './Body'
import Bottom from './Bottom'

import './css/app.scss'

const App = props => <React.Fragment>
    <Header />
        <Body>
            {props.children || []}
        </Body>
    <Bottom />
</React.Fragment>

export default App
