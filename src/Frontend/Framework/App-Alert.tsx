import UtilityHelper from "./AppUtility";

const AppAlert = (props: IAppAlert) => {
   const msg= props.config?.map((al: IAppAlertConfig) => {
    return (
      <div key={UtilityHelper.generate_uuidv4()} className={" alert alert-" + (al?.type || AppAlertType.primary)} role="alert">
        {al?.msg || "Something Happend."}
      </div>
    );
  });
  return (<div className="fixed-bottom">{msg}</div>);
};

export default AppAlert;
export enum AppAlertType {
  primary = "primary",
  secondary = "secondary",
  success = "success",
  danger = "danger",
  warning = "warning",
  info = "info",
  light = "light",
  dark = "dark",
};
interface IAppAlert {
  config: IAppAlertConfig[];
}
interface IAppAlertConfig {
  type: AppAlertType;
  msg: string;
}
