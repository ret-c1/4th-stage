export const switchAsset = (businessType) => {
    switch (Number(businessType)) {
        case 1:
            return 'website';
        case 2:
            return 'computingDevice';
        case 3:
            return 'database';
        case 4:
            return 'softWare';
        case 5:
            return 'netWork';
        case 6:
            return 'scm';
        default:
            return 'website';
    }
};
