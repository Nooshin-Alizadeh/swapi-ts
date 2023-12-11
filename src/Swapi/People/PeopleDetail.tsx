/* eslint-disable eqeqeq */
// import { Badge, Button, Form } from "react-bootstrap";
// import Framework from "../../../Framework/Framework";
import { useDispatch } from "react-redux";
// import { modalAction } from "../../../Store/modalManager";
// import DataService from "../../../Framework/DataService";
// import { loadingAction } from "../../../Store/loadingManager";
import { UUID } from "crypto";
import DetailGenerate from "../DetailGenerate";
import UtilityHelper from "../../Frontend/Framework/AppUtility";
import DataService from "../../Frontend/Framework/DataService";
import { loadingAction } from "../../Frontend/Store/loadingManager";
import { modalAction } from "../../Frontend/Store/modalManager";
import { useParams } from "react-router-dom";
import { useState } from "react";
// import Films from "../Films/Films";
// import Species from "../Species/Species";
// import Starships from "../Starships/Starships";
// import Vehicles from "../Vehicles/vehicles";
import { useEffect } from "react";

const loadingId = UtilityHelper.generate_uuidv4();

const PeopleDetail = (props: { created: string | number | Date; edited: string | number | Date; name: any; gender: any; films: string | any[]; species: string | any[]; starships: string | any[]; vehicles: string | any[]; }) => {
  const dispatch = useDispatch();
  let params = useParams();
  const created = new Date(props.created);
  const edited = new Date(props.edited);
  const [body, setBody] = useState();

  let dataService = new DataService(dispatch, loadingId);
  useEffect(() => {
    console.info('peopledetail effect')
    if (params && params.id) {
      dataService.Get(`people/${params.id}`).then((dval) => {
        setBody(dval)
      });
    }

    return () => {
    }
  }, []);

  const detailBody = (
    <>
      <DetailGenerate detailObject={body}></DetailGenerate>
    </>
  );
  return detailBody;
};
export default PeopleDetail;
const OnClickList = (props: any, dataService: any, dispatch: any, loadingId: UUID | string, name: any, component: any) => {
  props.onHide();
  dataService
    .GetMulti(props[component.name.toLowerCase()])
    .then((result: any) => {
      dispatch(
        loadingAction.isLoading({
          valueState: false,
          id: loadingId,
        })
      );
      let gridDataValue = [];
      for (const rs of result) {
        gridDataValue.push(rs.data);
      }
      dispatch(
        modalAction.modalConfig({
          config: {
            title: props.name + " " + name,
            body: component,
            bodyDetail: { ...props, gridDataValue },
          },
        })
      );
      //gridDataValue
      //return <Grid config={gridconfig} key={"people"}></Grid>;
    })
    .catch((er: any) => {
      console.info(er);
    });
}