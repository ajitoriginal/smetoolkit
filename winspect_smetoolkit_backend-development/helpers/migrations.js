module.exports.addColumnIfNotExist = (queryInterface, tableName, columnName, type, transaction) =>
  queryInterface.describeTable(tableName).then((tableDefinition) => {
    if (!tableDefinition[columnName]) {
      return queryInterface.addColumn(tableName, columnName, type, transaction);
    }

    return Promise.resolve(true);
  });

module.exports.removeColumnIfExist = (queryInterface, tableName, columnName, transaction) =>
  queryInterface.describeTable(tableName).then((tableDefinition) => {
    if (tableDefinition[columnName]) {
      return queryInterface.removeColumn(tableName, columnName, transaction);
    }

    return Promise.resolve(true);
  });

module.exports.changeColumnIfExist = (queryInterface, tableName, columnName, type, transaction) =>
  queryInterface.describeTable(tableName).then((tableDefinition) => {
    if (tableDefinition[columnName]) {
      return queryInterface.changeColumn(tableName, columnName, type, transaction);
    }
    return Promise.resolve(true);
  });
