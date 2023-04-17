import React from "react";
import UseModal from "../../../../useHook/UseModal";

const ModalDelete = ({ modalDeleteState, onCloseDelete, getDeleteModal }) => {
    return (
        <UseModal
            visible={modalDeleteState.visible}
            title="Подтвердить удаление"
            content={
                modalDeleteState.item && (
                    <div className="modal_del_content">
                        <p>Дата : {modalDeleteState.item.created_at},</p>
                        <p>ФИО : {modalDeleteState.item.driver_name},</p>
                        <p>Культура : {modalDeleteState.item.culture},</p>
                        <p>Порт : {modalDeleteState.item.port},</p>
                        <p>
                            Гос. Номер : {modalDeleteState.item.transport_id},
                        </p>
                        <p>Прицеп : {modalDeleteState.item.trailer}</p>
                    </div>
                )
            }
            footer={
                <>
                    <button onClick={onCloseDelete}>Закрыть</button>
                    <button onClick={getDeleteModal}>Подтвердить</button>
                </>
            }
            onClose={onCloseDelete}
        />
    );
};

export default ModalDelete;
