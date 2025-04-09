const NotFound = () => {
    return (
        <div className="h-screen flex flex-col items-center justify-center bg-base-300 text-gray-900">
            <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
            <p className="mt-2 text-lg">Oops! The page you are looking for does not exist.</p>
            <a href="/" className="mt-4 px-4 py-2 btn btn-accent rounded-lg">Go to Homepage</a>
        </div>
    );
}

export default NotFound