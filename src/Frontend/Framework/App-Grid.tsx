/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Fragment, useState } from "react";
import { loadingAction } from "../Store/loadingManager";
import { alertAction } from "../Store/alertManager";
import AppPagination from "./App-Pagination";
import AppTable from "./App-Table";
import UtilityHelper from "./AppUtility";
import { UUID } from "crypto";
import { useDispatch } from "react-redux";
import { AppAlertType } from "./App-Alert";
import DataService from "./DataService";
import { capitalize } from "lodash";
let firstrenderignore = true;
const AppGrid = (props: IAppGrid) => {
    const dispatch = useDispatch();
    // const _loadingAction = loadingAction;
    let dataService: { Get: (arg0: any, arg1: { page: any; }) => Promise<any>; };
    const generateField = (rowData: any, field: string | number, type: any, templpate: (arg0: any) => any) => {
        switch (type) {
            case Date.name:
                return new Date(rowData[field]).toDateString();
            case "firstradio":
                return (
                    <div className="form-check">
                        <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                        {/* <label className="form-check-label" htmlFor="flexRadioDefault1">
                            Default radio
                        </label> */}
                    </div>

                );
            case "firstSelect":
                return (
                    <div className="form-check">
                        <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                        {/* <label className="form-check-label" htmlFor="flexRadioDefault1">
                            Default radio
                        </label> */}
                    </div>
                );
            case "firstaction":
                return <td key={UtilityHelper.generate_uuidv4()}>...</td>;
            default:
                if (templpate) {
                    return templpate(rowData);
                }
                return rowData[field];
        }
    };
    type INITVAL = {
        gridData: any[],
        pagination: any[]
    };
    const initalValue: INITVAL = {
        gridData: [],
        pagination: []
    }
    const [pageData, setData] = useState(initalValue);
    const [generate, setGenerate] = useState(true);
    const columnsValue = props.config.columns;
    const getGridData = (pageNum: number, loadingId: UUID | string | null) => {
        if (props.config?.url) {
            // if (firstrenderignore) {
            //     firstrenderignore = false;
            //     return;
            // }
            dataService
                .Get(props.config?.url, { page: pageNum })
                .then((result) => {
                    var pages = setPagination(result.count);
                    //paginationItem = result.count;
                    setData({
                        gridData: result.results,
                        pagination: pages,
                    });
                })
                .catch((er) => {
                    //'Failed to fetch'
                    dispatch(
                        loadingAction.isLoading({ valueState: false, id: loadingId })
                    );
                    dispatch(
                        alertAction.alertConfig({
                            config: {
                                time: 20,
                                msg: er.message,
                            },
                        })
                    );
                    dispatch(
                        alertAction.alertConfig({
                            config: {
                                time: 20,
                                msg: "FAIL TO LOAD GRID.",
                                type: AppAlertType.warning,
                            },
                        })
                    );
                });
        } else if (props.config.data) {
            setData((pre: any) => {
                return {
                    ...pre,
                    gridData: props.config.data?.slice((pageNum - 1) * 10, pageNum * 10),
                };
            });
        }
    };
    const setPagination = (totalCount: number, pageNum?: number | undefined | null) => {
        let pagination = [];
        const pagesCount = totalCount / 10;
        for (let i = 0; i < pagesCount; i++) {
            const index = i + 1;
            pagination.push(
                <li className={"page-item" + (index === pageNum ? " active" : '')}
                    onClick={() => {
                        getGridData(index, null);
                    }}

                    key={index} ><a className="page-link" href="#">{index}</a></li>
            );
        }
        return pagination;
    };
    if (generate) {
        setGenerate(false);
        if (!props.config?.data && !props.config?.url) return <>data not exist</>;
        if (props.config?.url) {
            const loadingId = UtilityHelper.generate_uuidv4();
            dataService = new DataService(dispatch, loadingId);
            getGridData(1, loadingId);
        } else if (props.config?.data) {
            setGenerate(false);
            var pages = setPagination(props.config?.data.length);
            //paginationItem = result.count;
            setData({
                gridData: props.config?.data,
                pagination: pages,
            });

            //setData(props.config.data);
        }
    }

    var grid = pageData.gridData.map((d) => {
        return (
            <tr key={d[props.config.id] || UtilityHelper.generate_uuidv4()}>
                {columnsValue.map((prop) => {
                    if (prop.type == "firstradio")
                        return (
                            <td key={UtilityHelper.generate_uuidv4()}>
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" onChange={(row) => {
                                        if (prop.onClick) prop.onClick(d, row);
                                    }} />
                                    {/* <label className="form-check-label" htmlFor="flexCheckDefault">
                                        Default checkbox
                                    </label> */}
                                </div>
                            </td>
                        );
                    if (prop.type == "firstSelect")
                        return (
                            <td key={UtilityHelper.generate_uuidv4()}>

                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" onChange={(row) => {
                                        prop.onClick?.(d, row);
                                    }} />
                                    {/* <label className="form-check-label" htmlFor="flexCheckDefault">
                                        Default checkbox
                                    </label> */}
                                </div>
                            </td>
                        );
                    if (prop.type == "firstaction")
                        return <td key={UtilityHelper.generate_uuidv4()}>...</td>;
                    const datacolumn = (
                        <td key={UtilityHelper.generate_uuidv4()}>
                            {generateField(d, prop.field!, prop.type, prop.template)}
                            {/* {d[prop.field]} */}
                        </td>
                    );

                    return datacolumn;
                })}
            </tr>
        );
    });
    return (
        <div className="table-responsive table-responsive table-responsive-xxl">
            <AppTable striped bordered hover responsive="xl" size="sm">
                <thead>
                    <tr>
                        {props.config.columns.map((prop) => {
                            return <th key={UtilityHelper.generate_uuidv4()}>{capitalize(prop.title)}</th>;
                        })}
                    </tr>
                </thead>
                <tbody>{grid}</tbody>
            </AppTable>
            <div className="d-flex flex-row-reverse bd-highlight">
                <AppPagination size="sm">{pageData.pagination}</AppPagination>
            </div>
        </div>
    );
};
export default React.memo(AppGrid);
interface IAppGrid {
    config: IAppGridConfig
}
export interface IAppGridConfig {
    columns: IAppGridColumn[];
    url?: string | null;
    data?: any[] | null;
    id: string | number;
}
interface IAppGridColumn {
    onClick?: (data: any, row?: React.ChangeEvent<HTMLInputElement>) => any;
    field?: string;
    title: string;
    type?: any;
    template?: any;
}
