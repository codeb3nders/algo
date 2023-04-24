import { Document, FilterQuery, Model, UpdateQuery } from 'mongoose';

import { isNil } from 'lodash';
import { BadRequestException } from '@nestjs/common';
interface StringMap {
  [key: string]: string;
}
export abstract class BaseRepository<T extends Document> {
  constructor(private entityModel: Model<T>, private aggregateQry?: any) {}

  async create(createBaseData: unknown) {
    const entity = new this.entityModel(createBaseData);
    try {
      return await entity.save();
    } catch (error) {
      throw new BadRequestException(error.message || error);
    }
  }

  async findOne(
    entityFilterQuery: FilterQuery<T>,
    projection?: Record<string, unknown>,
  ): Promise<T | null> {
    const response = await this.entityModel.findOne(entityFilterQuery, {
      _id: 0,
      __v: 0,
      ...projection,
    });
    if (isNil(response)) {
      throw new BadRequestException('No record found');
    }
    return response;
  }

  async find(
    entityFilterQuery?: FilterQuery<T>,
    projection?: Record<string, unknown>,
  ): Promise<T[] | null> {
    return await this.entityModel.find(entityFilterQuery, {
      _id: 0,
      __v: 0,
      ...projection,
    });
  }

  async findOneAndUpdate(
    entityFilterQuery: FilterQuery<T>,
    updateBaseData: UpdateQuery<unknown>,
  ): Promise<T | null> {
    try {
      updateBaseData.updatedAt = new Date();

      const result = await this.entityModel.findOneAndUpdate(
        entityFilterQuery,
        updateBaseData,
      );

      if (!result) {
        throw new BadRequestException('No record found');
      }
      return result;
    } catch (error) {
      throw new BadRequestException(error.message || error);
    }
  }

  async deleteOne(entityFilterQuery: FilterQuery<T>): Promise<boolean> {
    const deleteResult = await this.entityModel.deleteOne(entityFilterQuery);

    if (!deleteResult.deletedCount) {
      throw new BadRequestException('No record found');
    }
    return deleteResult.deletedCount === 1;
  }

  // Aggregate Queries

  async aggregateFindOne(
    key: StringMap,
    entityFilterQuery?: any,
  ): Promise<T[]> {
    const _relations = [];
    if (entityFilterQuery) {
      const relations = entityFilterQuery.relations;
      delete entityFilterQuery.relations;

      if (relations) {
        const rel = JSON.parse(relations);

        rel.forEach((r) => {
          _relations.push({
            $lookup: {
              from: `${r}`,
              localField: 'employeeNo',
              foreignField: 'employeeNo',
              as: `${r}`,
            },
          });
        });
      }
    }

    const pipeline = [
      ...this.aggregateQry.values(),
      {
        $match: {
          ...key,
        },
      },
      {
        $limit: 1,
      },
      ..._relations,
    ];

    const pLine = [...pipeline, ..._relations];
    const response = await this.entityModel.aggregate(pLine);
    return response[0];
  }

  async aggregateFind(entityFilterQuery?: any): Promise<T[]> {
    const pipeline = [...this.aggregateQry.values()];

    const relations = entityFilterQuery.relations;

    delete entityFilterQuery.relations;
    const params = entityFilterQuery;

    const keys = Object.keys(params);

    let n = keys.length;
    const toMatch = [];
    while (n--) {
      let value =
        isNaN(params[keys[n]]) || keys[n] === 'employeeNo'
          ? params[keys[n]].toLowerCase()
          : params[keys[n]];

      if (value === 'true' || value === 'false') {
        value = value === 'true';
      }
      if (typeof value === 'boolean') {
        toMatch.push({
          ['$expr']: { $eq: [`$${keys[n]}`, value] },
        });
      } else {
        toMatch.push({
          ['$expr']: { $eq: [{ $toLower: `$${keys[n]}` }, `${value}`] },
        });
      }
    }

    const match = toMatch.map((i) => {
      return { $match: i };
    });

    const _relations = [];

    if (relations) {
      const rel = JSON.parse(relations);

      rel.forEach((r) => {
        _relations.push({
          $lookup: {
            from: `${r}`,
            localField: 'employeeNo',
            foreignField: 'employeeNo',
            as: `${r}`,
          },
        });
      });
    }

    const pLine = [...pipeline, ...match, ..._relations];
    return this.entityModel.aggregate(pLine);
  }

  async aggregateFindByAttribute(
    key: any,
    entityFilterQuery?: any,
  ): Promise<T[]> {
    const _relations = [];

    if (entityFilterQuery) {
      const relations = entityFilterQuery.relations;
      delete entityFilterQuery.relations;

      if (relations) {
        const rel = JSON.parse(relations);

        rel.forEach((r) => {
          _relations.push({
            $lookup: {
              from: `${r}`,
              localField: 'employeeNo',
              foreignField: 'employeeNo',
              as: `${r}`,
            },
          });
        });
      }
    }

    const pipeline = [
      ...this.aggregateQry.values(),
      {
        $match: {
          ...key,
        },
      },

      ..._relations,
    ];

    return await this.entityModel.aggregate(pipeline);
  }

  async aggregateFindByEmployeeId(
    employeeNo: string,
    entityFilterQuery?: any,
  ): Promise<T[]> {
    const _relations = [];

    if (entityFilterQuery) {
      const relations = entityFilterQuery.relations;
      delete entityFilterQuery.relations;

      if (relations) {
        const rel = JSON.parse(relations);

        rel.forEach((r) => {
          _relations.push({
            $lookup: {
              from: `${r}`,
              localField: 'employeeNo',
              foreignField: 'employeeNo',
              as: `${r}`,
            },
          });
        });
      }
    }

    const pipeline = [
      ...this.aggregateQry.values(),
      {
        $match: {
          employeeNo: employeeNo,
        },
      },

      ..._relations,
    ];

    return await this.entityModel.aggregate(pipeline);
  }

  async search(entityFilterQuery?: any): Promise<T[]> {
    const pipeline = [...this.aggregateQry.values()];

    const relations = entityFilterQuery.relations;

    delete entityFilterQuery.relations;
    const params = entityFilterQuery;

    const keys = Object.keys(params);
    let n = keys.length;
    const toMatch = [];
    while (n--) {
      let value = isNaN(params[keys[n]])
        ? params[keys[n]].toUpperCase()
        : Number(params[keys[n]]);

      if (value === 'true' || value === 'false') {
        value = value === 'true';
      }
      if (typeof value === 'boolean') {
        toMatch.push({
          ['$expr']: { $eq: [`$${keys[n]}`, value] },
        });
      } else {
        if (keys[n] === 'isActive') {
          toMatch.push({
            [`${keys[n]}`]: value === 'TRUE',
          });
        } else {
          if (isNaN(Number(value))) {
            toMatch.push({
              [`${keys[n]}`]: { ['$regex']: value },
            });
          } else {
            toMatch.push({
              [`${keys[n]}`]: value,
            });
          }
        }
      }
    }

    const _relations = [];

    if (relations) {
      const rel = JSON.parse(relations);

      rel.forEach((r) => {
        _relations.push({
          $lookup: {
            from: `${r}`,
            localField: 'employeeNo',
            foreignField: 'employeeNo',
            as: `${r}`,
          },
        });
      });
    }

    const pLine = [...pipeline, ..._relations];
    if (toMatch.length > 0) {
      pLine.push({
        $match: {
          $or: [...toMatch],
        },
      });
    }
    return this.entityModel.aggregate(pLine);
  }

  findLast() {
    return this.entityModel.findOne({}, {}, { sort: { employeeNo: -1 } });
  }
}
