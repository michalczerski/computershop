
import './account.scss'
import Menu from './menu'

export default function Account() {
    return (
        <>
            <a href="/account" className="account-header">
                Account
                <Menu />
            </a>      
        </>
    )
}