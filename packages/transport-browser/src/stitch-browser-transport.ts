import { Transport, Cursor, Result, StitchTransport } from 'mongosh-transport-core';
import i18n from 'mongosh-i18n';
import {
  AnonymousCredential,
  RemoteMongoClient,
  RemoteMongoDatabase,
  Stitch,
  StitchAppClient
} from 'mongodb-stitch-browser-sdk';

/**
 * Init error.
 */
const INIT_ERROR = 'transport-browser.stitch-browser-transport.auth-error';

/**
 * Atlas id.
 */
const ATLAS = 'mongodb-atlas';

/**
 * Encapsulates logic for communicating with a MongoDB instance via
 * Stitch in the browser.
 */
class StitchBrowserTransport implements Transport {
  readonly stitchTransport: StitchTransport<StitchAppClient, RemoteMongoClient>;

  /**
   * Create a StitchBrowserTransport from a Stitch app id.
   *
   * @param {String} stitchAppId - The Stitch app id.
   * @param {String} serviceName - The Stitch service name.
   *
   * @returns {Promise} The promise of the Stitch server transport.
   */
  static async fromAppId(
    stitchAppId: string,
    serviceName: string) : Promise<StitchBrowserTransport> {

    const client = Stitch.initializeDefaultAppClient(stitchAppId);
    try {
      await client.auth.loginWithCredential(new AnonymousCredential());
    } catch (err) {
      /* eslint no-console:0 */
      console.log(i18n.__(INIT_ERROR), err);
    }
    return new StitchBrowserTransport(client, serviceName);
  }

  /**
   * Run an aggregation pipeline.
   *
   * @note: Passing a null collection will cause the
   *   aggregation to run on the DB.
   *
   * @param {String} database - The database name.
   * @param {String} collection - The collection name.
   * @param {Array} pipeline - The aggregation pipeline.
   * @param {Object} options - The pipeline options.
   *
   * @returns {Cursor} The aggregation cursor.
   */
  aggregate(
    database: string,
    collection: string,
    pipeline: object[] = []) : any {

    return this.stitchTransport.aggregate(database, collection, pipeline);
  }

  /**
   * Not implemented in Stitch.
   *
   * @returns {Promise} The rejected promise.
   */
  bulkWrite() : Promise<Result> {
    return this.stitchTransport.bulkWrite();
  }

  /**
   * Get an exact document count from the collection.
   *
   * @param {String} database - The database name.
   * @param {String} collection - The collection name.
   * @param {Object} filter - The filter.
   * @param {Object} options - The count options.
   *
   * @returns {Promise} The promise of the count.
   */
  countDocuments(
    database: string,
    collection: string,
    filter: object = {},
    options: object = {}) : Promise<Result> {

    return this.stitchTransport.countDocuments(database, collection, filter, options);
  }

  /**
   * Instantiate a new Stitch server transport with a connected stitch
   * client instance.
   *
   * @param {Client} stitchClient - The Stitch client instance.
   * @param {String} serviceName - The Mongo service name.
   */
  constructor(stitchClient: StitchAppClient, serviceName: string = ATLAS) {
    const mongoClient = stitchClient.
      getServiceClient(RemoteMongoClient.factory, serviceName);
    this.stitchTransport =
      new StitchTransport<StitchAppClient, RemoteMongoClient>(stitchClient, mongoClient);
  }

  /**
   * Delete multiple documents from the collection.
   *
   * @param {String} database - The database name.
   * @param {String} collection - The collection name.
   * @param {Object} filter - The filter.
   * @param {Object} options - The delete many options.
   *
   * @returns {Promise} The promise of the result.
   */
  deleteMany(
    database: string,
    collection: string,
    filter: object = {}) : Promise<Result> {

    return this.stitchTransport.deleteMany(database, collection, filter);
  }

  /**
   * Delete one document from the collection.
   *
   * @param {String} database - The database name.
   * @param {String} collection - The collection name.
   * @param {Object} filter - The filter.
   * @param {Object} options - The delete one options.
   *
   * @returns {Promise} The promise of the result.
   */
  deleteOne(
    database: string,
    collection: string,
    filter: object = {}) : Promise<Result> {

    return this.stitchTransport.deleteOne(database, collection, filter);
  }

  /**
   * Not implemented in Stitch.
   *
   * @returns {Cursor} The unsupported cursor.
   */
  distinct() : Cursor {
    return this.stitchTransport.distinct();
  }

  /**
   * Not implemented in Stitch.
   *
   * @returns {Promise} The rejected promise.
   */
  estimatedDocumentCount() : Promise<Result> {
    return this.stitchTransport.estimatedDocumentCount();
  }

