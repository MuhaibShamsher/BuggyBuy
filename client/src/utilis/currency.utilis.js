const addCurrency = (num) => {
    return `PKR ${num?.toLocaleString('en-PK')}`;
};

export default addCurrency;