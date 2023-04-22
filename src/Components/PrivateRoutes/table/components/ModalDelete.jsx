import React from "react";
import UseModal from "../../../../useHook/UseModal";

const ModalDelete = ({ modalDeleteState, onCloseDelete, getDeleteModal }) => {
  return (
    <UseModal
      visible={modalDeleteState.visible}
      title="Confirm deletion"
      content={
        modalDeleteState.item && (
          <div className="modal_del_content">
            <p>Date : {modalDeleteState.item.created_at},</p>
            <p>Full name : {modalDeleteState.item.driver_name},</p>
            <p>Culture : {modalDeleteState.item.culture},</p>
            <p>Port : {modalDeleteState.item.port},</p>
            <p>Reg. number : {modalDeleteState.item.transport_id},</p>
            <p>Trailer : {modalDeleteState.item.trailer}</p>
          </div>
        )
      }
      footer={
        <>
          <button onClick={onCloseDelete}>Exit</button>
          <button onClick={getDeleteModal}>Confirm</button>
        </>
      }
      onClose={onCloseDelete}
    />
  );
};

export default ModalDelete;
