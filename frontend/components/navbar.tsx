import Image from 'next/image'
import '../app/globals.css'

export default function NavBar() {
    return (
        <nav
            className="navbar bg-dark border-bottom border-body"
            data-bs-theme="light"
        >
            <div className="container-fluid">
                <a className="navbar-brand navbar-light navbar-text" href="#">
                    <Image
                        src="/college-svgrepo-com.svg"
                        alt="Logo"
                        width="30"
                        height="24"
                        className="d-inline-block align-text-top me-3"
                    />
                    College EZ
                </a>
                <form className="d-flex" role="search">
                    <input
                        className="form-control me-2"
                        type="login"
                        placeholder="Username"
                    />
                    <input
                        className="form-control me-2"
                        type="login"
                        placeholder="Password"
                    />
                    <button className="btn btn-outline-success" type="submit">
                        LOGIN
                    </button>
                </form>
            </div>
        </nav>
    )
}
