import axios from "axios";
import { useRef, useState } from "react"
import {youtube_parser} from "./utils"

function App() {
  const inputUrlRef = useRef();
  const [urlResult, setUrlResult] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault()
    const youtubeID = youtube_parser(inputUrlRef.current.value);
    console.log(youtubeID)

    const options = {
      method: 'GET',
      url: 'https://youtube-mp36.p.rapidapi.com/dl',
      params: {id: youtubeID},
      headers: {
        'X-RapidAPI-Key': import.meta.env.VITE_RAPID_API_KEY,
        'X-RapidAPI-Host': 'youtube-mp36.p.rapidapi.com'
      }
    }
  
    axios(options)
      .then(res => setUrlResult(res.data.link))
      .catch(err => console.log(err))

    inputUrlRef.current.value = '';
  
  }
  return (
    <div className="app">
      <span className="logo">youtube2mp3</span>
        <section className="content">
          <h1 className="content_title">Youtube to MP3 Converter</h1>
          <p className="content_description">
            Transforms youtube videos to mp3
          </p>

          <form onSubmit={handleSubmit} className="form">
            <input ref={inputUrlRef} placeholder="Paste the youtube video url" className="form_input" type="text" />
            <button type="submit" className="form_button">Search</button>
          </form>

          {urlResult ? <a target='_blank' rel="noreferrer" href={urlResult}><button className="download_btn">DOWNLOAD</button></a>: ''}
        </section>
    </div>
  )
}

export default App
