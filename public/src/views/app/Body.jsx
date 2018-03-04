import React from 'react'

const Body = props => <section id="body">
    <div className="content">
        {props.children || ''}
    </div>
</section>

export default Body
