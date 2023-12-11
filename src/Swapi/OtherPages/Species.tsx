import React, { FC } from 'react';
import AppGrid, { IAppGridConfig } from '../../Frontend/Framework/App-Grid';
import UtilityHelper from '../../Frontend/Framework/AppUtility';


interface SpeciesProps {
  gridDataValue?: any|null;
}

const Species: FC<SpeciesProps> = (props?:any|null) => {
  const gridconfig:IAppGridConfig = {
    id:UtilityHelper.generate_uuidv4(),
    columns: [
      //{ title: "#",type: "firstradio" }, { title: "#",type: "firstaction" },
      {
        field: 'name',
        title: 'Name',
      },
      {
        field: 'average_lifespan',
        title: 'Average Lifespan',
      },
      {
        field: 'classification',
        title: 'Classification',
      },
      {
        field: 'language',
        title: 'Language',
      },
    ],
    data: props.gridDataValue,
    url: props.gridDataValue ? null : 'species',
  };
  return <AppGrid config={gridconfig} key={'Species'}></AppGrid>;
};

export default Species;