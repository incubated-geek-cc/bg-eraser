document.addEventListener('DOMContentLoaded', async () => {
    console.log('DOMContentLoaded');

    const yearDisplay = document.querySelector('#yearDisplay');
    yearDisplay.innerHTML = new Date().getFullYear();

    const millisecondsToDatetimeStr = (milliseconds) => {
      const dateObject = new Date(milliseconds);

      const dateYear=dateObject.getFullYear();
      const dateMonth=(((dateObject.getMonth()+1))<10) ? `0${((dateObject.getMonth()+1))}` : ((dateObject.getMonth()+1));
      const dateDay=((dateObject.getDate())<10) ? `0${(dateObject.getDate())}` : (dateObject.getDate());

      const datetimeHours=(((dateObject.getHours()))<10) ? `0${((dateObject.getHours()))}` : ((dateObject.getHours()));
      const datetimeMinutes=(((dateObject.getMinutes()))<10) ? `0${((dateObject.getMinutes()))}` : ((dateObject.getMinutes()));
      const datetimeSeconds=(((dateObject.getSeconds()))<10) ? `0${((dateObject.getSeconds()))}` : ((dateObject.getSeconds()));

      const datetimeStr=`${dateYear}-${dateMonth}-${dateDay} ${datetimeHours}:${datetimeMinutes}:${datetimeSeconds}`;

      return datetimeStr;
    };

    const acceptedFileTypes = ['.png', '.jpg', '.jpeg', '.webp'];
    const fileFormatErr = '⚠ 𝗨𝗽𝗹𝗼𝗮𝗱𝗲𝗱 𝗳𝗶𝗹𝗲 𝘁𝘆𝗽𝗲 𝗶𝘀 𝗻𝗼𝘁 𝘀𝘂𝗽𝗽𝗼𝗿𝘁𝗲𝗱. 𝗟𝗶𝘀𝘁 𝗼𝗳 𝘀𝘂𝗽𝗽𝗼𝗿𝘁𝗲𝗱 𝗳𝗶𝗹𝗲 𝗳𝗼𝗿𝗺𝗮𝘁𝘀 𝗮𝗿𝗲:' + '\n' +
    '◾ .𝗉𝗇𝗀' + '\n' +
    '◾ .𝗃𝗉𝗀' + '\n' +
    '◾ .𝗃𝗉𝖾𝗀' + '\n' +
    '◾ .𝗐𝖾𝖻𝗉' + '\n' +
    '𝘗𝘭𝘦𝘢𝘴𝘦 𝘵𝘳𝘺 𝘢𝘨𝘢𝘪𝘯.';

    if (!window.FileReader) {
        alert('⛔ WARNING: Your browser does not support HTML5 \'FileReader\' function required to open a file.');
        return;
    }
    if (!window.Blob) {
        alert('⛔ WARNING: Your browser does not support HTML5 \'Blob\' function required to save a file.');
        return;
    }

    const resetBtn=document.querySelector('#resetBtn');
    const fileInput = document.querySelector('#file-input');
    const dropFileZone = document.querySelector('#dropFileZone');
    const dropFileZoneCaption = document.querySelector('#dropFileZoneCaption');
    const dropFileInnerZone = document.querySelector('label[for="file-input"]');
    const loadingSpinner = document.querySelector('#loadingSpinner');

    const previewOutputTable = document.querySelector('#previewOutputTable');
    const previewUploadedImage = document.querySelector('#previewUploadedImage');
    const previewOutputImage = document.querySelector('#previewOutputImage');

    const saveImageBtn=document.querySelector('#saveImageBtn');

    const fileName=document.querySelector('#fileName');
    const fileSize=document.querySelector('#fileSize');
    const imgDimensions=document.querySelector('#imgDimensions');
    const fileType=document.querySelector('#fileType');
    const lastModified=document.querySelector('#lastModified');

    const modelForm=document.querySelector('form[name="model-choice-form"]');

    var _img,_canvas;

    const IMAGE_WIDTH = 320;
    const IMAGE_HEIGHT = 320;
    const IMAGE_CHANNELS = 3;

    const byteToKBScale = 0.0009765625;

    const mean = [0.485, 0.456, 0.406];
    const std = [0.229, 0.224, 0.225];

    saveImageBtn.addEventListener('click', (evt)=> {
        let downloadLink=document.createElement('a');
        downloadLink.href=saveImageBtn.value;
        downloadLink.target='_blank';

        let modelUsed=Object.fromEntries(new FormData(modelForm))['model'];
        let fileExt=(fileName.innerText).substr((fileName.innerText).lastIndexOf('.')+1);
        downloadLink.download= (fileName.innerText).replace(`.${fileExt}`,`_${modelUsed}.${fileExt}`);
        downloadLink.click();
    });

    fileInput.addEventListener('click', (evt) => {
        evt.currentTarget.value = '';
    });
    fileInput.addEventListener('change', async (evt) => {
        let file = evt.currentTarget.files[0];
        const resultStatus = await importFile(file);
        saveImageBtn.value=_canvas.toDataURL();
    });
    dropFileZone.addEventListener('dragenter', (e) => {
        e.preventDefault();
        e.stopPropagation();
        dropFileZoneCaption.classList.add('bg-custom-two-05');
    });
    dropFileZone.addEventListener('dragleave', (e) => {
        e.preventDefault();
        e.stopPropagation();
        dropFileZoneCaption.classList.remove('bg-custom-two-05');
    });
    dropFileZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        e.stopPropagation();
        dropFileZoneCaption.classList.add('bg-custom-two-05');
    });

    dropFileZone.addEventListener("drop", async (e) => {
        e.preventDefault();
        e.stopPropagation();
        dropFileZoneCaption.classList.remove("bg-custom-two-05");
        fileInput.value = '';

        let draggedData = e.dataTransfer;
        let file = draggedData.files[0];
        const resultStatus = await importFile(file);
        saveImageBtn.value=_canvas.toDataURL();
    });


    function readFileAsDataURL(file) {
      return new Promise((resolve,reject) => {
          let fileredr = new FileReader();
          fileredr.onload = () => resolve(fileredr.result);
          fileredr.onerror = () => reject(fileredr);
          fileredr.readAsDataURL(file);
      });
    }

    const loadImage = (url) => new Promise((resolve, reject) => {
      const img = new Image();
      img.addEventListener('load', () => resolve(img));
      img.addEventListener('error', (err) => reject(err));
      img.src = url;
    });

    function toggleLoadingSpinner(show) {
        loadingSpinner.style.display = show ? 'inline-block' : 'none';
    }
    function toggleDropArea(show) {
        dropFileZoneCaption.style.display = show ? 'inline-block' : 'none';
    }
    function toggleOutputTable(show) {
        previewOutputTable.style.display = show ? 'table' : 'none';
    }
    function toggleSaveBtn(show) {
        saveImageBtn.style.display = show ? 'inline-block' : 'none';
    }
    
    async function initializeSession(modelPath, options) {
        return await ort.InferenceSession.create(modelPath, options);
    }

    function preprocessImage(image, width, height, mean, std) {
        const offscreenCanvas = document.createElement("canvas");
        const offscreenCtx = offscreenCanvas.getContext("2d");
        offscreenCanvas.width = width;
        offscreenCanvas.height = height;
        offscreenCtx.drawImage(image, 0, 0, width, height);

        const imageData = offscreenCtx.getImageData(0, 0, width, height);
        const data = imageData.data;

        const pixels = new Float32Array(1 * IMAGE_CHANNELS * width * height);

        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                const index = (y * width + x) * 4;
                const r = (data[index] / 255 - mean[0]) / std[0];
                const g = (data[index + 1] / 255 - mean[1]) / std[1];
                const b = (data[index + 2] / 255 - mean[2]) / std[2];

                const newIndex = y * width + x;
                pixels[newIndex] = r;
                pixels[newIndex + width * height] = g;
                pixels[newIndex + 2 * width * height] = b;
            }
        }
        return new ort.Tensor("float32", pixels, [1, IMAGE_CHANNELS, width, height]);
      }

      
      async function importFile(file) {
        if (!file) {
          return;
        }
        toggleDropArea(false);
        toggleLoadingSpinner(true);
        toggleOutputTable(true);


        fileName.innerHTML=file.name;
        fileSize.innerHTML=`${(parseFloat(file.size) * byteToKBScale).toFixed(2)} 𝙺𝙱`;
        fileType.innerHTML=file.type;
        lastModified.innerHTML=millisecondsToDatetimeStr(file.lastModified);

        let fname = (file.name);
        let ext = fname.substr(fname.lastIndexOf('.'));
        if (!acceptedFileTypes.includes(ext)) {
            alert(fileFormatErr);
            return;
        }

        try {
            const sessionModel = await initializeSession(`./models/${Object.fromEntries(new FormData(modelForm))['model']}`, {
                executionProviders: ["webgpu", "wasm"]
            });
            const sessionProcessor = await initializeSession("./models/output_processor.onnx", {
                executionProviders: ["wasm"]
            });

            let b64Str = await readFileAsDataURL(file);
            _img = await loadImage(b64Str);
            previewUploadedImage.appendChild(_img);
            await new Promise((resolve, reject) => setTimeout(resolve, 50));

            let imgW=_img.naturalWidth;
            let imgH=_img.naturalHeight;
            imgDimensions.innerHTML=`${imgW}px × ${imgH}px`;

            _canvas = document.createElement("canvas");
            _canvas.width = _img.width;
            _canvas.height = _img.height;

            const ctx = _canvas.getContext("2d");
            ctx.drawImage(_img, 0, 0);
            await new Promise((resolve, reject) => setTimeout(resolve, 50));
            previewOutputImage.appendChild(_canvas);
            await new Promise((resolve, reject) => setTimeout(resolve, 50));

            const imageDataSource = ctx.getImageData(0, 0, _img.width, _img.height);
            await new Promise((resolve, reject) => setTimeout(resolve, 50));


            const pixelsTensor = preprocessImage(_img, IMAGE_WIDTH, IMAGE_HEIGHT, mean, std);
            const inputDictModel = { ["input.1"]: pixelsTensor };
            await new Promise((resolve, reject) => setTimeout(resolve, 50));

            const outputModel = await sessionModel.run(inputDictModel);
            const mask = outputModel["1959"].data;
            const maskTensor = new ort.Tensor("float32", mask, [1, IMAGE_WIDTH, IMAGE_HEIGHT]);

            const shapeTensor = new ort.Tensor("int64", [_img.height, _img.width], [2]);
            const inputDictProcessor = { ["mask"]: maskTensor, ["original_shape"]: shapeTensor };

            const outputProcessor = await sessionProcessor.run(inputDictProcessor);
            const resizedMask = outputProcessor["output"].data;
            for (let y = 0; y < _img.height; y++) {
                for (let x = 0; x < _img.width; x++) {
                    const index = (y * _img.width + x) * 4;
                    imageDataSource.data[index + 3] = 255 * resizedMask[y * _img.width + x];
                }
            }
            await new Promise((resolve, reject) => setTimeout(resolve, 50));
            ctx.putImageData(imageDataSource, 0, 0);
            toggleSaveBtn(true);
        } catch (err) {
            alert(`⚠ ERROR: ${err.message}`);
            console.log(err);
        } finally {
            toggleLoadingSpinner(false);
        }
        return await Promise.resolve('success');
      }

      await new Promise((resolve, reject) => setTimeout(resolve, 50));
      toggleLoadingSpinner(false);
      toggleOutputTable(false);
      toggleDropArea(true);
      toggleSaveBtn(false);


      resetBtn.addEventListener('click', async(evt)=> {
          toggleLoadingSpinner(false);
          
          fileName.innerHTML='';
          fileSize.innerHTML='';
          fileType.innerHTML='';
          lastModified.innerHTML='';

          saveImageBtn.value='';
          toggleSaveBtn(false);

          _img.parentNode.removeChild(_img);
          _canvas.parentNode.removeChild(_canvas);
          _img =void 0;
          _canvas =void 0;

          toggleOutputTable(false);
          fileInput.value='';
          
          toggleDropArea(true);
      });
});