import React from 'react'
import { NavLink } from 'react-router-dom'

export const Nav = () => {
    const links = [{ path: 'maps', label: 'Maps' }, { path: 'jeeTreemap', label: 'JEE Treemap' },{ path: 'tables', label: 'Tables' },{ path: 'sankey', label: 'Sankey' }]
    return (
        <ul>{links.map(link => <button>
            <NavLink to={link.path}>{link.label}</NavLink>
        </button>)}</ul>
    )
}
