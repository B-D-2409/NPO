import { Link } from 'react-router-dom';

function Footer() {
    return (
        <footer className="bg-[rgb(121,182,179)]  text-black py-10 text-center">
            <p className="text-sm mb-3">
                &copy; {new Date().getFullYear()} NPO Project. All rights reserved.
            </p>
            <p className="text-xs mb-15">
                Made with ❤️ by the NPO Project Team
            </p>
            <Link 
                to="/terms" 
                className="text-sm underline hover:text-gray-300"
            >
                Общи Условия
            </Link>
        </footer>
    );
}

export default Footer;
