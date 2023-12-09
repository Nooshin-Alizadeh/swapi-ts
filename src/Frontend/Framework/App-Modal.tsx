import { Fragment } from "react";

const AppModal = (props: { config: any;  onHide: any; size?: any; }) => {
  let modalConfig = {
    hasHeader: true,
    hasBody: true,
    hasFooter: true,
  };
  const config = { ...props.config };
  const propsData = {
    onHide: props.onHide,
  };

  const modalBase = (
    <div className="modal">
      <div className={"modal-dialog " + (props.size || "modal-lg")}>
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{config.title}</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            {config.body({ ...config.bodyDetail, onHide: props.onHide })}
          </div>
          <div className="modal-footer">
            {config.footer}
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button type="button" className="btn btn-primary">
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
  return modalBase;
};
export default AppModal;
