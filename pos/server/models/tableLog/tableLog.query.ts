import TableLog from "./tableLog.model";
import { ITableLog } from "../../interfaces/tableLog.interface";

const getAllTableLogs = async () => {
    const tablelogs = await TableLog.find().populate('orderId').exec();
    return tablelogs;
};

const getTableLogsByTableId = async (id: string) => {
    const tablelogs = await TableLog.find({tableId: id}).populate('orderId').exec()
    return tablelogs;
};

const createTableLog = async (tablelogObject: Partial<ITableLog>) => {
    const tablelog = await TableLog.create({...tablelogObject});
    return tablelog;
};

const updateTableLogById = async (
    id: string,
    tablelogObject: Partial<ITableLog>,
  ) => {
    const tablelog = await TableLog.findByIdAndUpdate(
      { _id: id},
      {
        ...tablelogObject,
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

export {
    getAllTableLogs,
    getTableLogsByTableId,
    createTableLog,
    updateTableLogById,
    deleteTableLogById
}