import Table from './table.model';
import { ITable } from '../../interfaces/table.interface';

const getAllTables = async () => {
    const tables = await Table.find();
    return tables;
};

const getTableById = async (id: number) => {
    //const table = await Table.findById(id);
    const table = await Table.findOne({tableId: id});
    return table;
};

// type TableType = {
//     num: number;
//     capacity: number;
//     bill: number;
//     serverId: number;
// };

// interface ITable {
//     num: number;
//     capacity: number;
//     bill: number;
//     serverId: number;
// }


const createTable = async (tableObject: ITable) => {
    const table = await Table.create({...tableObject});
    return table;
}

const updateTableById = async (
    tableId: number,
    tableObject: ITable,
  ) => {
    const table = await Table.findOneAndUpdate(
      { tableId: tableId},
      {
        ...tableObject,
      },
      { new: true },
    );
    return table;
  };

const deleteTableById = async (id: number) => {
    const table = await Table.findOneAndDelete ({tableId: id});
    return table;
};

export {
    getAllTables,
    getTableById,
    createTable,
    updateTableById,
    deleteTableById
}