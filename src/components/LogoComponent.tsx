import { FC } from 'react'
import Logo from '../assets/icon/Logo'

export const LogoComponent: FC = () => {
	return(
        <>
        <Logo/>
        <div>
        <h1 className='logo-title'>Admin</h1>
        <span className='logo-text'>ecommers</span>
        </div>
        </>
    )
}