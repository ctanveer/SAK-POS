import CounterModel from './counter.model';

export const getNextSequenceValue = async function (sequenceName: any) {
    const sequenceDoc = await CounterModel.findOneAndUpdate(
      { _id: sequenceName },
      { $inc: { sequence_value: 1 } },
      { new: true, upsert: true }
    );
    return sequenceDoc.sequence_value;
};