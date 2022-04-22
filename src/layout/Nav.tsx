import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

const NavLinkButtonContainer = styled.button`
    a {
        text-decoration: none;
        &.active {
            font-weight: bold;
        }
    }
`

function NavLinkButton(props: any) {
    return (
        <NavLinkButtonContainer>
            <NavLink to={props.link.path}>{props.link.label}</NavLink>
        </NavLinkButtonContainer>
    )
}

export const Nav = () => {
    const links = [
        { path: 'maps', label: 'Maps' },
        { path: 'jeeTreemap', label: 'JEE Treemap' },
        { path: 'tables', label: 'Tables' },
        { path: 'sankey', label: 'Sankey' },
    ]
    return (
        <ul>
            {links.map((link) => (
                <NavLinkButton link={link}></NavLinkButton>
            ))}
        </ul>
    )
}
