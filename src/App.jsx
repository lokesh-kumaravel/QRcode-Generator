
import { useState } from 'react';
import './App.css'

const App =() =>{
  const [img, setImg]= useState("");
  const [loading, setLoading]= useState(false);
  const [qrData, setQrData]=useState("");
  const [qrSize, setQrSize]= useState("150");
  async function generateQR()
  {
    console.log(qrData);
    if(qrData==="")
    {
      const data=(false);
      console.log("no picture");
    }
    setLoading(true);
    try{
      const url =`https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&data=${encodeURIComponent(qrData)}`;
      setImg(url);
    }
    catch(error){
      console.error("Error generating QR code",error);
    }
    finally{
      setLoading(false);
    }
  }
  function downloadQR()
  {
    fetch(img)
    .then((response)=>response.blob())
    .then((blob)=>{
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download="qrcode.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }).catch((error)=>{
      console.error("Error downloading QR code",error);
    })
  }

    return (
      <div className="app-container">
        <h1>QR CODE GENERATOR</h1>
       { loading&&<p>Please wait...</p>}
        {img&&
        <img src={img}className="img"></img>}
         {qrData === "" && <p className='para'>Provide a Data to generate QR code</p>}
         <br></br>
        <div>
          <label htmlFor="dataInput" className="input-label">Data for QR code</label>
          <input type="text" value={qrData} id="dataInput" placeholder="Enter data for QR code " onChange={(e)=>setQrData(e.target.value)}/>
          <label htmlFor="sizeInput" className="input-label">Image size(Eg:150)</label>
          <input type="text" value={qrSize} id="dataInput" placeholder="Enter data for QR code " onChange={(e)=>setQrSize(e.target.value)}/>
          <button className="generate-button" disabled={loading} onClick={generateQR}>Generate QR Code</button>
          <button className="download-button" onClick={downloadQR}>Download QR Code</button>
        </div>
        <p>Designed By <a href='https://www.linkedin.com/in/lokesh-k-5b7513276/'>Lokesh K</a></p>
      </div>
    );
  
}

export default App
