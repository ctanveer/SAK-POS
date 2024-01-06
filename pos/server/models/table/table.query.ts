import Table from './table.model';
import { ITable } from '../../interfaces/table.interface';

const getAllTables = async () => {
    const tables = await Table.find();
    return tables;
};

const getTableById = async (id:string) => {
  const table = await Table.findById(id);
  return table
}

const createTable = async (tableObject: ITable) => {
  const table = await Table.create({...tableObject});
  return table;
}

const updateTableById = async (
    tableId: string,
    tableObject: Partial<ITable>,
  ) => {
    const table = await Table.findByIdAndUpdate(
      { _id: tableId},
      {
        ...tableObject,
      },
      { new: true },
    );
    return table;
};

const deleteTableById = async (id: string) => {
    // const table = await Table.findOneAndDelete ({tableId: id});
    const table = await Table.findByIdAndDelete(id);
    return table;
};

/*
// set table as occupied
const setTableAsOccupiedByTableId = async (tableId: number, tableObject: ITable) => {
  const newOrder = await Order.create({tableId: tableId, serverId: tableObject.serverId})
  
  const table = await Table.findOneAndUpdate({tableId: tableId},
    {
      $set: {isOccupied : true, currentOrderId: newOrder.orderId, serverId: tableObject.serverId, capacity: tableObject.capacity, timeElapsed: Date.now(), bill: 0}
    },
    {new: true}
    );

    return table;
}



//set table as unoccupied
const closeAndUnoccupyTable = async (tableId: number) => {
  const table = await Table.findOneAndUpdate({tableId: tableId},
    {
      $set: {isOccupied : false, timeElapsed: null, capacity: null, currentOrderId: null, serverId: null, customerId: null, bill: 0}
    },
    {new: true}
    );

    return table;
}
*/

const getTableByIdWithAllOrders = async (id: number) => {
  //const table = await Table.findOne({tableId: id}).populate('order').exec();
  //const table = await Table.findOne({tableId: id}).populate('orderList').exec();
  const table = await Table.aggregate([
    {
      $match: {
        tableId: id
      },
    },
    {
      $lookup: {
        from: 'orders',
        localField: 'tableId',
        foreignField: 'tableId',
        as: 'listOfOrders'
      },
    },
  ])

  return table;
};

export {
    getAllTables,
    getTableById,
    createTable,
    updateTableById,
    deleteTableById,
    getTableByIdWithAllOrders,
}