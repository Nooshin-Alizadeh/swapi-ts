const AppLoading = () => {

    return (
        <div className="m-auto " style={{ position: "absolute", top: "40%", left: "50%" }}>
            <div className={"spinner-grow " + Loading.textdanger} style={{ "width": "3rem", "height": "3rem" }} role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    );
}
export default AppLoading;
enum Loading {
    textdanger = "text-danger"
}