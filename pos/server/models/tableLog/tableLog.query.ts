import TableLog from "./tableLog.model";
import { ITableLog } from "../../interfaces/tableLog.interface";
import { Types } from "mongoose";

const getAllTableLogs = async () => {
    const tablelogs = await TableLog.find().populate('orderId').exec();
    return tablelogs;
};

const getLatestOngoingOrderForTable = async (id: string) => {
    const tablelog = await TableLog.findOne({ tableId: id, status: 'ongoing' }).
    sort({createdAt: -1})
    return tablelog;
};

const getTableLogsByTableId =  async (id: string | Types.ObjectId) => {
  const tablelog = await TableLog.findOne({ tableId: id }).
  sort({createdAt: -1})
  return tablelog;
}

const createTableLog = async (tablelogObject: Partial<ITableLog>) => {
    const tablelog = await TableLog.create({...tablelogObject});
    return tablelog;
};

const updateTableLogById = async (
    id: string | Types.ObjectId,
    tablelogObject: Partial<ITableLog>,
  ) => {
    const tablelog = await TableLog.findByIdAndUpdate(
      id,
      {
        $set: {
          ...tablelogObject,
        }
      },
      { new: true },
    );
    return tablelog;
};

const deleteTableLogById = async (id: string) => {
    // const table = await Table.findOneAndDelete ({tableId: id});
    const tablelog = await TableLog.findByIdAndDelete(id);
    return tablelog;
};

const getTableLogForOrderId = async (orderId: string | Types.ObjectId) => {
  const tableLog = await TableLog.findOne({ orderId });
  return tableLog;
}

export {
    getAllTableLogs,
    getLatestOngoingOrderForTable,
    createTableLog,
    updateTableLogById,
    deleteTableLogById,
    getTableLogsByTableId,
    getTableLogForOrderId
}