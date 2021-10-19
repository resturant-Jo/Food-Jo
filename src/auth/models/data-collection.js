'use strict';

class DataCollection {
  constructor(model) {
    this.model = model;
  }

  async get(id) {
    try {
      let record = null;
      if (id) {
        record = await this.model.findAll({ where: { id: id } });
      } else {
        record = await this.model.findAll();
      }
      return record;
    } catch (error) {
      console.error(
        "can not read the record/s on ",
        this.model.name,
        ` where id=${id}`
      );
    }
  }
  async getByUserId(userId) {
    try {
      let record = null;
      if (userId) {
        record = await this.model.findAll({ where: {  userId } });
      } else {
        record = await this.model.findAll();
      }
      return record;
    } catch (error) {
      console.error(
        "can not read the record/s on ",
        this.model.name,
        ` where id=${userId}`
      );
    }
  }

  async create(record) {
    try {
      return await this.model.create(record);
    } catch (error) {
      console.error("can not create a new record on ", this.model.name);
    }
  }

  async update(id, data) {
    try {
      let currentRecord = await this.model.findOne({ where: { id } });
      let updatedRecord = await currentRecord.update(data);
      return updatedRecord;
    } catch (error) { }
  }

  async delete(id) {
    if (!id) {
      throw new Error("no id provided !, for model ", this.model.name);
    }
    try {
      let deletedRecord = await this.model.destroy({ where: { id } });
      return deletedRecord;
    } catch (error) {
      console.error(
        " can not delete the record on ",
        this.model.name,
        ` where is id=${id}`
      );
    }
  }
  async deleteByCartId(cartId) {
    if (!cartId) {
      throw new Error("no id provided !, for model ", this.model.name);
    }
    try {
      let deletedRecord = await this.model.destroy({ where: { cartId } });
      return deletedRecord;
    } catch (error) {
      console.error(
        " can not delete the record on ",
        this.model.name,
        ` where is id=${cartId}`
      );
    }
  }
  async deleteByFoodId(foodId) {
    if (!foodId) {
      throw new Error("no id provided !, for model ", this.model.name);
    }
    try {
      let deletedRecord = await this.model.destroy({ where: { foodId } });
      return deletedRecord;
    } catch (error) {
      console.error(
        " can not delete the record on ",
        this.model.name,
        ` where is id=${foodId}`
      );
    }
  }

  async getfav(id) {
    try {
      let record = null;
      if (id) {
        record = await this.model.findOne({ where: { id } });
      }
      return record;
    } catch (error) {
      console.error(
        "can not read the record/s on ",
        this.model.name,
        ` where id=${id}`
      );
    }
  }



  async getActiveCartByUserId(userId) {
    try {
      let record = null;
      if (userId) {
        record = await this.model.findOne({ where: { userId, status: true } });
      }
      return record;
    } catch (error) {
      console.error(
        "can not read the record/s on ",
        this.model.name,
        ` where id=${userId}`
      );
    }
  }
  async getCartByUserId(userId) {
    try {
      let record = null;
      if (userId) {
        record = await this.model.findAll({ where: { userId } });
      }
      return record;
    } catch (error) {
      console.error(
        "can not read the record/s on ",
        this.model.name,
        ` where id=${userId}`
      );
    }
  }
  async getItemsByCartId(cartId) {
    try {
      let record = null;
      if (cartId) {
        record = await this.model.findAll({ where: { cartId } });
      }
      return record;
    } catch (error) {
      console.error(
        "can not read the record/s on ",
        this.model.name,
        ` where id=${cartId}`
      );
    }
  }

  async getFoodById(id) {
    try {
      let record = null;
      if (id) {
        record = await this.model.findOne({ where: { id } });
      }
      return record;
    } catch (error) {
      console.error(
        "can not read the record/s on ",
        this.model.name,
        ` where id=${id}`
      );
    }
  }

  async getItemsByFavId(favId) {
    try {
      let record = null;
      if (favId) {
        record = await this.model.findAll({ where: { favId } });
      }
      return record;
    } catch (error) {
      console.error(
        "can not read the record/s on ",
        this.model.name,
        ` where id=${favId}`
      );
    }
  }

  async getcart(id) {
    try {
      let record = null;
      if (id) {
        record = await this.model.findAll({ where: { id } });
      }
      return record;
    } catch (error) {
      console.error(
        "can not read the record/s on ",
        this.model.name,
        ` where id=${id}`
      );
    }
  }



}

module.exports = DataCollection;