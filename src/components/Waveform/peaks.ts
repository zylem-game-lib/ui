/**
 * Peak extraction for waveform drawing: folds PCM samples into `bins`
 * columns, each the largest absolute sample in its slice, normalised so the
 * loudest bin is 1 (silence stays 0).
 */

export interface PeakSource {
  /** One `Float32Array` per channel; channels are mixed by taking the max. */
  channels: readonly Float32Array[];
}

export function computePeaks(source: PeakSource | Float32Array, bins: number): Float32Array {
  const channels = source instanceof Float32Array ? [source] : source.channels;
  const count = Math.max(1, Math.floor(bins));
  const peaks = new Float32Array(count);
  const length = channels[0]?.length ?? 0;
  if (length === 0 || channels.length === 0) return peaks;
  const perBin = length / count;
  let loudest = 0;
  for (let bin = 0; bin < count; bin += 1) {
    const from = Math.floor(bin * perBin);
    const to = Math.min(length, Math.max(from + 1, Math.floor((bin + 1) * perBin)));
    let peak = 0;
    for (const channel of channels) {
      for (let i = from; i < to; i += 1) {
        const value = Math.abs(channel[i] ?? 0);
        if (value > peak) peak = value;
      }
    }
    peaks[bin] = peak;
    if (peak > loudest) loudest = peak;
  }
  if (loudest > 0 && loudest !== 1) {
    for (let bin = 0; bin < count; bin += 1) peaks[bin] = peaks[bin]! / loudest;
  }
  return peaks;
}

/** Peaks from a Web Audio `AudioBuffer` without depending on its type here. */
export function peaksFromAudioBuffer(
  buffer: { numberOfChannels: number; getChannelData(channel: number): Float32Array },
  bins: number,
): Float32Array {
  const channels: Float32Array[] = [];
  for (let channel = 0; channel < buffer.numberOfChannels; channel += 1) {
    channels.push(buffer.getChannelData(channel));
  }
  return computePeaks({ channels }, bins);
}
