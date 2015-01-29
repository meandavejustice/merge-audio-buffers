module.exports = mergeBuffers;

function mergeBuffers(buffers, ac) {
  var maxChannels = 0;
  var maxDuration = 0;
  for (var i = 0; i < buffers.length; i++) {
    if (buffers[i].numberOfChannels > maxChannels) {
      maxChannels = buffers[i].numberOfChannels;
    }
    if (buffers[i].duration > maxDuration) {
      maxDuration = buffers[i].duration;
    }
  }
  var out = ac.createBuffer(maxChannels,
                                 ac.sampleRate * maxDuration,
                                 ac.sampleRate);

  for (var j = 0; j < buffers.length; j++) {
    for (var srcChannel = 0; srcChannel < buffers[j].numberOfChannels; srcChannel++) {
      var outt = out.getChannelData(srcChannel);
      var inn = buffers[j].getChannelData(srcChannel);
      for (var i = 0; i < inn.length; i++) {
        outt[i] += inn[i];
      }
      out.getChannelData(srcChannel).set(outt, 0);
    }
  }
  return out;
}