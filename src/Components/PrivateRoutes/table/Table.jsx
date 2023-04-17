import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    getFilterData,
    getDataExsel,
    delData,
    putData,
} from "../../../store/slices/dataSlice";
import { logout } from "../../../store/slices/userSlice";
import { makeUrl } from "./components/makeUrl";
import HeaderTable from "./components/HeaderTable";
import BodyTable from "./components/BodyTable";
import ModalPut from "./components/ModalPut";
import ModalDelete from "./components/ModalDelete";
import Pagination from "../../../useHook/pagination/Pagination";
import Spinner from "../../../spiner/Spinner";
import {
    columnPDFSmall,
    columnPDFDefault,
} from "../../../saveExcel/columnsPDF";
import { columnsTable, columnsTableAdmin } from "./components/columns";
import "./index.css";

const TableReport = React.memo(() => {
    const dispatch = useDispatch();
    // admin delete column
    const admin = useSelector((state) => state.user.admin);
    const columns = admin ? columnsTableAdmin : columnsTable;
    // pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [PageSize, setPageSize] = useState(25);
    let offset = (currentPage - 1) * PageSize;
    const totalPages = useSelector((state) => state.data.total);
    const loading = useSelector((state) => state.data.loading);

    if (currentPage - 1 > totalPages / PageSize) {
        setCurrentPage(1);
    }
    // get data redux and filter data
    const data = useSelector(
        (state) =>
            state.data.data &&
            state.data.data.map(
                ({ id, telegram_chat_id, created_on, ...rest }, index) => {
                    return {
                        num: PageSize * (currentPage - 1) + index + 1,
                        id,
                        created_at: created_on,
                        ...rest,
                    };
                }
            )
    );
    // state modal delete
    const [modalDeleteState, setModalDetele] = useState({
        visible: false,
        item: {},
    });

    //  state modal put
    const [modalPut, setModalPut] = useState({
        visible: false,
        item: {},
    });
    //  state filters
    const [dataInput, setDataInput] = useState({
        driver_name: "",
        trailer: "",
        driver_passport: "",
        driver_phone: "",
        driver_license: "",
        transport_id: "",
        transport_name: "",
        culture: "",
        port: "",
        transport_type: "",
        // sender: "",
        dateMin: "",
        dateMax: "",
    });
    // input onChannge
    const onChangeData = (name, data) => {
        setDataInput((dataInput) => ({
            ...dataInput,
            [name]: data,
        }));
    };

    // request by filter data
    useEffect(() => {
        dispatch(getFilterData({ body: makeUrl(dataInput), offset }));
    }, [dataInput, currentPage]);

    // request  excel
    const excel = (columns) => {
        dispatch(
            getDataExsel({
                body: makeUrl(dataInput),
                limit: totalPages,
                columns,
            })
        );
    };
    // request detele Modal
    const onCloseDelete = () =>
        setModalDetele(() => {
            return {
                item: {},
                visible: false,
            };
        });
    const getDeleteModal = () => {
        dispatch(
            delData({
                id: modalDeleteState.item.id,
                body: makeUrl(dataInput),
                offset,
            })
        );

        onCloseDelete();
    };
    // request detele Modal
    const onClosePut = () =>
        setModalPut(() => {
            return {
                item: {},
                visible: false,
            };
        });

    const getPutModal = (body) => {
        dispatch(
            putData({
                id: modalPut.item.id,
                body,
                url: makeUrl(dataInput),
                offset,
            })
        );
        onClosePut();
    };
    return (
        <div className="wrapper_table">
            {loading && <Spinner />}
            <ModalDelete
                modalDeleteState={modalDeleteState}
                onCloseDelete={onCloseDelete}
                getDeleteModal={getDeleteModal}
            />
            <ModalPut
                modalPut={modalPut}
                onClosePut={onClosePut}
                getPutModal={getPutModal}
            />

            <div className="table_button_wrapper">
                <div>
                    <button onClick={() => excel(columnPDFDefault)}>
                        Excel
                    </button>
                    <button
                        onClick={() => excel(columnPDFSmall)}
                        style={{ marginLeft: "20px" }}
                    >
                        Сжатый Excel
                    </button>
                </div>

                <button onClick={() => dispatch(logout())}>Выход</button>
            </div>
            {data && (
                <>
                    <table>
                        <thead>
                            <tr>
                                <HeaderTable
                                    dataInput={dataInput}
                                    onChangeData={onChangeData}
                                    columns={columns}
                                />
                            </tr>
                        </thead>
                        <tbody>
                            <BodyTable
                                setModalDetele={setModalDetele}
                                setModalPut={setModalPut}
                                data={data}
                                columns={columns}
                            />
                        </tbody>
                    </table>
                    <Pagination
                        className="pagination-bar"
                        currentPage={currentPage}
                        totalCount={totalPages}
                        pageSize={PageSize}
                        onPageChange={(page) => setCurrentPage(page)}
                    />
                </>
            )}
        </div>
    );
});

export default TableReport;
