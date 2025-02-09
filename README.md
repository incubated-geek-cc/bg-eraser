<div align="center">
  <img src="https://raw.githubusercontent.com/incubated-geek-cc/bg-eraser/main/img/logo_pinkbg.png" width="96" alt="logo">

  # 💻 Background ✐Eraser with AI✚ML

  ### 🛠️ Removes image backgrounds using WASM and JavaScript in-browser. Works offline. 
 
**Runs using <a href='https://github.com/Microsoft/onnxruntime' target='_blank'>ONNX Runtime</a> JavaScript plugin developed by Microsoft for browser platforms: <strong>❝…cross-platform inference and training machine-learning accelerator❞</strong>.**

<div align="left">

### 👀 Preview

<img src='https://raw.githubusercontent.com/incubated-geek-cc/bg-eraser/main/img/app_preview.png' width="600px" />


#### Features

<div align='left'>
    <strong>「✓」</strong> Web application runs offline and is Internet independent<br>
    <strong>「✓」</strong> File upload interface with Drag & Drop Functionality<br>
    <strong>「✓」</strong> 4 model options: <code>u2netp.onnx</code> <code>u2net.onnx</code> <code>u2net_human_seg.onnx</code> <code>silueta.onnx</code><br>
    <strong>「✓」</strong> Image formats accepted: <code>image/png</code> <code>image/jpeg</code> <code>image/jpg</code> <code>image/webp</code><br>
    <strong>「✓」</strong> Export processed image output<br>
    <strong>「✓」</strong> Includes 'Reset' 🗘 button<br>
</div>


#### Models

<table>
  <thead>
    <tr>
      <th>Output</th>
      <th>Model</th>
      <th>Resolution</th>
      <th>Size(MB)</th>
      <th>From</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <img src="https://raw.githubusercontent.com/incubated-geek-cc/bg-eraser/main/img/sample1.jpg" width="250">
        <hr>
        <img src="https://raw.githubusercontent.com/incubated-geek-cc/bg-eraser/main/img/sample2.jpg" width="250">
      </td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td>
        <img src="https://raw.githubusercontent.com/incubated-geek-cc/bg-eraser/main/img/sample1.u2net.onnx.jpg" width="250">
        <hr>
        <img src="https://raw.githubusercontent.com/incubated-geek-cc/bg-eraser/main/img/sample2.u2net.onnx.jpg" width="250">
      </td>
      <td>
        <a target="_blank" href="https://github.com/danielgatis/rembg/releases/download/v0.0.0/u2net.onnx">u2net.onnx</a>
      </td>
      <td>320</td>
      <td>168</td>
      <td>
        <a target="_blank" href="https://github.com/danielgatis/rembg">danielgatis/rembg</a>
      </td>
    </tr>
    <tr>
      <td>
        <img src="https://raw.githubusercontent.com/incubated-geek-cc/bg-eraser/main/img/sample1.u2netp.onnx.jpg" width="250">
        <hr>
        <img src="https://raw.githubusercontent.com/incubated-geek-cc/bg-eraser/main/img/sample2.u2netp.onnx.jpg" width="250">
      </td>
      <td>
        <a target="_blank" href="https://github.com/danielgatis/rembg/releases/download/v0.0.0/u2netp.onnx">u2netp.onnx</a>
      </td>
      <td>320</td>
      <td>4</td>
      <td>
        <a target="_blank" href="https://github.com/danielgatis/rembg">danielgatis/rembg</a>
      </td>
    </tr>
    <tr>
      <td>
        <img src="https://raw.githubusercontent.com/incubated-geek-cc/bg-eraser/main/img/sample1.u2net_human_seg.onnx.jpg" width="250">
        <hr>
         <img src="https://raw.githubusercontent.com/incubated-geek-cc/bg-eraser/main/img/sample2.u2net_human_seg.onnx.jpg" width="250">
      </td>
      <td>
        <a target="_blank" href="https://github.com/danielgatis/rembg/releases/download/v0.0.0/u2net_human_seg.onnx">u2net_human_seg.onnx</a>
      </td>
      <td>320</td>
      <td>168</td>
      <td>
        <a target="_blank" href="https://github.com/danielgatis/rembg">danielgatis/rembg</a>
      </td>
    </tr>
    <tr>
      <td>
        <img src="https://raw.githubusercontent.com/incubated-geek-cc/bg-eraser/main/img/sample1.silueta.onnx.jpg" width="250">
        <hr>
        <img src="https://raw.githubusercontent.com/incubated-geek-cc/bg-eraser/main/img/sample2.silueta.onnx.jpg" width="250">
      </td>
      <td>
        <a target="_blank" href="https://github.com/danielgatis/rembg/releases/download/v0.0.0/silueta.onnx">silueta.onnx</a>
      </td>
      <td>320</td>
      <td>42</td>
      <td>
        <a target="_blank" href="https://github.com/danielgatis/rembg">danielgatis/rembg</a>
      </td>
    </tr>
  </tbody>
</table>

### 🌟 Try it yourself
[**Live Demo :: Link**](https://incubated-geek-cc.github.io/bg-eraser/)

### ✍ Read related posts here

[**Article :: Link :: Image Background Removal Using Offline Client-side JavaScript**](#)
<br>

[**Article :: Link :: Deploy Math OCR ONNX Model In Python Flask Web App**](https://towardsdev.com/deploy-math-ocr-onnx-model-in-python-flask-web-app-fd2aab576eb0)
<br>

### 🤝 Credits & Acknowledgement

* Adapted from (<a href='https://github.com/pstwh/removebg-onnx-web-example' target='_blank'>removebg-onnx-web-example</a> by <a href='https://pstwh.github.io/' target='_blank'>pstwh</a>
* Original works of background removal models used (<code>u2net</code>) for segmentation can be found at <a href='https://github.com/xuebinqin/U-2-Net' target='_blank'>U²Net</a>

#### LICENSE
<p>This project is licensed under the MIT License.</p>

<p>— <b>Join me on 📝 <b>Medium</b> at <a href='https://medium.com/@geek-cc' target='_blank'>~ ξ(🎀˶❛◡❛) @geek-cc</a></b></p>

#### 🌮 Please buy me a <a href='https://www.buymeacoffee.com/geekcc' target='_blank'>Taco</a>! 😋