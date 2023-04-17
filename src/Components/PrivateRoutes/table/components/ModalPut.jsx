import React from "react";
import UseModal from "../../../../useHook/UseModal";
import FormPut from "./FormPut";

const ModalPut = ({ modalPut, onClosePut, getPutModal }) => {
    return (
        <UseModal
            //put Modal
            visible={modalPut.visible}
            title="Редактирование"
            content={
                modalPut.item && (
                    <>
                        <FormPut
                            getPutModal={getPutModal}
                            onClosePut={onClosePut}
                            data={modalPut.item}
                        />
                    </>
                )
            }
            onClose={onClosePut}
        />
    );
};

export default ModalPut;
