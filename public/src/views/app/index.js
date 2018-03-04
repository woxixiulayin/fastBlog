import React from 'react'
import Header from './Header'
import Body from './Body'
import Bottom from './Bottom'

import './css/app.scss'

const App = props => <div>
    <Header />
        <Body>
            {props.children || []}
        </Body>
    <Bottom />
</div>

export default App
