/* eslint-disable eqeqeq */
//import { useContext } from "react";
// import Grid from "../../../Framework/Grid";
import { useDispatch } from "react-redux";
// import { modalAction } from "../../../Store/modalManager";
import DetailView from "../OtherPages/DetailView";

import DetailGenerate from "../DetailGenerate";
import { Link } from "react-router-dom";
import DataService from "../../Frontend/Framework/DataService";
import AppGrid, { IAppGridConfig } from "../../Frontend/Framework/App-Grid";
import { modalAction } from "../../Frontend/Store/modalManager";
import AppDropdown from "../../Frontend/Framework/App-Dropdown";
import UtilityHelper from "../../Frontend/Framework/AppUtility";

//import ContextManager from "../../../contextManager/loading-context-manager";

const People = () => {
  const dispatch = useDispatch();
  const dataService = new DataService(dispatch, "peoplePage");
  //const ctxData = useContext(ContextManager);
  const gridconfig: IAppGridConfig = {
    id: "peopleGrid",
    columns: [
      {
        title: "#",
        type: "firstradio",
        onClick: (data: { name: any; }) => {
          dispatch(
            modalAction.modalConfig({
              config: {
                title: data.name,
                body: DetailView,
                bodyDetail: data,
              },
            })
          );
          //ModalBase({ config: { title: data.name, body: detailBody } });

          // return (
          //   <ModalBase
          //     config={{ title: data.name, body: PeopleDetail }}
          //   ></ModalBase>
          // );
        },
      },
      {
        title: "#",
        type: "",
        template: (row: { homeworld: RequestInfo | URL | null; url: RequestInfo | URL | null; }) => {
          return (
            <>
              <AppDropdown>
                <li key={UtilityHelper.generate_uuidv4()} onClick={(x: any) => {
                  //homeworld
                  dataService
                    .GetMethodIndependent(row.homeworld!)
                    .then((detailObject) => {
                      dispatch(
                        modalAction.modalConfig({
                          config: {
                            title: detailObject.name,
                            body: DetailGenerate,
                            bodyDetail: { ...row, detailObject },
                          },
                        })
                      );
                    });
                }}><a className="dropdown-item" href="#">Homeworld</a></li>
                <li key={UtilityHelper.generate_uuidv4()}><hr className="dropdown-divider" /></li>
                <li key={UtilityHelper.generate_uuidv4()} onClick={(x: any) => {
                  //homeworld
                  return dataService
                    .GetMethodIndependent(row.url!)
                    .then((detailObject) => {
                      dispatch(
                        modalAction.modalConfig({
                          config: {
                            title: detailObject.name,
                            body: DetailGenerate,
                            bodyDetail: { ...row, detailObject },
                          },
                        })
                      );
                    });
                }}><a className="dropdown-item" href="#">Full Detail</a></li>
              </AppDropdown>

            </>
          );
        },
      },
      {
        field: "name",
        title: "name",
        template: (row: any) => {
          return (<Link to={(row.url).split('/')[5]}> {row.name}</Link>)
        }
      },
      {
        field: "height",
        title: "height",
      },
      {
        field: "mass",
        title: "mass",
      },
      {
        field: "hair_color",
        title: "Hair Color",
      },
      {
        field: "skin_color",
        title: "Skin Color",
      },
      {
        field: "gender",
        title: "Gender",
        template: (row: { gender: string; }) => {
          if (row.gender == "female") {
            return <i className="bi bi-gender-female"></i>;
          } else if (row.gender == "male") {
            return <i className="bi bi-gender-male"></i>;
          } else {
            //bi bi-gender-ambiguous
            return <i className="bi bi-gender-ambiguous"></i>;
          }
        },
      },
      {
        field: "birth_year",
        title: "bBirth Year",
      },
    ],
    data: null,
    url: "people",
  };
  return (<>
    {/* <Prompt when={true} message ={(loc)=>{
**ATTENTION : this is on version 5 of react-router-dom
    var test=loc;

    return "are you sure?";
  }}></Prompt> */}
    <AppGrid config={gridconfig} key={"people"}></AppGrid>
  </>);
};
export default People;
