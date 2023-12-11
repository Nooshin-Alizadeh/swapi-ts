import React, { FC } from 'react';
import AppGrid, { IAppGridConfig } from '../../Frontend/Framework/App-Grid';
import UtilityHelper from '../../Frontend/Framework/AppUtility';

interface Film {
  title: string;
  director: string;
  producer: string;
  release_date: string;
}

interface FilmsProps {
  gridDataValue?: Film[] |null;
}

const Films: FC<FilmsProps> = (props:any|null) => {
  const gridconfig:IAppGridConfig = {
    id:UtilityHelper.generate_uuidv4(),
    columns: [
      { field: "title", title: "Title" },
      { field: "director", title: "Director" },
      { field: "producer", title: "Producer" },
      { field: "release_date", title: "Release Date" }
    ],
    data: props.gridDataValue,
    url: props.gridDataValue ? null : "films"
  };

  return <AppGrid config={gridconfig} key={"films"}></AppGrid>;
}

export default Films;