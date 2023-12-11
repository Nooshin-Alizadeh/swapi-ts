import React, { FC } from 'react';
import AppGrid, { IAppGridConfig } from '../../Frontend/Framework/App-Grid';
import UtilityHelper from '../../Frontend/Framework/AppUtility';

interface StarshipsProps {
  gridDataValue?: any | null;
}

const Starships: FC<StarshipsProps> = (props) => {
  const gridconfig:IAppGridConfig = {
    id:UtilityHelper.generate_uuidv4(),
    columns: [
      //{ title: "#",type: "firstradio" }, { title: "#",type: "firstaction" },
      {
        field: 'name',
        title: 'Name',
      },
      {
        field: 'model',
        title: 'Model',
      },
      {
        field: 'manufacturer',
        title: 'Manufacturer',
      },
      {
        field: 'crew',
        title: 'Crew',
      },
    ],
    data: props.gridDataValue,
    url: props.gridDataValue ? null : 'starships',
  };
  return <AppGrid config={gridconfig} key={'Starships'}></AppGrid>;
};

export default Starships;