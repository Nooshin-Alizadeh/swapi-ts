import { useDispatch, useSelector } from "react-redux";
import AppAlert from "../Framework/App-Alert";
import AppModal from "../Framework/App-Modal";
import { modalAction } from "../Store/modalManager";
import { useEffect } from "react";
import { alertAction } from "../Store/alertManager";
import AppLoading from "../Framework/App-Loading";

const AppConditional = () => {
  const value: any = useSelector((state) => {
    return state;
  });
  let haveLoading = false;
  //value.loading.loading.loadin

  if (value?.loading?.loadin) {
    for (const key in value?.loading?.loadin) {
      haveLoading = haveLoading || value?.loading?.loadin[key];
    }
  }
  const dispatch = useDispatch();
  useEffect(() => {
    const timer = setTimeout(() => {
      if (value?.alert?.config) {
        dispatch(
          alertAction.alertConfig({
            config: null,
          })
        );
      }
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value?.alert?.config]);

  const setModalShow = () => {
    dispatch(modalAction.modalConfig({ config: null }));
  };
  return <>
    {haveLoading && <AppLoading />}
    {value?.modal?.config && (
      <AppModal
        onHide={() => setModalShow()}
        config={value?.modal?.config}
      ></AppModal>
    )}
    {value?.alert?.config && (
      <AppAlert
        config={value?.alert?.config}
      ></AppAlert>
    )}
  </>;
}
export default AppConditional;