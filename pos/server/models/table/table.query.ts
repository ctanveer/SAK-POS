import Table from './table.model';

const getAllTables = async () => {
    const tables = await Table.find();
    return tables;
};

const getTableById = async (id: string) => {
    const table = await Table.findById(id);
    return table;
};

type TableType = {
    num: number;
    capacity: number;
    bill: number;
    serverId: number;
};

const createTable = async (tableObject: TableType) => {
    const table = await Table.create({...tableObject});
    return table;
}

const updateTableById = async (
    tableId: string,
    tableObject: TableType,
  ) => {
    const table = await Table.findByIdAndUpdate(
      { _id: tableId },
      {
        ...tableObject,
      },
      { new: true },
    );
    return table;
  };

const deleteTableById = async (id: string) => {
    const table = await Table.findByIdAndDelete(id);
    return table;
};

export {
    getAllTables,
    getTableById,
    createTable,
    updateTableById,
    deleteTableById
}