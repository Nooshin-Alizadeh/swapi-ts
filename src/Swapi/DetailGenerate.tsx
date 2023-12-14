
import { Outlet, useNavigate, useParams } from "react-router-dom";
import UtilityHelper from "../Frontend/Framework/AppUtility";
import { useState } from "react";
import DataService from "../Frontend/Framework/DataService";
import { useDispatch } from "react-redux";
import { capitalize, replace } from "lodash";

// import { isDate } from "util/types";
const loadingid = UtilityHelper.generate_uuidv4();
let selectedListdata: any[] = [];
let btnloading = false;
const DetailGenerate = (props?: { detailObject?: { [x: string]: any; }; }) => {
  type InitValue = {
    keyValue: string;
    value: any[]
  }
  let initval: InitValue = { keyValue: '', value: [] };
  const [first, setfirst] = useState(initval);

  var elements = [];
  var lists = [];
  const params = useParams();
  const navigate = useNavigate();
  const disoatch = useDispatch();
  // if (params &&  params.id && (isEmpty(props) || !props)) {
  var service = new DataService(disoatch, loadingid);
  for (const mainkey in props?.detailObject) {
    if (
      //   UtilityHelper.isURL(props.detailObject[key]) ||
      Array.isArray(props?.detailObject[mainkey]) ||
      mainkey == "url" || mainkey == "homeworld"
    ) {
      if (Array.isArray(props?.detailObject[mainkey])) {
        lists.push(
          <>
            <button key={UtilityHelper.generate_uuidv4()} type="button"
              className={"btn btn-outline-info p-2 bd-highlight m-1 dropdown-toggle  " + (((props?.detailObject[mainkey]).length == 0) && 'disabled')}
              data-bs-toggle="dropdown" aria-expanded="false"
              // eslint-disable-next-line no-loop-func
              onClick={() => {
                btnloading = true;
                service.GetMulti(props?.detailObject![mainkey], false).then(val => {
                  btnloading = false;
                  //disoatch(loadingAction.isLoading({ valueState: false, id: loadingid }));

                  selectedListdata = val.map(d => d.data);
                  setfirst({ 'keyValue': mainkey, value: selectedListdata })
                }).catch(err => {
                  btnloading = false;
                });
              }}>

              {capitalize(mainkey)} &nbsp;
              {btnloading && <>
                <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                <span className="visually-hidden">Loading...</span>
              </>}
              <span className=" badge rounded-pill bg-danger" >
                {(props?.detailObject[mainkey]).length}
              </span></button>
            <ul className="dropdown-menu ">
              <>
                {
                  first.keyValue == mainkey && first.value.map((_lidata: any) => {
                    return (
                      <li key={UtilityHelper.generate_uuidv4()}
                        className="card border-light "
                        onClick={() => { navigate('/' + ((_lidata.url).split('/')[4]) + '/' + ((_lidata.url).split('/')[5])); }}>
                        {_lidata.name || _lidata.title}
                      </li>

                    );
                  })}
              </>

            </ul>
          </>
        )
      }
      continue;
    }
    let valueData = UtilityHelper.isDate(props?.detailObject[mainkey]) ? UtilityHelper.getStringOfDate(new Date(props?.detailObject[mainkey])) : props?.detailObject[mainkey];
    elements.push(<>
      <div className="mb-3 row">
        <label htmlFor={mainkey} className="col-sm-2 col-md-3 col-lg-4 col-form-label">{replace(capitalize(mainkey), '_', ' ')}</label>
        <div className="col-sm-10 col-md-9 col-lg-8">
          <input type="text" readOnly className="form-control" id={mainkey} value={valueData} />
        </div>
      </div></>

    );
  }

  return (<>
    <form>
      <div className="container container-fluid clearfix">
        <div className="row g-3">
          <div className="col-auto row">
            {elements.map((row) => {
              return (
                <div className="col-sm-12 col-md-6 col-lg-4 col-xl-3 card border-light " key={UtilityHelper.generate_uuidv4()}>
                  {row}
                </div>
              );
            })}
          </div>

          <div className=" row">
            <div className="d-flex justify-content-start">{lists}</div>
          </div>
          {/* <div className="row">
            <div className="bg-info">
              <Outlet></Outlet>

            </div>
          </div> */}

        </div>
      </div>
    </form>
  </>
  );
};
export default DetailGenerate;