  /**
   * Find documents in the collection.
   *
   * @param {String} database - The database name.
   * @param {String} collection - The collection name.
   * @param {Object} filter - The filter.
   * @param {Object} options - The find options.
   *
   * @returns {Cursor} The cursor.
   */
  find(
    database: string,
    collection: string,
    filter: object = {},
    options: object = {}) : any {

    return this.stitchTransport.find(database, collection, filter, options);
  }

  /**
   * Find one document and delete it.
   *
   * @param {String} database - The database name.
   * @param {String} collection - The collection name.
   * @param {Object} filter - The filter.
   * @param {Object} options - The find options.
   *
   * @returns {Promise} The promise of the result.
   */
  findOneAndDelete(
    database: string,
    collection: string,
    filter: object = {},
    options: object = {}) : Promise<Result> {

    return this.stitchTransport.findOneAndDelete(database, collection, filter, options);
  }

  /**
   * Find one document and replace it.
   *
   * @param {String} database - The database name.
   * @param {String} collection - The collection name.
   * @param {Object} filter - The filter.
   * @param {Object} replacement - The replacement.
   * @param {Object} options - The find options.
   *
   * @returns {Promise} The promise of the result.
   */
  findOneAndReplace(
    database: string,
    collection: string,
    filter: object = {},
    replacement: object = {},
    options: object = {}) : Promise<Result> {

    return this.stitchTransport.findOneAndReplace(database, collection, filter, replacement, options);
  }

  /**
   * Find one document and update it.
   *
   * @param {String} database - The database name.
   * @param {String} collection - The collection name.
   * @param {Object} filter - The filter.
   * @param {(Object|Array)} update - The update.
   * @param {Object} options - The find options.
   *
   * @returns {Promise} The promise of the result.
   */
  findOneAndUpdate(
    database: string,
    collection: string,
    filter: object = {},
    update: object = {},
    options: object = {}) : Promise<Result> {

    return this.stitchTransport.findOneAndUpdate(database, collection, filter, update, options);
  }

  /**
   * Insert many documents into the colleciton.
   *
   * @param {String} database - The database name.
   * @param {String} collection - The collection name.
   * @param {Array} docs - The documents.
   * @param {Object} options - The insert many options.
   *
   * @returns {Promise} The promise of the result.
   */
  insertMany(
    database: string,
    collection: string,
    docs: object[] = [],
    options: object = {}) : Promise<Result> {

    return this.stitchTransport.insertMany(database, collection, docs);
  }

  /**
   * Insert one document into the collection.
   *
   * @param {String} database - The database name.
   * @param {String} collection - The collection name.
   * @param {Object} doc - The document.
   * @param {Object} options - The insert one options.
   *
   * @returns {Promise} The promise of the result.
   */
  insertOne(
    database: string,
    collection: string,
    doc: object = {},
    options: object = {}) : Promise<Result> {

    return this.stitchTransport.insertOne(database, collection, doc);
  }

  /**
   * Not implemented in Stitch.
   *
   * @returns {Promise} The rejected promise.
   */
  replaceOne() : Promise<Result> {
    return this.stitchTransport.replaceOne();
  }

  /**
   * Not implemented in Stitch.
   *
   * @returns {Promise} The rejected promise.
   */
  runCommand() : Promise<Result> {
    return this.stitchTransport.runCommand();
  }

  /**
   * Update many document.
   *
   * @param {String} database - The database name.
   * @param {String} collection - The collection name.
   * @param {Object} filter - The filter.
   * @param {(Object|Array)} update - The updates.
   * @param {Object} options - The update options.
   *
   * @returns {Promise} The promise of the result.
   */
  updateMany(
    database: string,
    collection: string,
    filter: object = {},
    update: object = {},
    options: object = {}) : Promise<Result> {

    return this.stitchTransport.updateMany(database, collection, filter, update, options);
  }

  /**
   * Update a document.
   *
   * @param {String} database - The database name.
   * @param {String} collection - The collection name.
   * @param {Object} filter - The filter.
   * @param {(Object|Array)} update - The updates.
   * @param {Object} options - The update options.
   *
   * @returns {Promise} The promise of the result.
   */
  updateOne(
    database: string,
    collection: string,
    filter: object = {},
    update: object = {},
    options: object = {}) : Promise<Result> {

    return this.stitchTransport.updateOne(database, collection, filter, update, options);
  }

  /**
   * Get the current user id.
   *
   * @returns {String} The user id.
   */
  get userId() : string {
    return this.stitchTransport.userId;
  }
}

export default StitchBrowserTransport;
