import "./App.css";
import {useCallback, useRef, useState} from "react";
import * as htmlToImage from "html-to-image";

function App()
{
  const [userImage, setUserImage] = useState("");
  const [bgRemove, setBgRemove] = useState("");
  const fileInputRef = useRef(null);
  const [name, setName] = useState("Your Name");
  const ref = useRef(null);

  const handleImageUpload = (event) =>
  {
    if(event.target.files && event.target.files[0])
    {
      setUserImage(URL.createObjectURL(event.target.files[0]));
    }
    console.log("Image Uploaded");
  };

  // const handleRemoveBackground = async() =>
  // {
  //   const apiKey = "YOUR_API_KEY";
  //   const apiUrl = "https://api.remove.bg/v1.0/removebg";
  //
  //   const formData = new FormData();
  //   formData.append("image_file", userImage);  // Use the file object directly
  //   formData.append("size", "auto");
  //
  //   try
  //   {
  //     const res = await fetch(apiUrl, {
  //       method: "POST",
  //       headers: {
  //         "X-Api-Key": apiKey
  //       },
  //       body: formData
  //     });
  //
  //     const data = await res.blob();
  //     const imageUrl = URL.createObjectURL(data);
  //     setBgRemove(imageUrl);
  //   }
  //   catch(error)
  //   {
  //     console.log(error);
  //   }
  //   console.log("Remove Background");
  // };

  const downloadImage = useCallback(() =>
  {
    const node = document.getElementById("swag-container");

    htmlToImage.toPng(node)
    .then((dataUrl) =>
    {
      const link = document.createElement("a");
      link.download = "my-swag.png";
      link.href = dataUrl;
      link.click();
    })
    .catch((error) =>
    {
      console.error("oops, something went wrong!", error);
    });
  }, []);

  // const downloadImage = useCallback(() =>
  // {
  //   if(ref.current === null)
  //   {
  //     return;
  //   }
  //
  //   htmlToImage.toPng(ref.current, {cacheBust: true})
  //   .then((dataUrl) =>
  //   {
  //     const link = document.createElement("a");
  //     link.download = "my-swag.png";
  //     link.href = dataUrl;
  //     link.click();
  //   })
  //   .catch((err) =>
  //   {
  //     console.log(err);
  //   });
  // }, [ref]);

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-[#0f2b26] text-white">
        <div className="flex flex-col items-center w-full max-w-6xl p-8 space-y-8 md:flex-row md:space-y-0 md:space-x-16">
          <div className="flex-shrink-0 relative" ref={ref} id="swag-container">
            <div>
              <img
                src="/Swag.png"
                alt="Badge Image"
                width={449}
                height={550}
              />
              <img
                src={userImage || "/selmonBhai.png"}
                alt="User Image"
                className="absolute bottom-[6%] md:bottom-10 left-[20%] md:left-1/4 fade-bottom h-[320px] w-[280px] md:h-[380px] md:w-[300px] object-contain md:object-cover"
                height={320}
                width={320}
              />
              <p className="absolute bottom-[10%] left-1/3 font-medium text-3xl md:text-4xl lg:text-4xl tracking-wide opacity-90">{name}</p>
            </div>
          </div>
          <div className="flex flex-col items-center w-full space-y-4 md:items-start">
            <h1 className="text-4xl font-bold">How to Generate</h1>
            <h2 className="text-2xl font-semibold">Digital Badge</h2>
            <p className="text-sm text-muted-foreground">
              IMP - Upload a clear photo of yourself without BG.
              <br />
              Note -&gt; We respect your privacy and are not storing your pictures on our servers.
            </p>
            <input
              type="text" placeholder="Enter your Name" className="w-full max-w-sm p-2 rounded text-black"
              value={name}
              onFocus={e => e.target.select()}
              onChange={e => setName(e.target.value)}
            />
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              style={{display: "none"}}
              onChange={handleImageUpload}
              required={true}
            />
            <div className="flex space-x-4">
              <button
                className="bg-white p-2 px-4 rounded text-black"
                onClick={() => fileInputRef.current.click()}
              >
                Upload your photo
              </button>
              <button className="bg-[#149087] p-2 px-6 rounded" onClick={downloadImage}>Build it</button>
            </div>
            {bgRemove && (
              <div className="mb-4">
                <a
                  href={bgRemove}
                  download="background_removed_image.png"
                >
                  <button className="bg-[#EE5D4F] p-2 px-4 rounded">
                    Download
                  </button>
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
