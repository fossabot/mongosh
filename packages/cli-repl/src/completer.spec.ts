import completer from './completer';
import { types as shellTypes } from 'mongosh-shell-api';

import { expect } from 'chai';

describe('completer.completer', () => {
  context('when context is top level shell api', () => {
    it('matches shell completions', () => {
      const i = 'u';
      expect(completer('4.4.0', i)).to.deep.equal([['use'], i]);
    });

    it('does not have a match', () => {
      const i = 'ad';
      expect(completer('4.4.0', i)).to.deep.equal([[], i]);
    });

    it('is an exact match to one of shell completions', () => {
      const i = 'use';
      expect(completer('4.4.0', i)).to.deep.equal([[i], i]);
    });
  });

  context('when context is top level db', () => {
    // this should eventually encompass tests for DATABASE commands and
    // COLLECTION names.
    // for now, this will only return the current input.

    it('returns current input and no suggestions', () => {
      const i = 'db.shipw';
      expect(completer('4.4.0', i)).to.deep.equal([[], i]);
    });
  });

  context('when context is collections', () => {
    it('matches a collection command', () => {
      const i = 'db.shipwrecks.findAnd';
      expect(completer('4.4.0', i)).to.deep.equal([['db.shipwrecks.findAndModify'], i]);
    });

    it('matches a collection command if part of an expression', () => {
      const i = 'var result = db.shipwrecks.findAnd';
      expect(completer('4.4.0', i)).to.deep.equal([['var result = db.shipwrecks.findAndModify'], i]);
    });

    it('returns all suggestions', () => {
      const i = 'db.shipwrecks.';
      const collComplete = Object.keys(shellTypes.Collection.attributes)
      const adjusted = collComplete.map(c => `${i}${c}`)

      expect(completer('4.4.0', i)).to.deep.equal([adjusted, i]);
    });

    it('matches several collection commands', () => {
      const i = 'db.shipwrecks.find';
      expect(completer('4.4.0', i)).to.deep.equal([
        [
          'db.shipwrecks.find', 'db.shipwrecks.findAndModify',
          'db.shipwrecks.findOne', 'db.shipwrecks.findOneAndDelete',
          'db.shipwrecks.findOneAndReplace', 'db.shipwrecks.findOneAndUpdate'
        ], i]);
    });

    it('does not have a match', () => {
      const i = 'db.shipwrecks.pr';
      expect(completer('4.4.0', i)).to.deep.equal([[], i]);
    });
  });

  context('when context is collections and aggregation cursor', () => {
    it('matches an aggregation cursor command', () => {
      const i = 'db.shipwrecks.aggregate([{$sort: {feature_type: 1}}]).has';
      expect(completer('4.4.0', i)).to.deep.equal([
        ['db.shipwrecks.aggregate([{$sort: {feature_type: 1}}]).hasNext'], i]);
    });

    it('returns all suggestions', () => {
      const i = 'db.shipwrecks.aggregate([{$sort: {feature_type: 1}}]).';
      const aggCursorComplete = Object.keys(shellTypes.AggregationCursor.attributes)
      const adjusted = aggCursorComplete.map(c => `${i}${c}`)

      expect(completer('4.4.0', i)).to.deep.equal([adjusted, i]);
    });

    it('does not have a match', () => {
      const i = 'db.shipwrecks.aggregate([{$sort: {feature_type: 1}}]).w';
      expect(completer('4.4.0', i)).to.deep.equal([[], i]);
    });

    it('has several matches', () => {
      const i = 'db.shipwrecks.aggregate([{$sort: {feature_type: 1}}]).i';
      expect(completer('4.4.0', i)).to.deep.equal([
        [
          'db.shipwrecks.aggregate([{$sort: {feature_type: 1}}]).isClosed',
          'db.shipwrecks.aggregate([{$sort: {feature_type: 1}}]).isExhausted',
          'db.shipwrecks.aggregate([{$sort: {feature_type: 1}}]).itcount'
        ], i]);
    });
  });

  context('when context is collections and collection cursor', () => {
    it('matches a collection cursor command', () => {
      const i = 'db.shipwrecks.find({feature_type: "Wrecks - Visible"}).for';
      expect(completer('4.4.0', i)).to.deep.equal([
        ['db.shipwrecks.find({feature_type: "Wrecks - Visible"}).forEach'], i]);
    });

    it('returns all suggestions running on 4.4.0 version', () => {
      const i = 'db.shipwrecks.find({feature_type: "Wrecks - Visible"}).';

      const result = [
				'db.shipwrecks.find({feature_type: \"Wrecks - Visible\"}).allowPartialResults',
				'db.shipwrecks.find({feature_type: \"Wrecks - Visible\"}).arrayAccess',
				'db.shipwrecks.find({feature_type: \"Wrecks - Visible\"}).batchSize',
				'db.shipwrecks.find({feature_type: \"Wrecks - Visible\"}).clone',
				'db.shipwrecks.find({feature_type: \"Wrecks - Visible\"}).close',
				'db.shipwrecks.find({feature_type: \"Wrecks - Visible\"}).collation',
				'db.shipwrecks.find({feature_type: \"Wrecks - Visible\"}).comment',
				'db.shipwrecks.find({feature_type: \"Wrecks - Visible\"}).count',
				'db.shipwrecks.find({feature_type: \"Wrecks - Visible\"}).explain',
				'db.shipwrecks.find({feature_type: \"Wrecks - Visible\"}).forEach',
				'db.shipwrecks.find({feature_type: \"Wrecks - Visible\"}).getQueryPlan',
				'db.shipwrecks.find({feature_type: \"Wrecks - Visible\"}).hasNext',
				'db.shipwrecks.find({feature_type: \"Wrecks - Visible\"}).hint',
				'db.shipwrecks.find({feature_type: \"Wrecks - Visible\"}).isClosed',
				'db.shipwrecks.find({feature_type: \"Wrecks - Visible\"}).isExhausted',
				'db.shipwrecks.find({feature_type: \"Wrecks - Visible\"}).itcount',
				'db.shipwrecks.find({feature_type: \"Wrecks - Visible\"}).length',
				'db.shipwrecks.find({feature_type: \"Wrecks - Visible\"}).limit',
				'db.shipwrecks.find({feature_type: \"Wrecks - Visible\"}).map',
				'db.shipwrecks.find({feature_type: \"Wrecks - Visible\"}).max',
				'db.shipwrecks.find({feature_type: \"Wrecks - Visible\"}).maxTimeMS',
				'db.shipwrecks.find({feature_type: \"Wrecks - Visible\"}).min',
				'db.shipwrecks.find({feature_type: \"Wrecks - Visible\"}).modifiers',
				'db.shipwrecks.find({feature_type: \"Wrecks - Visible\"}).next',
				'db.shipwrecks.find({feature_type: \"Wrecks - Visible\"}).noCursorTimeout',
				'db.shipwrecks.find({feature_type: \"Wrecks - Visible\"}).objsLeftInBatch',
				'db.shipwrecks.find({feature_type: \"Wrecks - Visible\"}).oplogReplay',
				'db.shipwrecks.find({feature_type: \"Wrecks - Visible\"}).projection',
				'db.shipwrecks.find({feature_type: \"Wrecks - Visible\"}).pretty',
				'db.shipwrecks.find({feature_type: \"Wrecks - Visible\"}).readConcern',
				'db.shipwrecks.find({feature_type: \"Wrecks - Visible\"}).readOnly',
				'db.shipwrecks.find({feature_type: \"Wrecks - Visible\"}).readPref',
				'db.shipwrecks.find({feature_type: \"Wrecks - Visible\"}).returnKey',
				'db.shipwrecks.find({feature_type: \"Wrecks - Visible\"}).showDiskLoc',
				'db.shipwrecks.find({feature_type: \"Wrecks - Visible\"}).showRecordId',
				'db.shipwrecks.find({feature_type: \"Wrecks - Visible\"}).size',
				'db.shipwrecks.find({feature_type: \"Wrecks - Visible\"}).skip',
				'db.shipwrecks.find({feature_type: \"Wrecks - Visible\"}).sort',
				'db.shipwrecks.find({feature_type: \"Wrecks - Visible\"}).tailable',
				'db.shipwrecks.find({feature_type: \"Wrecks - Visible\"}).toArray',
      ]

      expect(completer('4.4.0', i)).to.deep.equal([result, i]);
    });

    it('returns all suggestions matching 3.0.0 version', () => {
      const i = 'db.shipwrecks.find({feature_type: "Wrecks - Visible"}).';

      const result = [
				'db.shipwrecks.find({feature_type: \"Wrecks - Visible\"}).addOption',
				'db.shipwrecks.find({feature_type: \"Wrecks - Visible\"}).allowPartialResults',
				'db.shipwrecks.find({feature_type: \"Wrecks - Visible\"}).arrayAccess',
				'db.shipwrecks.find({feature_type: \"Wrecks - Visible\"}).batchSize',
				'db.shipwrecks.find({feature_type: \"Wrecks - Visible\"}).clone',
				'db.shipwrecks.find({feature_type: \"Wrecks - Visible\"}).close',
				'db.shipwrecks.find({feature_type: \"Wrecks - Visible\"}).count',
				'db.shipwrecks.find({feature_type: \"Wrecks - Visible\"}).explain',
				'db.shipwrecks.find({feature_type: \"Wrecks - Visible\"}).forEach',
				'db.shipwrecks.find({feature_type: \"Wrecks - Visible\"}).getQueryPlan',
				'db.shipwrecks.find({feature_type: \"Wrecks - Visible\"}).hasNext',
				'db.shipwrecks.find({feature_type: \"Wrecks - Visible\"}).hint',
				'db.shipwrecks.find({feature_type: \"Wrecks - Visible\"}).isClosed',
				'db.shipwrecks.find({feature_type: \"Wrecks - Visible\"}).isExhausted',
				'db.shipwrecks.find({feature_type: \"Wrecks - Visible\"}).itcount',
				'db.shipwrecks.find({feature_type: \"Wrecks - Visible\"}).length',
				'db.shipwrecks.find({feature_type: \"Wrecks - Visible\"}).limit',
				'db.shipwrecks.find({feature_type: \"Wrecks - Visible\"}).map',
				'db.shipwrecks.find({feature_type: \"Wrecks - Visible\"}).max',
				'db.shipwrecks.find({feature_type: \"Wrecks - Visible\"}).maxScan',
				'db.shipwrecks.find({feature_type: \"Wrecks - Visible\"}).maxTimeMS',
				'db.shipwrecks.find({feature_type: \"Wrecks - Visible\"}).min',
				'db.shipwrecks.find({feature_type: \"Wrecks - Visible\"}).modifiers',
				'db.shipwrecks.find({feature_type: \"Wrecks - Visible\"}).next',
				'db.shipwrecks.find({feature_type: \"Wrecks - Visible\"}).noCursorTimeout',
				'db.shipwrecks.find({feature_type: \"Wrecks - Visible\"}).objsLeftInBatch',
				'db.shipwrecks.find({feature_type: \"Wrecks - Visible\"}).oplogReplay',
				'db.shipwrecks.find({feature_type: \"Wrecks - Visible\"}).projection',
				'db.shipwrecks.find({feature_type: \"Wrecks - Visible\"}).pretty',
				'db.shipwrecks.find({feature_type: \"Wrecks - Visible\"}).readOnly',
				'db.shipwrecks.find({feature_type: \"Wrecks - Visible\"}).readPref',
				'db.shipwrecks.find({feature_type: \"Wrecks - Visible\"}).showDiskLoc',
				'db.shipwrecks.find({feature_type: \"Wrecks - Visible\"}).showRecordId',
				'db.shipwrecks.find({feature_type: \"Wrecks - Visible\"}).size',
				'db.shipwrecks.find({feature_type: \"Wrecks - Visible\"}).skip',
				'db.shipwrecks.find({feature_type: \"Wrecks - Visible\"}).snapshot',
				'db.shipwrecks.find({feature_type: \"Wrecks - Visible\"}).sort',
				'db.shipwrecks.find({feature_type: \"Wrecks - Visible\"}).toArray',
      ]

      expect(completer('3.0.0', i)).to.deep.equal([result, i]);
    });

    it('does not have a match', () => {
      const i = 'db.shipwrecks.find({feature_type: "Wrecks - Visible"}).gre';
      expect(completer('4.4.0', i)).to.deep.equal([[], i]);
    });

    it('has several matches', () => {
      const i = 'db.shipwrecks.find({feature_type: "Wrecks - Visible"}).cl';
      expect(completer('4.4.0', i)).to.deep.equal([
        [
          'db.shipwrecks.find({feature_type: "Wrecks - Visible"}).clone',
          'db.shipwrecks.find({feature_type: "Wrecks - Visible"}).close'
        ], i]);
    });
  });
});
