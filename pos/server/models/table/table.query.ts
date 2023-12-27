import Table from './table.model';
import { ITable } from '../../interfaces/table.interface';

const getAllTables = async () => {
    const tables = await Table.find();
    return tables;
};

// const getTableById = async (id: number) => {
//     //const table = await Table.findById(id);
//     const table = await Table.findOne({tableId: id});
//     return table;
// };


const getTableByIdWithAllOrders = async (id: number) => {
  //const table = await Table.findById(id);
  //const table = await Table.findOne({tableId: id}).populate('order').exec();
  const table = await Table.findOne({tableId: id}).populate('orderList').exec();

  return table;
};


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
    getTableByIdWithAllOrders,
    createTable,
    updateTableById,
    deleteTableById
}