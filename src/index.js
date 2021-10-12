const { clipboard, whisper } = require('@oliveai/ldk');

const writeWhisper = (labelV, body) => {
  whisper.create({
    label: labelV,
    onClose: () => {
      console.log(`Closed Whisper`);
    },
    components: [
      {
        body,
        type: whisper.WhisperComponentType.Markdown,
      },
    ],
  });
};

function convertLbsToKG(lb) {
  return lb / 2.2046;
}

function convertKgToLbs(kg) {
  return kg * 2.2046;
}

function convertFtToM(ft) {
  return ft / 3.2808;
}

function convertMToFt(m) {
  return m * 3.2808;
}

function convertFToC(f) {
  return (f - 32) / 1.8;
}

function convertCToF(c) {
  return c * 1.8 + 32;
}

function convertMphToKph(mph) {
  return mph * 1.609344;
}

function convertKphToMph(kph) {
  return kph / 1.609344;
}

async function converterCallback(incomingText) {
  const value = parseFloat(incomingText.split(/[^\d+]/)[0]);
  const unit = incomingText.split(/\d+/)[1];
  let resVal;
  let resUnit;
  console.log(unit);
  if (unit === null || unit === undefined) {
    return;
  }
  switch (unit.toLowerCase()) {
    case 'kg':
      resVal = convertKgToLbs(value);
      resUnit = 'lb';
      break;
    case 'lb':
      resVal = convertLbsToKG(value);
      resUnit = 'kg';
      break;
    case 'ft':
      resVal = convertFtToM(value);
      resUnit = 'm';
      break;
    case 'm':
      resVal = convertMToFt(value);
      resUnit = 'ft';
      break;
    case 'mph':
      resVal = convertMphToKph(value);
      resUnit = 'kph';
      break;
    case 'kph':
      resVal = convertKphToMph(value);
      resUnit = 'mph';
      break;
    case 'f':
      resVal = convertFToC(value);
      resUnit = 'c';
      break;
    case 'c':
      resVal = convertCToF(value);
      resUnit = 'f';
      break;
    default:
      return;
  }

  writeWhisper('Converter-Loop:', `${value}${unit} converts to ${resVal}${resUnit}`);
}

async function converterWhisper() {
  writeWhisper('Converter-Loop:', 'Starting Converter-Loop');
  clipboard.listen(true, converterCallback);
}

converterWhisper();
