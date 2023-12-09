const AppPagination = (props:any) => {

    return (
        <nav aria-label="Page navigation example">
            <ul className="pagination pagination-sm ">
                {props.children}
            </ul>
        </nav>
    )
}
export default AppPagination;