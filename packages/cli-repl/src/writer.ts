import util from 'util';

/**
 * Return the pretty string for the output.
 *
 * @param {any} output - The output.
 *
 * @returns {string} The output.
 */
function write(bus: any, output: any): string {
  if (output && output.toReplString) {
    return output.toReplString();
  }

  if (output && output.message && typeof output.stack === 'string') {
    bus.emit('error', output.message);

    return util.inspect(output, {
      showProxy: false,
      colors: true,
    });
  }

  if (typeof output === 'string') {
    return output;
  }
  return util.inspect(output, {
    showProxy: false,
    colors: true,
  });
}

export default write;
