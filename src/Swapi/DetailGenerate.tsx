
import { useParams } from "react-router-dom";
import UtilityHelper from "../Frontend/Framework/AppUtility";

// import { isDate } from "util/types";

const DetailGenerate = (props?: { detailObject?: { [x: string]: any; }; }) => {
  var elements = [];
  const params = useParams();
  if (params && params.module && params.id) {

  }
  for (const key in props?.detailObject) {
    if (
      //   UtilityHelper.isURL(props.detailObject[key]) ||
      Array.isArray(props?.detailObject[key]) ||
      key == "url" || key == "homeworld"
    ) {
      continue;
    }
    let valueData = UtilityHelper.isDate(props?.detailObject[key]) ? UtilityHelper.getStringOfDate(new Date(props?.detailObject[key])) : props?.detailObject[key];
    elements.push(<>
      <div className="mb-3 row">
        <label htmlFor="staticEmail" className="col-sm-2 col-md-3 col-lg-4 col-form-label">{key}</label>
        <div className="col-sm-10 col-md-9 col-lg-8">
          <input type="text" readOnly className="form-control" id="staticEmail" value={valueData} />
        </div>
      </div></>
      // <Form.Group
      //   as={Row}
      //   className="mb-1"
      //   controlId="formPlaintextEmail"
      //   key={UtilityHelper.generate_uuidv4()}
      // >
      //   <Form.Label column sm="6">
      //     {key}
      //   </Form.Label>
      //   <Col sm="6">
      //     <Form.Control
      //       plaintext
      //       readOnly
      //       defaultValue={
      //         UtilityHelper.isDate(props.detailObject[key])
      //           ? UtilityHelper.getStringOfDate(new Date(props.detailObject[key]))
      //           : props.detailObject[key]
      //       }
      //     />
      //   </Col>
      // </Form.Group>
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

        </div>
      </div>
    </form>
  </>
    // <Form>
    //   <Container>
    //     <Row>
    //       {elements.map((row) => {
    //         return (
    //           <Col md="6">
    //             <div key={UtilityHelper.generate_uuidv4()} className="localcard">
    //               {row}
    //             </div>
    //           </Col>
    //         );
    //       })}
    //     </Row>
    //   </Container>
    // </Form>
  );
};
export default DetailGenerate;
