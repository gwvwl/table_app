// url for request
export const makeUrl = (dataInput) => {
    let arr = {
        driver_name: dataInput.driver_name,
        trailer: dataInput.trailer,
        driver_passport: dataInput.driver_passport,
        driver_license: dataInput.driver_license,
        driver_phone: dataInput.driver_phone,
        transport_id: dataInput.transport_id,
        transport_name: dataInput.transport_name,
        culture: dataInput.culture,
        port: dataInput.port,
        // sender: dataInput.sender,
        transport_type: dataInput.transport_type,
    };

    let ret = "";

    Object.entries(arr).map(([key, value]) => {
        ret += value.length > 0 ? "&" + key + "=" + value : "";
    });

    if (dataInput.dateMin.length && dataInput.dateMax.length) {
        ret += "&date_between=" + dataInput.dateMin + "," + dataInput.dateMax;
    }

    return ret;
};
