const AppDropdown = (props: any) => {
    return (
        <div className="btn-group dropend">
            <button className="btn btn-secondary btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                 ...
            </button>
            <ul className="dropdown-menu">
                {props.children}
            </ul>
        </div>
    );
}
export default AppDropdown;