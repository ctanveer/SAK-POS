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

const getOngoingTableLogsByRestaurantId = async (id: number) => {
  try {
    const tablelogs = await TableLog.aggregate([
      {
        $match: {
          status: 'ongoing'
        }
      },
      {
        $lookup: {
          from: 'tables',
          localField: 'tableId',
          foreignField: '_id',
          as: 'tableInfo'
        }
      },
      {
        $lookup: {
          from: 'orders',
          localField: 'orderId',
          foreignField: '_id',
          as: 'orderInfo'
        }
      },
      {
        $match: {
          'tableInfo.restaurantId': id
        }
      }
    ]);
  
    return tablelogs;
    
  } catch (error) {
    console.log(error);
    throw error;
  }

}

const getTableLogsByTableId =  async (id: string | Types.ObjectId) => {
  const tablelog = await TableLog.findOne({ tableId: id })
    .sort({createdAt: -1})
    .populate('tableId')
    .populate('orderId');
  
  return tablelog;
}

//pending for HR
const getPopulatedTableLogByOrderId = async (id: string | Types.ObjectId) => {
  const tablelog = await TableLog.findOne({orderId: id})
  .populate('tableId')
  .populate('orderId')
  .exec();

  return tablelog as ITableLog;
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
    getTableLogForOrderId,
    getOngoingTableLogsByRestaurantId,
    getPopulatedTableLogByOrderId
}