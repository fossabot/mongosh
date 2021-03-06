import CompassServiceProvider from './compass-service-provider';
import { NodeTransport } from 'mongosh-transport-server';
import { expect } from 'chai';
import sinon from 'sinon';

describe('CompassServiceProvider', () => {

  describe('fromDataService', () => {
    it('creates a new CompassServiceProvider', () => {
      const instance = CompassServiceProvider.fromDataService({
        client: {
          client: {}
        }
      });

      expect(instance).to.be.instanceOf(CompassServiceProvider);
    });
  });

  describe('#aggregate', () => {
    let serviceProvider;
    const pipeline = [{ $match: { name: 'Aphex Twin' }}];
    const aggResult = [{ name: 'Aphex Twin' }];
    const aggMock = sinon.mock().withArgs('music', 'bands', pipeline, {}, {}).
      returns({ toArray: () => Promise.resolve(aggResult) });

    beforeEach(() => {
      const transportStub = sinon.createStubInstance(NodeTransport, {
        aggregate: aggMock
      });
      serviceProvider = new CompassServiceProvider(transportStub);
    });

    afterEach(() => {
      serviceProvider = null;
    });

    it('executes the command against the database', async() => {
      const cursor = await serviceProvider.aggregate('music', 'bands', pipeline);
      const result = await cursor.toArray();
      expect(result).to.deep.equal(aggResult);
      aggMock.verify();
    });
  });

  describe('#bulkWrite', () => {
    let serviceProvider;
    const requests = [{ insertOne: { name: 'Aphex Twin' }}];
    const commandResult = { result: { nInserted: 1, ok: 1 }};
    const bulkMock = sinon.mock().once().withArgs('music', 'bands', requests, {}, {}).
      resolves(commandResult);

    beforeEach(() => {
      const transportStub = sinon.createStubInstance(NodeTransport, {
        bulkWrite: bulkMock
      });
      serviceProvider = new CompassServiceProvider(transportStub);
    });

    afterEach(() => {
      serviceProvider = null;
    });

    it('executes the command against the database', async() => {
      const result = await serviceProvider.bulkWrite('music', 'bands', requests);
      expect(result).to.deep.equal(commandResult);
      bulkMock.verify();
    });
  });

  describe('#countDocuments', () => {
    let serviceProvider;
    const countResult = 10;
    const countMock = sinon.mock().once().withArgs('music', 'bands', {}, {}).
      resolves(countResult);

    beforeEach(() => {
      const transportStub = sinon.createStubInstance(NodeTransport, {
        countDocuments: countMock
      });
      serviceProvider = new CompassServiceProvider(transportStub);
    });

    afterEach(() => {
      serviceProvider = null;
    });

    it('executes the command against the database', async() => {
      const result = await serviceProvider.countDocuments('music', 'bands');
      expect(result).to.deep.equal(countResult);
      countMock.verify();
    });
  });

  describe('#deleteMany', () => {
    let serviceProvider;
    const commandResult = { result: { n: 1, ok: 1 }};
    const deleteMock = sinon.mock().once().withArgs('music', 'bands', {}, {}, {}).
      resolves(commandResult);

    beforeEach(() => {
      const transportStub = sinon.createStubInstance(NodeTransport, {
        deleteMany: deleteMock
      });
      serviceProvider = new CompassServiceProvider(transportStub);
    });

    afterEach(() => {
      serviceProvider = null;
    });

    it('executes the command against the database', async() => {
      const result = await serviceProvider.deleteMany('music', 'bands', {});
      expect(result).to.deep.equal(commandResult);
      deleteMock.verify();
    });
  });

  describe('#deleteOne', () => {
    let serviceProvider;
    const commandResult = { result: { n: 1, ok: 1 }};
    const deleteMock = sinon.mock().once().withArgs('music', 'bands', {}, {}, {}).
      resolves(commandResult);

    beforeEach(() => {
      const transportStub = sinon.createStubInstance(NodeTransport, {
        deleteOne: deleteMock
      });
      serviceProvider = new CompassServiceProvider(transportStub);
    });

    afterEach(() => {
      serviceProvider = null;
    });

    it('executes the command against the database', async() => {
      const result = await serviceProvider.deleteOne('music', 'bands', {});
      expect(result).to.deep.equal(commandResult);
      deleteMock.verify();
    });
  });

  describe('#distinct', () => {
    let serviceProvider;
    const distinctResult = [ 'Aphex Twin' ];
    const distinctMock = sinon.mock().once().
      withArgs('music', 'bands', 'name', {}, {}).resolves(distinctResult);

    beforeEach(() => {
      const transportStub = sinon.createStubInstance(NodeTransport, {
        distinct: distinctMock
      });
      serviceProvider = new CompassServiceProvider(transportStub);
    });

    afterEach(() => {
      serviceProvider = null;
    });

    it('executes the command against the database', async() => {
      const result = await serviceProvider.distinct('music', 'bands', 'name');
      expect(result).to.deep.equal(distinctResult);
      distinctMock.verify();
    });
  });

  describe('#estimatedDocumentCount', () => {
    let serviceProvider;
    const countResult = 10;
    const countMock = sinon.mock().once().withArgs('music', 'bands', {}, {}).resolves(countResult);

    beforeEach(() => {
      const transportStub = sinon.createStubInstance(NodeTransport, {
        estimatedDocumentCount: countMock
      });
      serviceProvider = new CompassServiceProvider(transportStub);
    });

    afterEach(() => {
      serviceProvider = null;
    });

    it('executes the command against the database', async() => {
      const result = await serviceProvider.estimatedDocumentCount('music', 'bands');
      expect(result).to.deep.equal(countResult);
      countMock.verify();
    });
  });

  describe('#find', () => {
    let serviceProvider;
    const filter = { name: 'Aphex Twin' };
    const findResult = [{ name: 'Aphex Twin' }];
    const findMock = sinon.mock().withArgs('music', 'bands', filter).
      returns({ toArray: () => Promise.resolve(findResult) });

    beforeEach(() => {
      const transportStub = sinon.createStubInstance(NodeTransport, {
        find: findMock
      });
      serviceProvider = new CompassServiceProvider(transportStub);
    });

    afterEach(() => {
      serviceProvider = null;
    });

    it('executes the command against the database', async() => {
      const cursor = await serviceProvider.find('music', 'bands', filter);
      const result = await cursor.toArray();
      expect(result).to.deep.equal(findResult);
      findMock.verify();
    });
  });

  describe('#findOneAndDelete', () => {
    let serviceProvider;
    const commandResult = { result: { n: 1, ok: 1 }};
    const findMock = sinon.mock().once().withArgs('music', 'bands', {}).
      resolves(commandResult);

    beforeEach(() => {
      const transportStub = sinon.createStubInstance(NodeTransport, {
        findOneAndDelete: findMock
      });
      serviceProvider = new CompassServiceProvider(transportStub);
    });

    afterEach(() => {
      serviceProvider = null;
    });

    it('executes the command against the database', async() => {
      const result = await serviceProvider.findOneAndDelete('music', 'bands', {});
      expect(result).to.deep.equal(commandResult);
      findMock.verify();
    });
  });

  describe('#findOneAndReplace', () => {
    let serviceProvider;
    const commandResult = { result: { n: 1, ok: 1 }};
    const filter = { name: 'Aphex Twin' };
    const replacement = { name: 'Richard James' };
    const findMock = sinon.mock().once().withArgs('music', 'bands', filter, replacement).
      resolves(commandResult);

    beforeEach(() => {
      const transportStub = sinon.createStubInstance(NodeTransport, {
        findOneAndReplace: findMock
      });
      serviceProvider = new CompassServiceProvider(transportStub);
    });

    afterEach(() => {
      serviceProvider = null;
    });

    it('executes the command against the database', async() => {
      const result = await serviceProvider.
        findOneAndReplace('music', 'bands', filter, replacement);
      expect(result).to.deep.equal(commandResult);
      findMock.verify();
    });
  });

  describe('#findOneAndUpdate', () => {
    let serviceProvider;
    const commandResult = { result: { n: 1, ok: 1 }};
    const filter = { name: 'Aphex Twin' };
    const update = { $set: { name: 'Richard James' }};
    const findMock = sinon.mock().once().withArgs('music', 'bands', filter, update).
      resolves(commandResult);

    beforeEach(() => {
      const transportStub = sinon.createStubInstance(NodeTransport, {
        findOneAndUpdate: findMock
      });
      serviceProvider = new CompassServiceProvider(transportStub);
    });

    afterEach(() => {
      serviceProvider = null;
    });

    it('executes the command against the database', async() => {
      const result = await serviceProvider.
        findOneAndUpdate('music', 'bands', filter, update);
      expect(result).to.deep.equal(commandResult);
      findMock.verify();
    });
  });

  describe('#insertMany', () => {
    let serviceProvider;
    const doc = { name: 'Aphex Twin' };
    const commandResult = { result: { n: 1, ok: 1 }};
    const insertMock = sinon.mock().once().withArgs('music', 'bands', [ doc ], {}).
      resolves(commandResult);

    beforeEach(() => {
      const transportStub = sinon.createStubInstance(NodeTransport, {
        insertMany: insertMock
      });
      serviceProvider = new CompassServiceProvider(transportStub);
    });

    afterEach(() => {
      serviceProvider = null;
    });

    it('executes the command against the database', async() => {
      const result = await serviceProvider.insertMany('music', 'bands', [ doc ]);
      expect(result).to.deep.equal(commandResult);
      insertMock.verify();
    });
  });

  describe('#insertOne', () => {
    let serviceProvider;
    const doc = { name: 'Aphex Twin' };
    const commandResult = { result: { n: 1, ok: 1 }};
    const insertMock = sinon.mock().once().withArgs('music', 'bands', doc, {}).
      resolves(commandResult);

    beforeEach(() => {
      const transportStub = sinon.createStubInstance(NodeTransport, {
        insertOne: insertMock
      });
      serviceProvider = new CompassServiceProvider(transportStub);
    });

    afterEach(() => {
      serviceProvider = null;
    });

    it('executes the command against the database', async() => {
      const result = await serviceProvider.insertOne('music', 'bands', doc);
      expect(result).to.deep.equal(commandResult);
      insertMock.verify();
    });
  });

  describe('#replaceOne', () => {
    let serviceProvider;
    const filter = { name: 'Aphex Twin' };
    const replacement = { name: 'Richard James' };
    const commandResult = { result: { n: 1, ok: 1 }};
    const replaceMock = sinon.mock().once().withArgs('music', 'bands', filter, replacement, {}).
      resolves(commandResult);

    beforeEach(() => {
      const transportStub = sinon.createStubInstance(NodeTransport, {
        replaceOne: replaceMock
      });
      serviceProvider = new CompassServiceProvider(transportStub);
    });

    afterEach(() => {
      serviceProvider = null;
    });

    it('executes the command against the database', async() => {
      const result = await serviceProvider.replaceOne('music', 'bands', filter, replacement);
      expect(result).to.deep.equal(commandResult);
      replaceMock.verify();
    });
  });

  describe('#runCommand', () => {
    let serviceProvider;
    const commandResult = { ismaster: true };
    const commandMock = sinon.mock().
      withArgs('admin', { ismaster: 1 }, {}).resolves(commandResult);

    beforeEach(() => {
      const transportStub = sinon.createStubInstance(NodeTransport, {
        runCommand: commandMock
      });
      serviceProvider = new CompassServiceProvider(transportStub);
    });

    afterEach(() => {
      serviceProvider = null;
    });

    it('executes the command against the database', async() => {
      const result = await serviceProvider.runCommand('admin', { ismaster: 1 });
      expect(result).to.deep.equal(commandResult);
      commandMock.verify();
    });
  });

  describe('#updateOne', () => {
    let serviceProvider;
    const filter = { name: 'Aphex Twin' };
    const update = { $set: { name: 'Richard James' }};
    const commandResult = { result: { n: 1, ok: 1 }};
    const updateMock = sinon.mock().once().withArgs('music', 'bands', filter, update, {}).
      resolves(commandResult);

    beforeEach(() => {
      const transportStub = sinon.createStubInstance(NodeTransport, {
        updateOne: updateMock
      });
      serviceProvider = new CompassServiceProvider(transportStub);
    });

    afterEach(() => {
      serviceProvider = null;
    });

    it('executes the command against the database', async() => {
      const result = await serviceProvider.updateOne('music', 'bands', filter, update);
      expect(result).to.deep.equal(commandResult);
      updateMock.verify();
    });
  });

  describe('#updateMany', () => {
    let serviceProvider;
    const filter = { name: 'Aphex Twin' };
    const update = { $set: { name: 'Richard James' }};
    const commandResult = { result: { n: 1, ok: 1 }};
    const updateMock = sinon.mock().once().withArgs('music', 'bands', filter, update, {}).
      resolves(commandResult);

    beforeEach(() => {
      const transportStub = sinon.createStubInstance(NodeTransport, {
        updateMany: updateMock
      });
      serviceProvider = new CompassServiceProvider(transportStub);
    });

    afterEach(() => {
      serviceProvider = null;
    });

    it('executes the command against the database', async() => {
      const result = await serviceProvider.updateMany('music', 'bands', filter, update);
      expect(result).to.deep.equal(commandResult);
      updateMock.verify();
    });
  });

  describe('#getServerVersion', () => {
    let serviceProvider;
    const commandMock = sinon.mock().
      withArgs('admin', { buildInfo: 1 }, {}).resolves({ version: '4.0.0' });

    beforeEach(() => {
      const transportStub = sinon.createStubInstance(NodeTransport, {
        runCommand: commandMock
      });
      serviceProvider = new CompassServiceProvider(transportStub);
    });

    afterEach(() => {
      serviceProvider = null;
    });

    it('executes the command against the database', async() => {
      const result = await serviceProvider.getServerVersion();
      expect(result).to.deep.equal('4.0.0');
      commandMock.verify();
    });
  });
});
