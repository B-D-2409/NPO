function Footer() {
    return (
        <footer className="bg-gray-800 text-white py-4 text-center">
        <p className="text-sm">
            &copy; {new Date().getFullYear()} NPO Project. All rights reserved.
        </p>
        <p className="text-xs">
            Made with ❤️ by the NPO Project Team
        </p>
        </footer>
    );
}

export default Footer;