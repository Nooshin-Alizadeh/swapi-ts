import React, { FC } from 'react';
import AppGrid, { IAppGridConfig } from '../../Frontend/Framework/App-Grid';
import UtilityHelper from '../../Frontend/Framework/AppUtility';

interface Vehicle {
  name: string;
  model: string;
  manufacturer: string;
  vehicle_class: string;
  cargo_capacity: string;
}

interface VehiclesProps {
  gridDataValue?: Vehicle[];
}

const Vehicles: FC<VehiclesProps> = (props) => {
  const gridconfig:IAppGridConfig = {
    id:UtilityHelper.generate_uuidv4(),
    columns: [
      //{ title: "#",type: "firstradio" }, { title: "#",type: "firstaction" },
      {
        field: "name",
        title: "Name",
      },
      {
        field: "model",
        title: "Model",
      },
      {
        field: "manufacturer",
        title: "Manufacturer",
      },
      {
        field: "vehicle_class",
        title: "Vehicle Class",
      },
      {
        field: "cargo_capacity",
        title: "Cargo Capacity",
      },
    ],
    data: props.gridDataValue,
    url: props.gridDataValue ? null : "vehicles",
  };
  return <AppGrid config={gridconfig} key={"vehicles"}></AppGrid>;
};

export default Vehicles;