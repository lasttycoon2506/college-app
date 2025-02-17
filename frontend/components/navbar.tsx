import Image from 'next/image'

export default function NavBar() {
    return (
        <nav className="navbar bg-body-tertiary">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">
                    <Image
                        src="/college-svgrepo-com.svg"
                        alt="Logo"
                        width="30"
                        height="24"
                        className="d-inline-block align-text-top"
                    />
                    Bootstrap
                </a>
            </div>
        </nav>
    )
}
